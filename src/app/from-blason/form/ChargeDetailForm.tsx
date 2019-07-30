import * as React from 'react';
import { Charge } from '../../model/charge';
import { cannotHappen } from '../../../utils/cannot-happen';
import { LionForm } from './charges/LionForm';
import { EagleForm } from './charges/EagleForm';
import { FleurDeLysForm } from './charges/FleurDeLysForm';

type Props = { charge: Charge; chargeChange: (charge: Charge) => void };
export const ChargeDetailForm = ({ charge, chargeChange }: Props) => {
  if (charge.name === 'lion') {
    return <LionForm charge={charge} chargeChange={chargeChange} />;
  } else if (charge.name === 'eagle') {
    return <EagleForm charge={charge} chargeChange={chargeChange} />;
  } else if (charge.name === 'fleurdelys') {
    return <FleurDeLysForm charge={charge} chargeChange={chargeChange} />;
  } else {
    return cannotHappen(charge);
  }
};
