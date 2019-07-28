import * as P from 'parsimmon';
import { Base, Bend, Bordure, Chief, Fess, ordinaries, Ordinary, Pale } from '../model/ordinary';
import { buildAltParser, constStr, twoParser } from './parser.helper';
import { identity } from '../../utils/identity';
import { tinctureParserFromName } from './tinctureParser';
import { Line, lines } from '../model/line';

type OrdinaryWithLine = Bordure | Chief | Fess | Base | Bend;
type NonStandardOrdinary = 'pale' | OrdinaryWithLine['name'];

export function ordinaryParser(): P.Parser<Ordinary> {
  const ordinaryParser: P.Parser<Exclude<Ordinary['name'], NonStandardOrdinary>> = buildAltParser(
    ordinaries.filter(isNotPaleOrBordureOrChief),
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

  const ordinaryWithLineParser: P.Parser<OrdinaryWithLine> = P.seq(
    P.regex(/an?/i)
      .then(P.whitespace)
      .then(
        P.alt(
          constStr('bordure' as const),
          constStr('chief' as const),
          constStr('fess' as const),
          constStr('base' as const),
          constStr('bend' as const)
        )
      )
      .skip(P.whitespace),
    lineParser.skip(P.whitespace).fallback('straight' as const),
    tinctureParserFromName
  ).map(([name, line, tincture]): OrdinaryWithLine => ({ name, line, tincture }));

  return P.alt(simpleOrdinaries, paleParser, ordinaryWithLineParser);
}

function isNotPaleOrBordureOrChief(o: Ordinary['name']): o is Exclude<Ordinary['name'], NonStandardOrdinary> {
  return !['pale', 'bordure', 'chief', 'fess', 'base', 'bend'].includes(o);
}
