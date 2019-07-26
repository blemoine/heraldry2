import * as P from 'parsimmon';
import { Bordure, ordinaries, Ordinary, Pale } from '../model/ordinary';
import { buildAltParser, constStr, twoParser } from './parser.helper';
import { identity } from '../../utils/identity';
import { tinctureParserFromName } from './tinctureParser';
import { Line, lines } from '../model/line';

export function ordinaryParser(): P.Parser<Ordinary> {
  const ordinaryParser: P.Parser<Exclude<Ordinary['name'], 'pale' | 'bordure'>> = buildAltParser(
    ordinaries.filter(isNotPaleOrBordure),
    identity
  );

  const simpleOrdinaries = P.seqMap(
    P.regex(/an?/i)
      .then(P.whitespace)
      .then(ordinaryParser)
      .skip(P.whitespace),
    tinctureParserFromName,
    (name, tincture): Ordinary => ({ name, tincture })
  );

  const paleParser: P.Parser<Pale> = P.alt(
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
  ).chain(
    ({ name, count }): P.Parser<Pale> => {
      return tinctureParserFromName.map((tincture) => ({ name, count, tincture }));
    }
  );

  const lineParser: P.Parser<Line> = buildAltParser(lines, identity);

  const bordureParser: P.Parser<Bordure> = P.seq(
    P.regex(/an?/i)
      .then(P.whitespace)
      .then(constStr('bordure' as const))
      .skip(P.whitespace),
    lineParser.skip(P.whitespace).fallback('straight' as const),
    tinctureParserFromName
  ).map(([name, line, tincture]): Bordure => ({ name, line, tincture }));

  return P.alt(simpleOrdinaries, paleParser, bordureParser);
}

function isNotPaleOrBordure(o: Ordinary['name']): o is Exclude<Ordinary['name'], 'pale' | 'bordure'> {
  return !['pale', 'bordure'].includes(o);
}
