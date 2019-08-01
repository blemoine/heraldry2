import * as P from 'parsimmon';
import { Chevron, Chevronel, ordinaries, Ordinary, Pale } from '../model/ordinary';
import { buildAltParser, lineParser, threeParser, twoParser } from './parser.helper';
import { tinctureParserFromName } from './tinctureParser';
import { stringifyOrdinaryName } from '../from-blason/blason.helpers';

export function ordinaryParser(): P.Parser<Ordinary> {
  const paleParser: P.Parser<Pale> = P.seq(
    P.alt(
      P.regex(/an?/i)
        .then(P.whitespace)
        .skip(P.regex(/pale/i))
        .result({ name: 'pale', count: 1 } as const)
        .skip(P.whitespace),
      twoParser
        .skip(P.optWhitespace)
        .skip(P.regexp(/pallets/i))
        .map((count) => ({ name: 'pale', count } as const))
        .skip(P.whitespace)
    ),
    lineParser.skip(P.whitespace).fallback('straight' as const),
    tinctureParserFromName
  ).map(([{ name, count }, line, tincture]): Pale => ({ name, count, line, tincture }));

  const chevronParser: P.Parser<Chevron> = P.seq(
    P.alt(
      P.alt(P.regex(/an?/i).result(1 as const), twoParser, threeParser)
        .skip(P.whitespace)
        .skip(P.regex(/chevrons?/i))
        .map((count) => ({ name: 'chevron', count } as const))
        .skip(P.whitespace),
      P.alt(P.regex(/an?/i).result(1 as const), twoParser, threeParser)
        .skip(P.optWhitespace)
        .skip(P.regexp(/chevronels?/i))
        .map((count) => ({ name: 'chevronel', count } as const))
        .skip(P.whitespace)
    ),
    lineParser.skip(P.whitespace).fallback('straight' as const),
    tinctureParserFromName
  ).map(([{ name, count }, line, tincture]): Chevron => ({ name, count, line, tincture }));

  const ordinaryWithLineParser: P.Parser<Exclude<Ordinary, Pale | Chevron>> = P.seq(
    P.regex(/an?/i)
      .then(P.whitespace)
      .then(buildAltParser(ordinaries.filter(isNotPaleOrChevron), stringifyOrdinaryName))
      .skip(P.whitespace),
    lineParser.skip(P.whitespace).fallback('straight' as const),
    tinctureParserFromName
  ).map(([name, line, tincture]): Exclude<Ordinary, Pale | Chevron | Chevronel> => ({ name, line, tincture }));

  return P.alt(paleParser, chevronParser, ordinaryWithLineParser);
}

function isNotPaleOrChevron(o: Ordinary['name']): o is Exclude<Ordinary['name'], 'pale' | 'chevron' | 'chevronel'> {
  return !['pale', 'chevron', 'chevronel'].includes(o);
}
