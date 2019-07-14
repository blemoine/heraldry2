import Select from 'react-select';
import * as React from 'react';
import { Charge, charges } from '../model/charge';

type Props = { charge: Charge['name'] | null; chargeChange: (t: Charge['name'] | null) => void };

const ordinariesWithNone = ['None', ...charges].map((t) => ({ value: t, label: t }));
export const ChargeNameSelect = ({ charge, chargeChange }: Props) => {
  const chargeTypeChange = (name: Charge['name'] | 'None') => {
    if (name === 'None') {
      chargeChange(null);
    } else {
      chargeChange(name);
    }
  };

  const searchedCharge = charge || 'None';
  const value = ordinariesWithNone.find(({ value }) => value === searchedCharge);

  return (
    <Select
      options={ordinariesWithNone}
      value={value}
      onChange={(t: any) => chargeTypeChange(t.value === 'None' ? null : t.value)}
    />
  );
};
