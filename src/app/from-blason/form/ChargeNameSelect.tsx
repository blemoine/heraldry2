import * as React from 'react';
import { ChargeName, chargeNames, getChargeClassByName } from '../../model/charge-all';
import { SelectScalar } from '../../common/SelectScalar';
import { useCallback } from 'react';

type Props = { charge: ChargeName | null; chargeChange: (t: ChargeName | null) => void };
type ChargeNameOrNone = ChargeName | 'None';

const options: { [category: string]: Array<ChargeNameOrNone> } = {
  None: ['None'],
};
for (const name of chargeNames) {
  const category = getChargeClassByName(name).category;
  if (!options.hasOwnProperty(category)) {
    options[category] = [];
  }
  options[category].push(name);
}

export function ChargeNameSelect({ charge, chargeChange }: Props) {
  const chargeTypeChange = useCallback(
    (name: ChargeName | 'None') => {
      if (name === 'None') {
        chargeChange(null);
      } else {
        chargeChange(name);
      }
    },
    [chargeChange]
  );

  const searchedCharge = charge || 'None';

  return <SelectScalar options={options} value={searchedCharge} valueChange={chargeTypeChange} />;
}
