import * as React from 'react';
import { Charge, charges } from '../../model/charge';
import { SelectScalar } from '../../common/SelectScalar';

type Props = { charge: Charge['name'] | null; chargeChange: (t: Charge['name'] | null) => void };

const chargesWithNone = ['None', ...charges] as const;
export const ChargeNameSelect = ({ charge, chargeChange }: Props) => {
  const chargeTypeChange = (name: Charge['name'] | 'None') => {
    if (name === 'None') {
      chargeChange(null);
    } else {
      chargeChange(name);
    }
  };

  const searchedCharge = charge || 'None';

  return (
    <SelectScalar
      classNamePrefix="charge-name"
      options={chargesWithNone}
      value={searchedCharge}
      valueChange={chargeTypeChange}
    />
  );
};
