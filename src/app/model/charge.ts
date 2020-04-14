import * as P from 'parsimmon';
import { ChargeName } from './charge-all';
import { Tincture } from './tincture';
import { CountAndDisposition, stringifyNumber } from './countAndDisposition';
import { stringifyDisposition, stringifyTincture } from './stringify/stringify.helper';
import { ChargeDisplayParameters } from '~/app/from-blason/coats-of-arms-parts/ChargeDisplay';
import { ChargeFormParameters } from '~/app/from-blason/form/ChargeForm';

export abstract class Charge {
  static category: string;
  static display: (parameters: ChargeDisplayParameters<any>) => JSX.Element;
  static form: (parameters: ChargeFormParameters<any>) => JSX.Element;
  static parser: () => P.Parser<Charge>;
  static svg: (props: any) => JSX.Element;

  public tincture: Tincture;
  public countAndDisposition: CountAndDisposition;
  public allTinctures: Tincture[];

  constructor({ tincture, countAndDisposition }: { tincture: Tincture; countAndDisposition: CountAndDisposition }) {
    this.tincture = tincture;
    this.countAndDisposition = countAndDisposition;
    this.allTinctures = [tincture];
  }

  public getName(): ChargeName {
    return Object.getPrototypeOf(this).constructor.name.toLowerCase();
  }

  public getDisplay() {
    return Object.getPrototypeOf(this).constructor.display;
  }

  public getForm() {
    return Object.getPrototypeOf(this).constructor.form;
  }

  public getSvg() {
    return Object.getPrototypeOf(this).constructor.svg;
  }

  public stringifyCountAndName(): string {
    const count = this.countAndDisposition.count;
    const name = this.getName();
    return count === 1 ? 'a ' + name : stringifyNumber(count) + ' ' + name + 's';
  }

  public stringifyTincture(): string {
    return ' ' + stringifyTincture(this.tincture);
  }

  public stringify(): string {
    const count = this.countAndDisposition.count;
    const disposition = this.countAndDisposition.disposition;
    let result = this.stringifyCountAndName();

    if (count !== 1 && disposition !== 'default') {
      result += ' in ' + stringifyDisposition(disposition);
    }
    result += this.stringifyTincture();

    return result;
  }
}
