import { Charge } from '~/app/model/charge';
import { Tincture, or, sable } from '~/app/model/tincture';
import { CountAndDisposition } from '~/app/model/countAndDisposition';
import { Form } from './Form';
import { ChargeFormParameters } from '~/app/from-blason/form/ChargeForm';

export const animalAttitudes = [
  'couchant',
  'displayed',
  'dormant',
  'passant',
  'rampant',
  'salient',
  'sejant',
  'sejant-erect',
  'statant',
] as const;
export type AnimalAttitude = typeof animalAttitudes[number];

export abstract class Animal extends Charge {
  static attitudes: readonly AnimalAttitude[] = animalAttitudes;
  static category = 'animals';
  static secondaryTinctureLabel: string;
  static form: (parameters: ChargeFormParameters<any>) => JSX.Element = Form;

  public attitude: AnimalAttitude;
  public secondaryTincture: Tincture;

  constructor({
    attitude = 'rampant',
    tincture = sable,
    secondaryTincture = or,
    countAndDisposition = { count: 1, disposition: 'default' },
  }: {
    attitude: AnimalAttitude;
    tincture: Tincture;
    secondaryTincture: Tincture;
    countAndDisposition: CountAndDisposition;
  }) {
    super({ tincture, countAndDisposition });
    this.attitude = attitude;
    this.secondaryTincture = secondaryTincture;
    this.allTinctures.push(secondaryTincture);
  }

  public stringifyCountAndName(): string {
    return super.stringifyCountAndName() + ' ' + this.attitude;
  }
}
