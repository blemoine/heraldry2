import * as P from 'parsimmon';
import { BasicCharge } from '~/plugins/charges/basic/basic';
import { Tincture, or } from '~/app/model/tincture';
import { CountAndDisposition } from '~/app/model/countAndDisposition';
import { countAndDispositionParser, countParser } from '~/app/blason-parser/chargeParser';
import { tinctureParserFromName } from '~/app/blason-parser/tinctureParser';
import { Display } from './Display';

export class Escutcheon extends BasicCharge {
  static parser = (): P.Parser<Escutcheon> => {
    return countParser.trim(P.optWhitespace).chain((count) => {
      return P.regexp(/escutcheons?/i)
        .desc('escutcheon')
        .then(P.seq(countAndDispositionParser(count), P.whitespace.then(tinctureParserFromName)))
        .map(([countAndDisposition, tincture]): Escutcheon => new Escutcheon({ countAndDisposition, tincture }));
    });
  };
  static category = 'designs';
  static display = Display;

  constructor({
    tincture = or,
    countAndDisposition = { count: 3, disposition: 'default' },
  }: {
    tincture: Tincture;
    countAndDisposition: CountAndDisposition;
  }) {
    super({ tincture, countAndDisposition });
  }
}
