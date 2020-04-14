import * as P from 'parsimmon';
import {
  ChapePloye,
  Chausse,
  ChaussePloye,
  Chevron,
  Chevronel,
  Chief,
  Fess,
  ordinaries,
  Ordinary,
  OrdinaryCross,
  Pale,
} from '../model/ordinary';
import { aParser, buildAltParser, constStr, lineParser, numberParser } from './parser.helper';
import { metalOrColourParserFromName, tinctureParserFromName } from './tinctureParser';
import { stringifyOrdinaryName } from '../model/stringify/stringify.helper';
import { MetalsAndColours } from '../model/tincture';
import { chargeParser } from './chargeParser';

function isNotPaleOrChevronOrCross(
  o: Ordinary['name']
): o is Exclude<
  Ordinary['name'],
  'pale' | 'fess' | 'chevron' | 'chevronel' | 'cross' | 'chape-ploye' | 'chausse' | 'chausse-ploye' | 'chief'
> {
  return ![
    'pale',
    'fess',
    'chevron',
    'chevronel',
    'cross',
    'chape-ploye',
    'chausse',
    'chausse-ploye',
    'chief',
  ].includes(o);
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

  const fessParser: P.Parser<Fess> = P.seq(
    P.alt(
      aParser
        .skip(P.regex(/fess/i))
        .result({ name: 'fess', count: 1 } as const)
        .skip(P.whitespace),
      numberParser(2)
        .skip(P.regexp(/bars/i))
        .map((count) => ({ name: 'fess', count } as const))
        .skip(P.whitespace)
    ),
    lineOrStraightParser,
    tinctureParserFromName,
    fimbriatedParser
  ).map(([{ name, count }, line, tincture, fimbriated]): Fess => ({ name, count, line, tincture, fimbriated }));

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

  const chapePloyerParser: P.Parser<ChapePloye | ChaussePloye> = P.seq(
    P.alt(constStr('chape-ploye', 'chapé ployé'), constStr('chausse-ploye', 'chaussé ployé')).skip(P.whitespace),
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
  ).map(([name, line, tinctures, fimbriated]): ChapePloye | ChaussePloye => ({
    name,
    line,
    tinctures,
    fimbriated,
  }));

  const chausseParser: P.Parser<Chausse> = P.seq(
    P.alt(constStr('chausse', 'chaussé')).skip(P.whitespace),
    lineOrStraightParser,
    tinctureParserFromName,
    fimbriatedParser
  ).map(([name, line, tincture, fimbriated]) => ({ name, line, tincture, fimbriated }));

  const ordinaryWithLineParser: P.Parser<Exclude<
    Ordinary,
    Pale | Fess | Chevron | OrdinaryCross | ChapePloye | ChaussePloye | Chausse | Chief
  >> = P.seq(
    P.alt(
      aParser.then(buildAltParser(ordinaries.filter(isNotPaleOrChevronOrCross), stringifyOrdinaryName)),
      constStr('flaunches')
    ).skip(P.whitespace),
    lineOrStraightParser,
    tinctureParserFromName,
    fimbriatedParser
  ).map(([name, line, tincture, fimbriated]) => ({ name, line, tincture, fimbriated }));

  const chiefParser: P.Parser<Chief> = P.alt(
    P.seq(
      aParser.then(constStr('chief')).skip(P.whitespace),
      lineOrStraightParser,
      tinctureParserFromName,
      fimbriatedParser
    ).map(([name, line, tincture, fimbriated]) => ({ name, line, tincture, fimbriated, charge: null })),
    P.seq(
      constStr('chief', 'on a chief').skip(P.whitespace),
      lineOrStraightParser,
      tinctureParserFromName,
      fimbriatedParser.skip(P.whitespace),
      P.alt(chargeParser())
    ).map(([name, line, tincture, fimbriated, charge]) => ({ name, line, tincture, fimbriated, charge }))
  );

  const crossParser: P.Parser<OrdinaryCross> = P.alt(
    P.seq(
      aParser.then(constStr('cross', 'cross potenty')).skip(P.whitespace),
      tinctureParserFromName,
      fimbriatedParser
    ).map(([name, tincture, fimbriated]): OrdinaryCross => ({ name, tincture, line: 'potenty', fimbriated })),
    P.seq(aParser.then(constStr('cross')).skip(P.whitespace), tinctureParserFromName, fimbriatedParser).map(
      ([name, tincture, fimbriated]): OrdinaryCross => ({ name, tincture, line: 'straight', fimbriated })
    ),
    P.seq(
      aParser.then(constStr('cross')).skip(P.whitespace),
      lineParser.skip(P.whitespace),
      tinctureParserFromName,
      fimbriatedParser
    ).map(([name, line, tincture, fimbriated]): OrdinaryCross => ({ name, tincture, line, fimbriated }))
  );

  return P.alt(
    chiefParser,
    paleParser,
    fessParser,
    chevronParser,
    chapePloyerParser,
    chausseParser,
    ordinaryWithLineParser,
    crossParser
  );
}
