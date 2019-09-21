import * as React from 'react';
import { isSubOrdinary, ordinaries, Ordinary } from '../../model/ordinary';
import Select from 'react-select';
import { GroupedOptionsType, ValueType } from 'react-select/src/types';
import { stringifyOrdinaryName } from '../blason.helpers';

type Props = { ordinary: Ordinary['name'] | null; ordinaryChange: (t: Ordinary['name'] | null) => void };

type OrdinaryNameSelectOption = { label: string; value: Ordinary['name'] | 'None' };
export const OrdinaryNameSelect = ({ ordinary, ordinaryChange }: Props) => {
  const ordinaryTypeChange = (name: Ordinary['name'] | 'None') => {
    if (name === 'None') {
      ordinaryChange(null);
    } else {
      ordinaryChange(name);
    }
  };

  const searchedOrdinary = ordinary || 'None';

  const init: {
    ordinary: ReadonlyArray<OrdinaryNameSelectOption>;
    subOrdinary: ReadonlyArray<OrdinaryNameSelectOption>;
  } = {
    ordinary: [],
    subOrdinary: [],
  };
  const NoneOption = { label: 'None', value: 'None' as const };
  const ordinariesOptions = ordinaries.map((ordinaryName) => ({
    label: stringifyOrdinaryName(ordinaryName),
    value: ordinaryName,
  }));
  const groupedOrdinary = ordinariesOptions.reduce((acc, ordinary) => {
    if (isSubOrdinary(ordinary.value)) {
      return { ...acc, subOrdinary: [...acc.subOrdinary, ordinary] as const };
    } else {
      return { ...acc, ordinary: [...acc.ordinary, ordinary] as const };
    }
  }, init);
  const ordinariesWithNone: GroupedOptionsType<OrdinaryNameSelectOption> = [
    { label: 'None', options: [NoneOption] },
    ...Object.entries(groupedOrdinary).map(([label, options]) => ({
      label,
      options,
    })),
  ];
  const value = ordinariesOptions.find((v) => v.value === searchedOrdinary) || NoneOption;

  return (
    <Select<OrdinaryNameSelectOption>
      classNamePrefix="ordinary-name"
      options={ordinariesWithNone}
      value={value}
      onChange={(t: ValueType<OrdinaryNameSelectOption>) => (t && 'value' in t ? ordinaryTypeChange(t.value) : null)}
      menuPortalTarget={document.body}
    />
  );
};
