import Select from 'react-select';
import { ordinaries, Ordinary } from '../model/blason';
import * as React from 'react';

type Props = { ordinary: Ordinary['name'] | null; ordinaryChange: (t: Ordinary['name'] | null) => void };

const ordinariesWithNone = ['None', ...ordinaries].map((t) => ({ value: t, label: t }));
export const OrdinaryNameSelect = ({ ordinary, ordinaryChange }: Props) => {
  const ordinaryTypeChange = (name: Ordinary['name'] | 'None') => {
    if (name === 'None') {
      ordinaryChange(null);
    } else {
      ordinaryChange(name);
    }
  };

  const value = ordinariesWithNone.find(({value}) => value === ordinary);

  return (
    <Select
      options={ordinariesWithNone}
      value={value}
      onChange={(t: any) => ordinaryTypeChange(t.value === 'None' ? null : t.value)}
    />
  );
};
