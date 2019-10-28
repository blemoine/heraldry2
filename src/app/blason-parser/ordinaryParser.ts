import * as P from 'parsimmon';
import { ChapePloye, Chausse, Chevron, Chevronel, ordinaries, Ordinary, OrdinaryCross, Pale } from '../model/ordinary';
import { aParser, buildAltParser, lineParser, numberParser } from './parser.helper';
import { tinctureParserFromName } from './tinctureParser';
import { stringifyOrdinaryName } from '../model/stringify/stringify.helper';

function isNotPaleOrChevronOrCross(
  o: Ordinary['name']
): o is Exclude<Ordinary['name'], 'pale' | 'chevron' | 'chevronel' | 'cross' | 'chape-ploye' | 'chausse'> {
  return !['pale', 'chevron', 'chevronel', 'cross', 'chape-ploye', 'chausse'].includes(o);
}

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
    lineOrStraightParser,
    tinctureParserFromName
  ).map(([count, name, line, tincture]): Chevron | Chevronel => ({ name, count, line, tincture }));

  const chapePloyerParser: P.Parser<ChapePloye> = P.seq(
    P.regexp(/chapé ployé/i)
      .result('chape-ploye' as const)
      .skip(P.whitespace),
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
    )
  ).map(
    ([name, line, tinctures]): ChapePloye => ({
      name,
      line,
      tinctures,
    })
  );

  const chausseParser: P.Parser<Chausse> = P.seq(
    P.regexp(/chaussé/i)
      .result('chausse' as const)
      .skip(P.whitespace),
    lineOrStraightParser,
    tinctureParserFromName
  ).map(([name, line, tincture]) => ({ name, line, tincture }));

  const ordinaryWithLineParser: P.Parser<
    Exclude<Ordinary, Pale | Chevron | OrdinaryCross | ChapePloye | Chausse>
  > = P.seq(
    aParser
      .then(buildAltParser(ordinaries.filter(isNotPaleOrChevronOrCross), stringifyOrdinaryName))
      .skip(P.whitespace),
    lineOrStraightParser,
    tinctureParserFromName
  ).map(([name, line, tincture]) => ({ name, line, tincture }));

  return P.alt(paleParser, chevronParser, chapePloyerParser, chausseParser, ordinaryWithLineParser);
}
