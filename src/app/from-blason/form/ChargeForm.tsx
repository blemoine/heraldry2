import * as React from 'react';
import { useCallback } from 'react';
import { gules, or, sable } from '../../model/tincture';
import { Charge } from '../../model/charge';
import { cannotHappen } from '../../../utils/cannot-happen';
import { ChargeNameSelect } from './ChargeNameSelect';
import { ChargeDetailForm } from './ChargeDetailForm';

type Props = {
  charge: Charge | null;
  chargeChange: (charge: Charge | null) => void;
};
export function ChargeForm({ charge, chargeChange }: Props) {
  const changeChargeType = useCallback(
    function (chargeName: Charge['name'] | null) {
      if (chargeName === 'lion') {
        chargeChange({
          name: chargeName,
          armedAndLangued: gules,
          attitude: 'rampant',
          head: null,
          tail: null,
          tincture: charge ? charge.tincture : or,
          countAndDisposition: charge ? charge.countAndDisposition : { count: 1, disposition: 'default' },
        });
      } else if (chargeName === 'eagle') {
        chargeChange({
          name: chargeName,
          attitude: 'displayed',
          tincture: charge ? charge.tincture : sable,
          beakedAndArmed: or,
          countAndDisposition: charge ? charge.countAndDisposition : { count: 1, disposition: 'default' },
        });
      } else if (chargeName === 'fleurdelys' || chargeName === 'escutcheon') {
        chargeChange({
          name: chargeName,
          countAndDisposition: charge ? charge.countAndDisposition : { count: 3, disposition: 'default' },
          tincture: charge ? charge.tincture : or,
        });
      } else if (chargeName === 'roundel' || chargeName === 'lozenge') {
        chargeChange({
          name: chargeName,
          countAndDisposition: charge ? charge.countAndDisposition : { count: 3, disposition: 'default' },
          tincture: charge ? charge.tincture : or,
          inside: 'nothing',
        });
      } else if (chargeName === 'cross') {
        chargeChange({
          name: chargeName,
          countAndDisposition: charge ? charge.countAndDisposition : { count: 1, disposition: 'default' },
          tincture: charge ? charge.tincture : or,
          limbs: 'hummetty',
        });
      } else if (chargeName === 'mullet') {
        chargeChange({
          name: chargeName,
          countAndDisposition: charge ? charge.countAndDisposition : { count: 1, disposition: 'default' },
          tincture: charge ? charge.tincture : or,
          inside: 'nothing',
          points: 5,
        });
      } else if (!chargeName) {
        chargeChange(null);
      } else {
        cannotHappen(chargeName);
      }
    },
    [chargeChange]
  );

  return (
    <>
      <div className="form-group charge-type-select">
        <label>Select your charge</label>
        <ChargeNameSelect charge={charge ? charge.name : null} chargeChange={changeChargeType} />
      </div>

      {charge && <ChargeDetailForm charge={charge} chargeChange={chargeChange} />}
    </>
  );
}
