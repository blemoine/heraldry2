import * as React from 'react';
import { gules, or } from '../model/tincture';
import { Charge } from '../model/charge';
import { cannotHappen } from '../../utils/cannot-happen';
import { ChargeNameSelect } from './ChargeNameSelect';
import { ChargeDetailForm } from './ChargeDetailForm';

type Props = { charge: Charge | null; chargeChange: (charge: Charge | null) => void };
export const ChargeForm = ({ charge, chargeChange }: Props) => {
  function changeChargeType(chargeName: Charge['name'] | null) {
    if (chargeName) {
      if (chargeName === 'lion') {
        chargeChange({
          name: chargeName,
          armedAndLangued: gules,
          attitude: 'rampant',
          head: null,
          tail: null,
          tincture: or,
        });
      } else {
        cannotHappen(chargeName);
      }
    } else {
      chargeChange(null);
    }
  }

  return (
    <>
      <div className="form-group">
        <label>Select your charge</label>
        <ChargeNameSelect charge={charge ? charge.name : null} chargeChange={changeChargeType} />
      </div>

      {charge && <ChargeDetailForm charge={charge} chargeChange={chargeChange} />}
    </>
  );
};
