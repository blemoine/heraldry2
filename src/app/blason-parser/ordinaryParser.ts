import * as P from 'parsimmon';
import { Chevron, Chevronel, ordinaries, Ordinary, OrdinaryCross, Pale } from '../model/ordinary';
import { aParser, buildAltParser, lineParser, numberParser } from './parser.helper';
import { tinctureParserFromName } from './tinctureParser';
import { stringifyOrdinaryName } from '../from-blason/blason.helpers';

function isNotPaleOrChevronOrCross(
  o: Ordinary['name']
): o is Exclude<Ordinary['name'], 'pale' | 'chevron' | 'chevronel' | 'cross'> {
  return !['pale', 'chevron', 'chevronel', 'cross'].includes(o);
}

export function ordinaryParser(): P.Parser<Ordinary> {
  const paleParser: P.Parser<Pale> = P.seq(
    P.alt(
      aParser
        .skip(P.regex(/pale/i))
        .result({ name: 'pale', count: 1 } as const)
        .skip(P.whitespace),
      numberParser(2)
        .skip(P.regexp(/pallets/i))
        .map((count) => ({ name: 'pale', count } as const))
        .skip(P.whitespace)
    ),
    lineParser.skip(P.whitespace).fallback('straight' as const),
    tinctureParserFromName
  ).map(([{ name, count }, line, tincture]): Pale => ({ name, count, line, tincture }));

  const chevronParser: P.Parser<Chevron | Chevronel> = P.seq(
    P.alt(aParser, numberParser(2), numberParser(3)),
    P.alt(
      P.regexp(/chevrons?/i)
        .result('chevron' as const)
        .skip(P.whitespace),
      P.regexp(/chevronels?/i)
        .result('chevronel' as const)
        .skip(P.whitespace)
    ),
    lineParser.skip(P.whitespace).fallback('straight' as const),
    tinctureParserFromName
  ).map(([count, name, line, tincture]): Chevron | Chevronel => ({ name, count, line, tincture }));

  const ordinaryWithLineParser: P.Parser<Exclude<Ordinary, Pale | Chevron | OrdinaryCross>> = P.seq(
    aParser
      .then(buildAltParser(ordinaries.filter(isNotPaleOrChevronOrCross), stringifyOrdinaryName))
      .skip(P.whitespace),
    lineParser.skip(P.whitespace).fallback('straight' as const),
    tinctureParserFromName
  ).map(
    ([name, line, tincture]): Exclude<Ordinary, Pale | Chevron | Chevronel | OrdinaryCross> => ({
      name,
      line,
      tincture,
    })
  );

  return P.alt(paleParser, chevronParser, ordinaryWithLineParser);
}
