import * as P from 'parsimmon';
import {
  ChapePloye,
  Chausse,
  ChaussePloye,
  Chevron,
  Chevronel,
  ordinaries,
  Ordinary,
  OrdinaryCross,
  Pale,
} from '../model/ordinary';
import { aParser, buildAltParser, constStr, lineParser, numberParser } from './parser.helper';
import { metalOrColourParserFromName, tinctureParserFromName } from './tinctureParser';
import { stringifyOrdinaryName } from '../model/stringify/stringify.helper';
import { MetalsAndColours } from '../model/tincture';

function isNotPaleOrChevronOrCross(
  o: Ordinary['name']
): o is Exclude<Ordinary['name'], 'pale' | 'chevron' | 'chevronel' | 'cross' | 'chape-ploye' | 'chausse'> {
  return !['pale', 'chevron', 'chevronel', 'cross', 'chape-ploye', 'chausse'].includes(o);
}

const fimbriatedParser: P.Parser<MetalsAndColours | null> = P.whitespace
  .then(P.string('fimbriated'))
  .then(P.whitespace)
  .then(metalOrColourParserFromName)
  .fallback(null);

export function ordinaryParser(): P.Parser<Ordinary> {
  const lineOrStraightParser = lineParser.skip(P.whitespace).fallback('straight' as const);
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
    lineOrStraightParser,
    tinctureParserFromName,
    fimbriatedParser
  ).map(([{ name, count }, line, tincture, fimbriated]): Pale => ({ name, count, line, tincture, fimbriated }));

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
    lineOrStraightParser,
    tinctureParserFromName,
    fimbriatedParser
  ).map(([count, name, line, tincture, fimbriated]): Chevron | Chevronel => ({
    name,
    count,
    line,
    tincture,
    fimbriated,
  }));

  const chapePloyerParser: P.Parser<ChapePloye> = P.seq(
    constStr('chape-ploye', 'chapé ployé').skip(P.whitespace),
    lineOrStraightParser,

    P.alt(
      P.string('per pale ')
        .then(P.seq(tinctureParserFromName.skip(P.string(' and ')), tinctureParserFromName))
        .map((tinctures): ChapePloye['tinctures'] => {
          return {
            kind: 'party',
            per: 'pale',
            tinctures,
          };
        }),
      tinctureParserFromName.map((tincture): ChapePloye['tinctures'] => {
        return {
          kind: 'simple',
          tincture,
        };
      })
    ),
    fimbriatedParser
  ).map(
    ([name, line, tinctures, fimbriated]): ChapePloye => ({
      name,
      line,
      tinctures,
      fimbriated,
    })
  );

  const chausseParser: P.Parser<Chausse> = P.seq(
    constStr('chausse', 'chaussé').skip(P.whitespace),
    lineOrStraightParser,
    tinctureParserFromName,
    fimbriatedParser
  ).map(([name, line, tincture, fimbriated]) => ({ name, line, tincture, fimbriated }));
  const chaussePloyeParser: P.Parser<ChaussePloye> = P.seq(
    constStr('chausse-ploye', 'chaussé ployé').skip(P.whitespace),
    lineOrStraightParser,
    tinctureParserFromName,
    fimbriatedParser
  ).map(([name, line, tincture, fimbriated]) => ({ name, line, tincture, fimbriated }));

  const ordinaryWithLineParser: P.Parser<
    Exclude<Ordinary, Pale | Chevron | OrdinaryCross | ChapePloye | Chausse>
  > = P.seq(
    aParser
      .then(buildAltParser(ordinaries.filter(isNotPaleOrChevronOrCross), stringifyOrdinaryName))
      .skip(P.whitespace),
    lineOrStraightParser,
    tinctureParserFromName,
    fimbriatedParser
  ).map(([name, line, tincture, fimbriated]) => ({ name, line, tincture, fimbriated }));

  return P.alt(paleParser, chevronParser, chapePloyerParser, chaussePloyeParser, chausseParser, ordinaryWithLineParser);
}
