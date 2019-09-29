import * as React from 'react';

type Props<A extends string | number> = {
  options: ReadonlyArray<A>;
  value: A;
  valueChange: (a: A) => void;
  formatValue?: (a: A) => string;
};
export function SelectScalar<A extends string | number>(props: Props<A>) {
  const options = props.options.map((v) => ({ value: v, label: props.formatValue ? props.formatValue(v) : v }));
  const valueIdx = options.findIndex((v) => v.value === props.value);

  return (
    <select
      className="form-control"
      value={valueIdx}
      onChange={(e) => props.valueChange(options[parseInt(e.target.value)].value)}
    >
      {options.map((option, i) => {
        return (
          <option key={i} value={i}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
}
