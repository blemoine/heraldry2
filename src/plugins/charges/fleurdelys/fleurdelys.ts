import * as P from 'parsimmon';
import { BasicCharge } from '~/plugins/charges/basic/basic';
import { Tincture, or } from '~/app/model/tincture';
import { CountAndDisposition, stringifyNumber } from '~/app/model/countAndDisposition';
import { countAndDispositionParser, countParser } from '~/app/blason-parser/chargeParser';
import { tinctureParserFromName } from '~/app/blason-parser/tinctureParser';
import Svg from './Svg';

export class FleurDeLys extends BasicCharge {
  static parser = (): P.Parser<FleurDeLys> => {
    return countParser.trim(P.optWhitespace).chain((count) => {
      return P.regexp(/Fleurs?[- ]de[- ]l[yi]s/i)
        .desc('fleur de lys')
        .then(P.seq(countAndDispositionParser(count), P.whitespace.then(tinctureParserFromName)))
        .map(([countAndDisposition, tincture]): FleurDeLys => new FleurDeLys({ countAndDisposition, tincture }));
    });
  };
  static category = 'plants';
  static svg = Svg;

  constructor({
    tincture = or,
    countAndDisposition = { count: 3, disposition: 'default' },
  }: {
    tincture: Tincture;
    countAndDisposition: CountAndDisposition;
  }) {
    super({ tincture, countAndDisposition });
  }

  public stringifyCountAndName(): string {
    const count = this.countAndDisposition.count;
    return count === 1 ? 'a fleur de lys' : stringifyNumber(count) + ' fleurs de lys';
  }
}
