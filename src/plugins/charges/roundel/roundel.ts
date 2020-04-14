import * as P from 'parsimmon';
import { InsideCharge } from '~/plugins/charges/inside/inside';
import { areTinctureEquals, or } from '~/app/model/tincture';
import { stringifyNumber } from '~/app/model/countAndDisposition';
import { countAndDispositionParser, countParser } from '~/app/blason-parser/chargeParser';
import { tinctureParserFromName } from '~/app/blason-parser/tinctureParser';
import { Display } from './Display';
import { cannotHappen } from '~/utils/cannot-happen';

export const roundelInsideValues = ['nothing', 'voided'] as const;
export type RoundelInsideValue = typeof roundelInsideValues[number];

export class Roundel extends InsideCharge {
  static insideValues: readonly RoundelInsideValue[] = roundelInsideValues;

  static parser = (): P.Parser<Roundel> => {
    return countParser.trim(P.optWhitespace).chain((count) => {
      return P.seq(
        P.alt(
          P.seq(
            P.regexp(/roundels?/i)
              .desc('roundel')
              .then(countAndDispositionParser(count)),
            P.whitespace.then(tinctureParserFromName)
          ).map(([countAndDisposition, tincture]) => [countAndDisposition, tincture, 'nothing'] as const),
          P.regexp(/bezants?/i)
            .desc('bezant')
            .then(countAndDispositionParser(count))
            .map((countAndDisposition) => [countAndDisposition, or, 'nothing'] as const),
          P.seq(
            P.regexp(/annulets?/i)
              .desc('annulet')
              .then(countAndDispositionParser(count)),
            P.whitespace.then(tinctureParserFromName)
          ).map(([countAndDisposition, tincture]) => [countAndDisposition, tincture, 'voided'] as const)
        )
      ).map(
        ([[countAndDisposition, tincture, inside]]): Roundel => new Roundel({ countAndDisposition, tincture, inside })
      );
    });
  };
  static category = 'designs';
  static display = Display;

  public inside!: RoundelInsideValue;

  public stringifyCountAndName(): string {
    const count = this.countAndDisposition.count;
    let term = '';
    if (this.inside === 'voided') {
      term = 'annulet';
    } else if (this.inside === 'nothing') {
      term = areTinctureEquals(this.tincture, or) ? 'bezant' : 'roundel';
    } else {
      return cannotHappen(this.inside);
    }
    return count === 1 ? 'a ' + term : stringifyNumber(count) + ' ' + term + 's';
  }

  public stringifyTincture(): string {
    if (this.inside === 'nothing' && areTinctureEquals(this.tincture, or)) {
      return '';
    } else {
      return super.stringifyTincture();
    }
  }
}
