import * as React from 'react';
import { Charge, charges } from '../../model/charge';
import { SelectScalar } from '../../common/SelectScalar';
import { useCallback } from 'react';

type Props = { charge: Charge['name'] | null; chargeChange: (t: Charge['name'] | null) => void };

const chargesWithNone = ['None', ...charges] as const;
export function ChargeNameSelect({ charge, chargeChange }: Props) {
  const chargeTypeChange = useCallback(
    (name: Charge['name'] | 'None') => {
      if (name === 'None') {
        chargeChange(null);
      } else {
        chargeChange(name);
      }
    },
    [chargeChange]
  );

  const searchedCharge = charge || 'None';

  return <SelectScalar options={chargesWithNone} value={searchedCharge} valueChange={chargeTypeChange} />;
}
