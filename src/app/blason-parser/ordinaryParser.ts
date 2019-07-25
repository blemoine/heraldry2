import * as P from 'parsimmon';
import { ordinaries, Ordinary, Pale } from '../model/ordinary';
import { buildAltParser, twoParser } from './parser.helper';
import { identity } from '../../utils/identity';
import { tinctureParserFromName } from './tinctureParser';

export function ordinaryParser(): P.Parser<Ordinary> {
  const ordinaryParser: P.Parser<Exclude<Ordinary['name'], 'pale'>> = buildAltParser(
    ordinaries.filter(isNotPale),
    identity
  );

  const simpleOrdinaries = P.seqMap(
    P.regex(/an?/i)
      .then(P.optWhitespace)
      .then(ordinaryParser)
      .skip(P.whitespace),
    tinctureParserFromName,
    (name, tincture): Ordinary => ({ name, tincture })
  );

  const paleParser: P.Parser<Pale> = P.alt(
    P.regex(/an?/i)
      .then(P.optWhitespace)
      .skip(P.regex(/pale/))
      .result({ name: 'pale', count: 1 } as const)
      .skip(P.whitespace),
    twoParser
      .skip(P.optWhitespace)
      .skip(P.regexp(/pallets/))
      .map((count) => ({ name: 'pale', count } as const))
      .skip(P.whitespace)
  ).chain(
    ({ name, count }): P.Parser<Pale> => {
      return tinctureParserFromName.map((tincture) => ({ name, count, tincture }));
    }
  );

  return P.alt(simpleOrdinaries, paleParser);
}

function isNotPale(o: Ordinary['name']): o is Exclude<Ordinary['name'], 'pale'> {
  return o !== 'pale';
}
