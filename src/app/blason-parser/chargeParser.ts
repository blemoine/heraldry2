import * as P from 'parsimmon';
import {
  Charge,
  charges,
  Eagle,
  EagleAttitude,
  eagleAttitudes,
  Lion,
  LionAttitude,
  lionAttitudes,
  LionHead,
  lionHeads,
  LionTail,
  lionTails,
} from '../model/charge';
import { buildAltParser, threeParser, twoParser } from './parser.helper';
import { identity } from '../../utils/identity';
import { gules } from '../model/tincture';
import { cannotHappen } from '../../utils/cannot-happen';
import { tinctureParserFromName } from './tinctureParser';

export function chargeParser(): P.Parser<Charge> {
  const chargesParser = (count: 1 | 2 | 3): P.Parser<Charge> =>
    P.alt(
      ...charges.map((charge) => {
        if (charge === 'lion') {
          const attitudeParser: P.Parser<LionAttitude> = buildAltParser(lionAttitudes, identity);
          const headParser: P.Parser<LionHead> = buildAltParser(lionHeads, identity);
          const tailParser: P.Parser<LionTail> = buildAltParser(lionTails, identity);

          const lionNameParser = count === 1 ? P.regex(/lion/i) : P.regex(/lions/i);
          const lionParser: P.Parser<Lion> = P.seq(
            lionNameParser.skip(P.whitespace).then(attitudeParser),
            P.whitespace.then(headParser).fallback(null),
            P.whitespace
              .then(P.regex(/tail/i))
              .then(P.whitespace)
              .then(tailParser)
              .fallback(null),
            count === 1
              ? P.of({ count })
              : P.whitespace
                  .then(P.regex(/in pale/i).result('pale' as const))
                  .map((disposition) => ({ count, disposition })),
            P.whitespace.then(tinctureParserFromName),
            P.whitespace
              .then(P.regex(/armed and langued/i))
              .then(P.whitespace)
              .then(tinctureParserFromName)
              .fallback(null)
          ).map(([attitude, head, tail, countAndDisposition, tincture, armedAndLangued]) => {
            return {
              name: 'lion',
              attitude,
              tincture,
              armedAndLangued: armedAndLangued || gules,
              tail,
              head,
              countAndDisposition,
            };
          });

          return lionParser;
        } else if (charge === 'eagle') {
          const eagleNameParser = count === 1 ? P.regex(/eagle/i) : P.regex(/eagles/i);
          const eagleAttitudeParser: P.Parser<EagleAttitude> = buildAltParser(eagleAttitudes, identity);

          return P.seq(
            eagleNameParser.skip(P.whitespace).then(eagleAttitudeParser),
            P.whitespace.then(tinctureParserFromName),
            P.whitespace
              .then(P.regex(/beaked and armed/i))
              .then(P.whitespace)
              .then(tinctureParserFromName)
              .fallback(null)
          ).map(
            ([attitude, tincture, beakedAndArmed]): Eagle => {
              return {
                name: 'eagle',
                attitude,
                tincture,
                beakedAndArmed: beakedAndArmed || tincture,
              };
            }
          );
        } else {
          return cannotHappen(charge);
        }
      })
    );

  return P.alt(P.regex(/an?/i).result(1 as const), twoParser, threeParser)
    .trim(P.optWhitespace)
    .chain((count) => chargesParser(count));
}
