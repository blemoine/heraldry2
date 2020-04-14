import * as P from 'parsimmon';
import { Charge } from '../model/charge';
import { chargeNames, getChargeClassByName } from '../model/charge-all';
import { aParser, buildAltParser, numberParser } from './parser.helper';
import {
  availableDispositions,
  CountAndDisposition,
  isNotOne,
  SupportedNumber,
  supportedNumbers,
} from '../model/countAndDisposition';
import { stringifyDisposition } from '../model/stringify/stringify.helper';

export const countParser: P.Parser<SupportedNumber> = P.alt(
  aParser,
  ...supportedNumbers.filter(isNotOne).map(numberParser)
);

export const countAndDispositionParser = (count: SupportedNumber): P.Parser<CountAndDisposition> => {
  if (count === 1) {
    return P.of({ count, disposition: 'default' });
  } else {
    return P.whitespace
      .then(
        buildAltParser(
          availableDispositions.filter((x) => x !== 'default'),
          (disposition) => 'in ' + stringifyDisposition(disposition)
        )
      )
      .fallback('default' as const)
      .map((disposition) => ({ count, disposition }));
  }
};

export function chargeParser(): P.Parser<Charge> {
  const chargeParsers: Array<P.Parser<Charge>> = Object.values(chargeNames).map(
    (chargeName): P.Parser<Charge> => {
      return getChargeClassByName(chargeName).parser();
    }
  );
  return P.alt(...chargeParsers);
}
