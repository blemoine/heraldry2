import * as P from 'parsimmon';
import { Animal } from '~/plugins/charges/animal/animal';
import { Tincture, areTinctureEquals, or, sable } from '~/app/model/tincture';
import { CountAndDisposition, stringifyNumber } from '~/app/model/countAndDisposition';
import { stringifyTincture } from '~/app/model/stringify/stringify.helper';
import { countAndDispositionParser, countParser } from '~/app/blason-parser/chargeParser';
import { tinctureParserFromName } from '~/app/blason-parser/tinctureParser';
import { buildAltParser } from '~/app/blason-parser/parser.helper';
import { identity } from '~/utils/identity';
import { Display } from './Display';
import Svg from './Svg';

export const eagleAttitudes = ['displayed'] as const;
export type EagleAttitude = typeof eagleAttitudes[number];

export class Eagle extends Animal {
  static attitudes: readonly EagleAttitude[] = eagleAttitudes;
  static secondaryTinctureLabel = 'Tincture of the beak and talons';

  static parser = (): P.Parser<Eagle> => {
    return countParser.trim(P.optWhitespace).chain<Eagle>((count) => {
      const eagleNameParser = P.regex(/eagles?/i).desc('eagle');
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
        ([attitude, countAndDisposition, tincture, beakedAndArmed]): Eagle =>
          new Eagle({
            countAndDisposition,
            attitude,
            tincture,
            beakedAndArmed: beakedAndArmed || tincture,
          })
      );
    });
  };
  static display = Display;
  static svg = Svg;

  public attitude!: EagleAttitude;

  constructor({
    attitude = 'displayed',
    tincture = sable,
    beakedAndArmed = or,
    countAndDisposition = { count: 1, disposition: 'default' },
  }: {
    attitude: EagleAttitude;
    tincture: Tincture;
    beakedAndArmed: Tincture;
    countAndDisposition: CountAndDisposition;
  }) {
    super({ attitude, tincture, secondaryTincture: beakedAndArmed, countAndDisposition });
  }

  public stringifyCountAndName(): string {
    const count = this.countAndDisposition.count;
    return (count === 1 ? 'an eagle' : stringifyNumber(count) + ' eagles') + ' ' + this.attitude;
  }

  public stringify(): string {
    let result = super.stringify();
    if (!areTinctureEquals(this.secondaryTincture, this.tincture)) {
      result += ' beaked and armed ' + stringifyTincture(this.secondaryTincture);
    }
    return result;
  }
}
