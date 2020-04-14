import * as P from 'parsimmon';
import { InsideCharge, InsideValue, insideValues } from '~/plugins/charges/inside/inside';
import { stringifyNumber } from '~/app/model/countAndDisposition';
import { countAndDispositionParser, countParser } from '~/app/blason-parser/chargeParser';
import { tinctureParserFromName } from '~/app/blason-parser/tinctureParser';
import { Display } from './Display';
import { cannotHappen } from '~/utils/cannot-happen';

export class Lozenge extends InsideCharge {
  static insideValues: readonly InsideValue[] = insideValues;

  static parser = (): P.Parser<Lozenge> => {
    return countParser.trim(P.optWhitespace).chain((count) => {
      return P.seq(
        P.alt(
          P.regexp(/lozenges?/i).result('nothing' as const),
          P.regexp(/mascles?/i).result('voided' as const),
          P.regexp(/rustres?/i).result('pierced' as const)
        ),
        countAndDispositionParser(count),
        P.whitespace.then(tinctureParserFromName)
      ).map(
        ([inside, countAndDisposition, tincture]): Lozenge => new Lozenge({ countAndDisposition, tincture, inside })
      );
    });
  };
  static category = 'designs';
  static display = Display;

  public stringifyCountAndName(): string {
    const count = this.countAndDisposition.count;
    let term = '';
    if (this.inside === 'voided') {
      term = 'mascle';
    } else if (this.inside === 'pierced') {
      term = 'rustre';
    } else if (this.inside === 'nothing') {
      term = 'lozenge';
    } else {
      return cannotHappen(this.inside);
    }
    return count === 1 ? 'a ' + term : stringifyNumber(count) + ' ' + term + 's';
  }
}
