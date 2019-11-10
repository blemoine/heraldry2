import { isError, raise, Result } from '../../utils/result';
import { SvgPathBuilder } from './svg-path-builder';
import * as P from 'parsimmon';

type Language = {
  FullPath: (r: AppliedLanguage) => P.Parser<SvgPathBuilder>;
};
type AppliedLanguage = { [K in keyof Language]: ReturnType<Language[K]> };

const NumberParser: P.Parser<number> = P.alt(
  P.regexp(/-?(0|[1-9][0-9]*)([.][0-9]+)?([eE][+-]?[0-9]+)?/),
  P.regexp(/-?([.][0-9]+)([eE][+-]?[0-9]+)?/)
)
  .map(Number)
  .desc('number');

const NumberPairParser: P.Parser<[number, number]> = P.seq(NumberParser.skip(P.optWhitespace), NumberParser);
const NumberQuadrupletParser: P.Parser<[number, number, number, number]> = P.seq(
  NumberParser.skip(P.optWhitespace),
  NumberParser.skip(P.optWhitespace),
  NumberParser.skip(P.optWhitespace),
  NumberParser
);
const NumberSextupletParser: P.Parser<[number, number, number, number, number, number]> = P.seq(
  NumberParser.skip(P.optWhitespace),
  NumberParser.skip(P.optWhitespace),
  NumberParser.skip(P.optWhitespace),
  NumberParser.skip(P.optWhitespace),
  NumberParser.skip(P.optWhitespace),
  NumberParser
);
const ZeroOrOne: P.Parser<0 | 1> = P.alt(P.string('0').result(0), P.string('1').result(1));

const ArcParamParser: P.Parser<[number, number, number, 0 | 1, 0 | 1, number, number]> = P.seq(
  NumberParser.skip(P.optWhitespace),
  NumberParser.skip(P.optWhitespace),
  NumberParser.skip(P.optWhitespace),
  ZeroOrOne.skip(P.whitespace),
  ZeroOrOne.skip(P.optWhitespace),
  NumberParser.skip(P.optWhitespace),
  NumberParser
);

function svgPathParamParser<A>(letter: string, paramParser: P.Parser<A>): P.Parser<Array<A>> {
  return P.seq(P.string(letter).skip(P.optWhitespace), P.sepBy1(paramParser, P.optWhitespace)).map(([, arr]) => arr);
}

const MParser: P.Parser<Array<[number, number]>> = svgPathParamParser('M', NumberPairParser);

const LParser: P.Parser<Array<[number, number]>> = svgPathParamParser('L', NumberPairParser);

const lParser: P.Parser<Array<[number, number]>> = svgPathParamParser('l', NumberPairParser);

const AParser: P.Parser<Array<[number, number, number, 0 | 1, 0 | 1, number, number]>> = svgPathParamParser(
  'A',
  ArcParamParser
);

const aParser: P.Parser<Array<[number, number, number, 0 | 1, 0 | 1, number, number]>> = svgPathParamParser(
  'a',
  ArcParamParser
);

const cParser: P.Parser<Array<[number, number, number, number, number, number]>> = svgPathParamParser(
  'c',
  NumberSextupletParser
);

const CParser: P.Parser<Array<[number, number, number, number, number, number]>> = svgPathParamParser(
  'C',
  NumberSextupletParser
);

const qParser: P.Parser<Array<[number, number, number, number]>> = svgPathParamParser('q', NumberQuadrupletParser);
const sParser: P.Parser<Array<[number, number, number, number]>> = svgPathParamParser('s', NumberQuadrupletParser);
const hParser: P.Parser<Array<number>> = svgPathParamParser('h', NumberParser);

const zParser = P.alt(P.string('z'), P.string('Z'));

const Path = function(pathBuilder: SvgPathBuilder): P.Parser<SvgPathBuilder> {
  return P.alt(
    MParser.map((points) => points.reduce((acc, point) => acc.moveTo(point), pathBuilder)),
    LParser.map((points) => points.reduce((acc, point) => acc.goTo(point), pathBuilder)),
    lParser.map((points) => points.reduce((acc, point) => acc.relativeGoTo(point), pathBuilder)),
    AParser.map((points) =>
      points.reduce(
        (acc, [rx, ry, xAxisRotation, largeArc, sweep, x, y]) =>
          acc.arcTo([x, y], {
            radius: [rx, ry],
            sweep,
            largeArc,
            xAxisRotation,
          }),
        pathBuilder
      )
    ),
    aParser.map((points) =>
      points.reduce(
        (acc, [rx, ry, xAxisRotation, largeArc, sweep, x, y]) =>
          acc.relativeArcTo([x, y], {
            radius: [rx, ry],
            sweep,
            largeArc,
            xAxisRotation,
          }),
        pathBuilder
      )
    ),
    cParser.map((points) =>
      points.reduce(
        (acc, [x1, y1, x2, y2, x, y]) =>
          acc.relativeCubicBezier(
            [x, y],
            [
              [x1, y1],
              [x2, y2],
            ]
          ),
        pathBuilder
      )
    ),
    CParser.map((points) =>
      points.reduce(
        (acc, [x1, y1, x2, y2, x, y]) =>
          acc.cubicBezier(
            [x, y],
            [
              [x1, y1],
              [x2, y2],
            ]
          ),
        pathBuilder
      )
    ),
    qParser.map((points) =>
      points.reduce((acc, [x1, y1, x, y]) => acc.relativeQuadraticBezier([x, y], [x1, y1]), pathBuilder)
    ),
    sParser.map((points) =>
      points.reduce((acc, [x1, y1, x, y]) => acc.relativeSmoothCubicBezier([x, y], [x1, y1]), pathBuilder)
    ),
    hParser.map((points) => points.reduce((acc, x) => acc.horizontalMove(x), pathBuilder)),
    zParser.map(() => pathBuilder.close())
  )
    .chain((pathBuilder) => P.optWhitespace.then(Path(pathBuilder)))
    .fallback(pathBuilder);
};
const language: Language = {
  FullPath(): P.Parser<SvgPathBuilder> {
    return MParser.map((points) => SvgPathBuilder.start(points[0]))
      .skip(P.optWhitespace)
      .chain((pathBuilder) => Path(pathBuilder))
      .skip(P.optWhitespace);
  },
};

const lexer = P.createLanguage(language);

export function parseSvgPathBuilder(path: string): Result<SvgPathBuilder> {
  const result = lexer.FullPath.parse(path);
  if (result.status) {
    return result.value;
  } else {
    return raise(P.formatError(path, result));
  }
}

export function unsafeParseSvgPathBuilder(path: string): SvgPathBuilder {
  const result = parseSvgPathBuilder(path);
  if (isError(result)) {
    throw new Error(result.error.join('\n'));
  }
  return result;
}
