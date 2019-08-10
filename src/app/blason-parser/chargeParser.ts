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
import { isNotOne, SupportedNumber, supportedNumbers } from '../model/countAndDisposition';

const countParser: P.Parser<SupportedNumber> = P.alt(aParser, ...supportedNumbers.filter(isNotOne).map(numberParser));

const countAndDispositionParser = (count: SupportedNumber) =>
  count === 1
    ? P.of({ count, disposition: 'default' })
    : P.whitespace
        .then(P.regex(/in pale/i).result('pale' as const))
        .fallback('default' as const)
        .map((disposition) => ({ count, disposition }));

const lionParser = (count: SupportedNumber): P.Parser<Lion> => {
  const attitudeParser: P.Parser<LionAttitude> = buildAltParser(lionAttitudes, identity);
  const headParser: P.Parser<LionHead> = buildAltParser(lionHeads, identity);
  const tailParser: P.Parser<LionTail> = buildAltParser(lionTails, identity);

  const lionNameParser = (count === 1 ? P.regex(/lion/i) : P.regex(/lions/i)).result('lion' as const);

  return P.seq(
    lionNameParser,
    P.whitespace.then(attitudeParser).fallback('rampant'),
    P.whitespace.then(headParser).fallback(null),
    P.whitespace
      .then(P.regex(/tail/i))
      .then(P.whitespace)
      .then(tailParser)
      .fallback(null),
    countAndDispositionParser(count),
    P.whitespace.then(tinctureParserFromName),
    P.whitespace
      .then(P.regex(/armed and langued/i))
      .then(P.whitespace)
      .then(tinctureParserFromName)
      .fallback(gules)
  ).map(
    ([name, attitude, head, tail, countAndDisposition, tincture, armedAndLangued]): Lion => {
      return {
        name,
        attitude,
        tincture,
        armedAndLangued,
        tail,
        head,
        countAndDisposition,
      };
    }
  );
};

const eagleParser = (count: SupportedNumber) => {
  const eagleNameParser = P.regex(/eagles?/i);
  const eagleAttitudeParser: P.Parser<EagleAttitude> = buildAltParser(eagleAttitudes, identity);

  return P.seq(
    eagleNameParser.skip(P.whitespace).then(eagleAttitudeParser),
    countAndDispositionParser(count),
    P.whitespace.then(tinctureParserFromName),
    P.whitespace
      .then(P.regex(/beaked and armed/i))
      .then(P.whitespace)
      .then(tinctureParserFromName)
      .fallback(null)
  ).map(
    ([attitude, countAndDisposition, tincture, beakedAndArmed]): Eagle => {
      return {
        name: 'eagle',
        countAndDisposition,
        attitude,
        tincture,
        beakedAndArmed: beakedAndArmed || tincture,
      };
    }
  );
};

const fleurDeLysParser = (): P.Parser<FleurDeLys> => {
  return countParser.chain((count) => {
    return P.seq(
      P.regexp(/Fleurs?[- ]de[- ]l[yi]s/i).result('fleurdelys' as const),
      countAndDispositionParser(count),
      P.whitespace.then(tinctureParserFromName)
    ).map(([name, countAndDisposition, tincture]): FleurDeLys => ({ name, countAndDisposition, tincture }));
  });
};

const roundelParser = (): P.Parser<Roundel> => {
  return countParser.chain((count) => {
    return P.seq(
      P.alt(
        P.seq(
          P.regexp(/roundels?/i).result('roundel' as const),
          countAndDispositionParser(count),
          P.whitespace.then(tinctureParserFromName)
        ).map(([name, countAndDisposition, tincture]) => [name, countAndDisposition, tincture, 'nothing'] as const),
        P.seq(P.regexp(/bezants?/i).result('roundel' as const), countAndDispositionParser(count)).map(
          ([name, countAndDisposition]) => [name, countAndDisposition, or, 'nothing'] as const
        ),
        P.seq(
          P.regexp(/annulets?/i).result('roundel' as const),
          countAndDispositionParser(count),
          P.whitespace.then(tinctureParserFromName)
        ).map(([name, countAndDisposition, tincture]) => [name, countAndDisposition, tincture, 'voided'] as const)
      )
    ).map(
      ([[name, countAndDisposition, tincture, inside]]): Roundel => ({ name, countAndDisposition, tincture, inside })
    );
  });
};

const lozengeParser = (): P.Parser<Lozenge> => {
  return countParser.chain((count) => {
    return P.seq(
      P.alt(
        P.regexp(/lozenges?/i).result(['lozenge', 'nothing'] as const),
        P.regexp(/mascles?/i).result(['lozenge', 'voided'] as const),
        P.regexp(/rustres?/i).result(['lozenge', 'pierced'] as const)
      ),
      countAndDispositionParser(count),
      P.whitespace.then(tinctureParserFromName)
    ).map(
      ([[name, inside], countAndDisposition, tincture]): Lozenge => ({ name, countAndDisposition, tincture, inside })
    );
  });
};

export function chargeParser(): P.Parser<Charge> {
  return P.alt(
    ...charges.map((charge) => {
      if (charge === 'lion') {
        return countParser.trim(P.optWhitespace).chain((count) => lionParser(count));
      } else if (charge === 'eagle') {
        return countParser.trim(P.optWhitespace).chain((count): P.Parser<Charge> => eagleParser(count));
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
