import * as React from 'react';
import { Charge } from '../../model/charge';
import { cannotHappen } from '../../../utils/cannot-happen';
import { LionForm } from './charges/LionForm';
import { EagleForm } from './charges/EagleForm';
import { FleurDeLysForm } from './charges/FleurDeLysForm';
import { RoundelForm } from './charges/RoundelForm';
import { LozengeForm } from './charges/LozengeForm';
import { CrossForm } from './charges/CrossForm';
import { TinctureConfiguration } from '../../model/tincture-configuration';
import { MulletForm } from './charges/MulletForm';
import { EscutcheonForm } from './charges/EscutcheonForm';

type Props = { tinctureConfiguration: TinctureConfiguration; charge: Charge; chargeChange: (charge: Charge) => void };
export function ChargeDetailForm({ tinctureConfiguration, charge, chargeChange }: Props) {
  if (charge.name === 'lion') {
    return <LionForm tinctureConfiguration={tinctureConfiguration} charge={charge} chargeChange={chargeChange} />;
  } else if (charge.name === 'eagle') {
    return <EagleForm tinctureConfiguration={tinctureConfiguration} charge={charge} chargeChange={chargeChange} />;
  } else if (charge.name === 'fleurdelys') {
    return <FleurDeLysForm tinctureConfiguration={tinctureConfiguration} charge={charge} chargeChange={chargeChange} />;
  } else if (charge.name === 'escutcheon') {
    return <EscutcheonForm tinctureConfiguration={tinctureConfiguration} charge={charge} chargeChange={chargeChange} />;
  } else if (charge.name === 'roundel') {
    return <RoundelForm tinctureConfiguration={tinctureConfiguration} charge={charge} chargeChange={chargeChange} />;
  } else if (charge.name === 'lozenge') {
    return <LozengeForm tinctureConfiguration={tinctureConfiguration} charge={charge} chargeChange={chargeChange} />;
  } else if (charge.name === 'cross') {
    return <CrossForm tinctureConfiguration={tinctureConfiguration} charge={charge} chargeChange={chargeChange} />;
  } else if (charge.name === 'mullet') {
    return <MulletForm tinctureConfiguration={tinctureConfiguration} charge={charge} chargeChange={chargeChange} />;
  } else {
    return cannotHappen(charge);
  }
}
