import * as React from 'react';
import { Charge } from '../../model/charge';

type Props = { charge: Charge; chargeChange: (charge: Charge) => void };
export function ChargeDetailForm({ charge, chargeChange }: Props) {
  const Form = charge.getForm();
  return <Form charge={charge} chargeChange={chargeChange} />;
}
