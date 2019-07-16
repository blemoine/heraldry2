import * as React from 'react';
import { ordinaries, Ordinary } from '../model/ordinary';
import { SelectScalar } from '../common/SelectScalar';

type Props = { ordinary: Ordinary['name'] | null; ordinaryChange: (t: Ordinary['name'] | null) => void };

const ordinariesWithNone = ['None', ...ordinaries] as const;
export const OrdinaryNameSelect = ({ ordinary, ordinaryChange }: Props) => {
  const ordinaryTypeChange = (name: Ordinary['name'] | 'None') => {
    if (name === 'None') {
      ordinaryChange(null);
    } else {
      ordinaryChange(name);
    }
  };

  const searchedOrdinary = ordinary || 'None';

  return <SelectScalar options={ordinariesWithNone} value={searchedOrdinary} valueChange={ordinaryTypeChange} />;
};
