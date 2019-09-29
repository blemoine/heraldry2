import * as React from 'react';

type Props<A extends string | number> = {
  options: ReadonlyArray<A>;
  value: A;
  valueChange: (a: A) => void;
  formatValue?: (a: A) => string;
};
export function SelectScalar<A extends string | number>(props: Props<A>) {
  const valueIdx = props.options.findIndex((v) => v === props.value);

  return (
    <select
      className="form-control"
      value={valueIdx}
      onChange={(e) => props.valueChange(props.options[parseInt(e.target.value)])}
    >
      {props.options.map((v, i) => (
        <option key={i} value={i}>
          {props.formatValue ? props.formatValue(v) : v}
        </option>
      ))}
    </select>
  );
}
