import * as React from 'react';
import Select from 'react-select';

type Props<A extends string | number> = {
  options: ReadonlyArray<A>;
  value: A;
  valueChange: (a: A) => void;
};
export const SelectScalar = <A extends string | number>(props: Props<A>) => {
  const options = props.options.map((v) => ({ value: v, label: v }));
  const value = options.find((v) => v.value === props.value);

  return <Select options={options} value={value} onChange={(t: any) => props.valueChange(t.value)} />;
};
