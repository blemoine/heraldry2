import * as P from 'parsimmon';
import { Charge } from '~/app/model/charge';
import { Tincture, or } from '~/app/model/tincture';
import { CountAndDisposition, stringifyNumber } from '~/app/model/countAndDisposition';
import { countAndDispositionParser, countParser } from '~/app/blason-parser/chargeParser';
import { tinctureParserFromName } from '~/app/blason-parser/tinctureParser';
import { buildAltParser, constStr } from '~/app/blason-parser/parser.helper';
import { identity } from '~/utils/identity';
import { Display } from './Display';
import { Form } from './Form';

export const crossLimbs = [
  'bottony',
  'cercelée',
  'crosselet',
  'flory',
  'hummetty',
  'maltese',
  'moline',
  'pattée',
  'potent',
] as const;
export type CrossLimbs = typeof crossLimbs[number];

export class Cross extends Charge {
  static parser = (): P.Parser<Cross> => {
    return countParser.chain((count) => {
      return P.seq(
        P.alt<'cross'>(constStr('cross', 'crosses'), constStr('cross')).then(
          P.whitespace.then(buildAltParser(crossLimbs, identity))
        ),
        countAndDispositionParser(count),
        P.whitespace.then(tinctureParserFromName)
      ).map(([limbs, countAndDisposition, tincture]): Cross => new Cross({ countAndDisposition, tincture, limbs }));
    });
  };
  static category = 'designs';
  static display = Display;
  static form = Form;

  public limbs: CrossLimbs;

  constructor({
    limbs = 'hummetty',
    tincture = or,
    countAndDisposition = { count: 1, disposition: 'default' },
  }: {
    limbs: CrossLimbs;
    tincture: Tincture;
    countAndDisposition: CountAndDisposition;
  }) {
    super({ tincture, countAndDisposition });
    this.limbs = limbs;
  }

  public stringifyCountAndName(): string {
    const count = this.countAndDisposition.count;
    return (count === 1 ? 'a cross' : stringifyNumber(count) + ' crosses') + ' ' + this.limbs;
  }
}
