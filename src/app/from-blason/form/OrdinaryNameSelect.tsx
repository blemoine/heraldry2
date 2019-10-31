import * as React from 'react';
import { isSubOrdinary, ordinaries, Ordinary } from '../../model/ordinary';
import { SelectScalar } from '../../common/SelectScalar';
import { stringifyOrdinaryName } from '../../model/stringify/stringify.helper';

type Props = { ordinary: Ordinary['name'] | null; ordinaryChange: (t: Ordinary['name'] | null) => void };
type OrdinaryNameOrNone = Ordinary['name'] | 'None';

const stringFormatter = (o: Ordinary['name'] | 'None'): string => (o === 'None' ? o : stringifyOrdinaryName(o));
const trueOrdinary = ordinaries.filter((o) => !isSubOrdinary(o));
const subOrdinaries = ordinaries.filter(isSubOrdinary);
const options: { [group: string]: Array<OrdinaryNameOrNone> } = {
  None: ['None'],
  ordinary: trueOrdinary,
  subordinary: subOrdinaries,
};
export const OrdinaryNameSelect = ({ ordinary, ordinaryChange }: Props) => {
  const ordinaryTypeChange = (name: OrdinaryNameOrNone) => {
    ordinaryChange(name === 'None' ? null : name);
  };

  const searchedOrdinary = ordinary || 'None';

  return (
    <SelectScalar
      options={options}
      value={searchedOrdinary}
      valueChange={ordinaryTypeChange}
      formatValue={stringFormatter}
    />
  );
};
