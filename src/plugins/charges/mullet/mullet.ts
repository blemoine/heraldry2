import * as P from 'parsimmon';
import { Charge } from '~/app/model/charge';
import { Tincture, or } from '~/app/model/tincture';
import { CountAndDisposition, stringifyNumber } from '~/app/model/countAndDisposition';
import { countAndDispositionParser, countParser } from '~/app/blason-parser/chargeParser';
import { tinctureParserFromName } from '~/app/blason-parser/tinctureParser';
import { constStr, numberParser } from '~/app/blason-parser/parser.helper';
import { Display } from './Display';
import { Form } from './Form';

export const mulletInsides = ['nothing', 'pierced'] as const;
export type MulletInside = typeof mulletInsides[number];
export const mulletPoints = [5, 6, 7, 8] as const;
export type MulletPoints = typeof mulletPoints[number];

export class Mullet extends Charge {
  static parser = (): P.Parser<Mullet> => {
    return countParser.trim(P.optWhitespace).chain<Mullet>((count) => {
      return P.alt<'mullet'>(constStr('mullet', 'mullets'), constStr('mullet'))
        .then(
          P.seq(
            P.whitespace
              .then(P.string('of'))
              .then(P.whitespace)
              .then(P.alt<MulletPoints>(...mulletPoints.map(numberParser)))
              .skip(P.string('points'))
              .fallback(5 as const),
            P.whitespace.then(constStr('pierced')).fallback('nothing' as const),
            countAndDispositionParser(count),
            P.whitespace.then(tinctureParserFromName)
          )
        )
        .map(
          ([points, inside, countAndDisposition, tincture]): Mullet =>
            new Mullet({
              countAndDisposition,
              tincture,
              points,
              inside,
            })
        );
    });
  };
  static category = 'designs';
  static display = Display;
  static form = Form;

  public inside: MulletInside;
  public points: MulletPoints;

  constructor({
    inside = 'nothing',
    points = 5,
    tincture = or,
    countAndDisposition = { count: 1, disposition: 'default' },
  }: {
    inside: MulletInside;
    points: MulletPoints;
    tincture: Tincture;
    countAndDisposition: CountAndDisposition;
  }) {
    super({ tincture, countAndDisposition });
    this.inside = inside;
    this.points = points;
  }

  public stringifyCountAndName(): string {
    const count = this.countAndDisposition.count;
    let result = count === 1 ? 'a mullet' : stringifyNumber(count) + ' mullets';
    if (this.points !== 5) {
      result += ' of ' + stringifyNumber(this.points) + ' points';
    }
    if (this.inside === 'pierced') {
      result += ' pierced';
    }
    return result;
  }
}
