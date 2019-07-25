import * as P from 'parsimmon';
import { ordinaries, Ordinary } from '../model/ordinary';
import { buildAltParser, twoParser } from './parser.helper';
import { identity } from '../../utils/identity';
import { tinctureParserFromName } from './tinctureParser';

export function ordinaryParser(): P.Parser<Ordinary> {
  const ordinaryParser: P.Parser<Ordinary['name']> = buildAltParser(ordinaries, identity);

  const simpleOrdinaries = P.seqMap(
    P.regex(/an?/i)
      .then(P.optWhitespace)
      .then(ordinaryParser)
      .skip(P.whitespace),
    tinctureParserFromName,
    (name, tincture): Ordinary => {
      if (name === 'pale') {
        return { name, tincture, count: 1 };
      } else {
        return { name, tincture };
      }
    }
  );

  const pallets = P.seqMap(
    twoParser.skip(P.whitespace),
    P.regex(/pallets/i)
      .result('pale' as const)
      .skip(P.whitespace),
    tinctureParserFromName,
    (count, name, tincture): Ordinary => {
      return { name, tincture, count };
    }
  );

  return P.alt(simpleOrdinaries, pallets);
}
