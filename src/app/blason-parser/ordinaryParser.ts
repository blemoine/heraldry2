import * as P from 'parsimmon';
import { ordinaries, Ordinary, Pale } from '../model/ordinary';
import { buildAltParser, lineParser, twoParser } from './parser.helper';
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

  const ordinaryWithLineParser: P.Parser<Exclude<Ordinary, Pale>> = P.seq(
    P.regex(/an?/i)
      .then(P.whitespace)
      .then(buildAltParser(ordinaries.filter(isNotPale), stringifyOrdinaryName))
      .skip(P.whitespace),
    lineParser.skip(P.whitespace).fallback('straight' as const),
    tinctureParserFromName
  ).map(([name, line, tincture]): Exclude<Ordinary, Pale> => ({ name, line, tincture }));

  return P.alt(paleParser, ordinaryWithLineParser);
}

function isNotPale(o: Ordinary['name']): o is Exclude<Ordinary['name'], 'pale'> {
  return !['pale'].includes(o);
}
