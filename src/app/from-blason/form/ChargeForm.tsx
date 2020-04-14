import * as React from 'react';
import { useCallback } from 'react';
import { Charge } from '../../model/charge';
import { ChargeName, getChargeClassByName } from '../../model/charge-all';
import { ChargeNameSelect } from './ChargeNameSelect';
import { ChargeDetailForm } from './ChargeDetailForm';

type ChargeOrNullFormParameters<T extends Charge> = {
  charge: T | null;
  chargeChange: (charge: T | null) => void;
};
export type ChargeFormParameters<T extends Charge> = {
  charge: T;
  chargeChange: (charge: T) => void;
};
export function ChargeForm({ charge, chargeChange }: ChargeOrNullFormParameters<Charge>) {
  const changeChargeType = useCallback(
    function (chargeName: ChargeName | null) {
      if (!chargeName) {
        chargeChange(null);
      } else {
        const chargeClass = getChargeClassByName(chargeName);
        const params = charge ? { countAndDisposition: charge.countAndDisposition, tincture: charge.tincture } : {};
        chargeChange(new chargeClass(params));
      }
    },
    [chargeChange]
  );

  return (
    <>
      <div className="form-group charge-type-select">
        <label>Select your charge</label>
        <ChargeNameSelect charge={charge ? charge.getName() : null} chargeChange={changeChargeType} />
      </div>

      {charge && <ChargeDetailForm charge={charge} chargeChange={chargeChange} />}
    </>
  );
}
