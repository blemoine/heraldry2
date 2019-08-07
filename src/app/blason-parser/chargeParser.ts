import * as P from 'parsimmon';
import {
  Charge,
  charges,
  Eagle,
  EagleAttitude,
  eagleAttitudes,
  FleurDeLys,
  Lion,
  LionAttitude,
  lionAttitudes,
  LionHead,
  lionHeads,
  LionTail,
  lionTails,
  Lozenge,
  Roundel,
} from '../model/charge';
import { aParser, buildAltParser, numberParser } from './parser.helper';
import { identity } from '../../utils/identity';
import { gules, or } from '../model/tincture';
import { cannotHappen } from '../../utils/cannot-happen';
import { tinctureParserFromName } from './tinctureParser';
import { isNotOne, stringifyNumber, supportedNumbers } from '../model/countAndDisposition';

const lionParser = (count: 1 | 2 | 3): P.Parser<Lion> => {
  const attitudeParser: P.Parser<LionAttitude> = buildAltParser(lionAttitudes, identity);
  const headParser: P.Parser<LionHead> = buildAltParser(lionHeads, identity);
  const tailParser: P.Parser<LionTail> = buildAltParser(lionTails, identity);

  const lionNameParser = (count === 1 ? P.regex(/lion/i) : P.regex(/lions/i)).result('lion' as const);
  const lionParser: P.Parser<Lion> = P.seq(
    lionNameParser,
    P.whitespace.then(attitudeParser).fallback('rampant'),
    P.whitespace.then(headParser).fallback(null),
    P.whitespace
      .then(P.regex(/tail/i))
      .then(P.whitespace)
      .then(tailParser)
      .fallback(null),
    count === 1
      ? P.of({ count })
      : P.whitespace.then(P.regex(/in pale/i).result('pale' as const)).map((disposition) => ({ count, disposition })),
    P.whitespace.then(tinctureParserFromName),
    P.whitespace
      .then(P.regex(/armed and langued/i))
      .then(P.whitespace)
      .then(tinctureParserFromName)
      .fallback(null)
  ).map(
    ([name, attitude, head, tail, countAndDisposition, tincture, armedAndLangued]): Lion => {
      return {
        name,
        attitude,
        tincture,
        armedAndLangued: armedAndLangued || gules,
        tail,
        head,
        countAndDisposition,
      };
    }
  );

  return lionParser;
};

const eagleParser = () => {
  const eagleNameParser = P.regex(/eagle/i);
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
};

const fleurDeLysParser = (): P.Parser<FleurDeLys> => {
  return P.seq(
    P.alt(
      aParser,
      buildAltParser(supportedNumbers.filter(isNotOne), stringifyNumber).skip(P.whitespace)
    ),
    P.regexp(/Fleurs?[- ]de[- ]l[yi]s/i).skip(P.whitespace),
    tinctureParserFromName
  ).map(([count, , tincture]) => {
    return {
      name: 'fleurdelys',
      count,
      tincture,
    };
  });
};

const roundelParser = (): P.Parser<Roundel> => {
  return P.seq(
    P.alt(
      aParser,
      buildAltParser(supportedNumbers.filter(isNotOne), stringifyNumber).skip(P.whitespace)
    ),
    P.alt(
      P.seq(
        P.regexp(/roundels?/i)
          .skip(P.whitespace)
          .result('roundel' as const),
        tinctureParserFromName
      ).map((arr) => [arr[0], arr[1], 'nothing'] as const),
      P.regex(/bezants?/i).result(['roundel' as const, or, 'nothing'] as const),
      P.seq(
        P.regexp(/annulets?/i)
          .skip(P.whitespace)
          .result('roundel' as const),
        tinctureParserFromName
      ).map((arr) => [arr[0], arr[1], 'voided'] as const)
    )
  ).map(([count, [name, tincture, inside]]) => ({ name, count, tincture, inside }));
};

const lozengeParser = (): P.Parser<Lozenge> => {
  return P.seq(
    P.alt(
      aParser,
      buildAltParser(supportedNumbers.filter(isNotOne), stringifyNumber).skip(P.whitespace)
    ),
    P.alt(
      P.seq(
        P.regexp(/lozenges?/i)
          .skip(P.whitespace)
          .result('lozenge' as const),
        tinctureParserFromName
      ).map(([name, tincture]) => [name, tincture, 'nothing'] as const),
      P.seq(
        P.regexp(/mascles?/i)
          .skip(P.whitespace)
          .result('lozenge' as const),
        tinctureParserFromName
      ).map(([name, tincture]) => [name, tincture, 'voided'] as const),
      P.seq(
        P.regexp(/rustres?/i)
          .skip(P.whitespace)
          .result('lozenge' as const),
        tinctureParserFromName
      ).map(([name, tincture]) => [name, tincture, 'pierced'] as const)
    )
  ).map(([count, [name, tincture, inside]]) => ({ name, count, tincture, inside }));
};

export function chargeParser(): P.Parser<Charge> {
  return P.alt(
    ...charges.map((charge) => {
      if (charge === 'lion') {
        return P.alt(aParser, numberParser(2), numberParser(3))
          .trim(P.optWhitespace)
          .chain((count) => lionParser(count));
      } else if (charge === 'eagle') {
        return P.alt(aParser)
          .trim(P.optWhitespace)
          .chain((): P.Parser<Charge> => eagleParser());
      } else if (charge === 'fleurdelys') {
        return fleurDeLysParser();
      } else if (charge === 'roundel') {
        return roundelParser();
      } else if (charge === 'lozenge') {
        return lozengeParser();
      } else {
        return cannotHappen(charge);
      }
    })
  );
}
