import { Charge } from '~/app/model/charge';
import { Display } from './Display';
import { Form } from './Form';

export abstract class BasicCharge extends Charge {
  static display = Display;
  static form = Form;
}
