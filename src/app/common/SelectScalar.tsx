import * as React from 'react';
import Select from 'react-select';

type Props<A extends string | number> = {
  options: ReadonlyArray<A>;
  value: A;
  valueChange: (a: A) => void;
  formatValue?: (a: A) => string;
  classNamePrefix?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
};
export function SelectScalar<A extends string | number>(props: Props<A>) {
  const options = props.options.map((v) => ({ value: v, label: props.formatValue ? props.formatValue(v) : v }));
  const value = options.find((v) => v.value === props.value);

  return (
    <Select
      classNamePrefix={props.classNamePrefix}
      options={options}
      value={value}
      onChange={(t: any) => props.valueChange(t.value)}
      onMenuClose={props.onMenuClose}
      onMenuOpen={props.onMenuOpen}
    />
  );
}
