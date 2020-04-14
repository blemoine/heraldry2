import { Charge } from '~/app/model/charge';
import { Tincture, or } from '~/app/model/tincture';
import { CountAndDisposition } from '~/app/model/countAndDisposition';
import { Form } from './Form';

export const insideValues = ['nothing', 'pierced', 'voided'] as const;
export type InsideValue = typeof insideValues[number];

export abstract class InsideCharge extends Charge {
  static form = Form;
  static insideValues: readonly InsideValue[];

  public inside: InsideValue;

  constructor({
    tincture = or,
    countAndDisposition = { count: 3, disposition: 'default' },
    inside = 'nothing',
  }: {
    tincture: Tincture;
    countAndDisposition: CountAndDisposition;
    inside: InsideValue;
  }) {
    super({ tincture, countAndDisposition });
    this.inside = inside;
  }
}
