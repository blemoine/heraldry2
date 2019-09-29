import * as React from 'react';

type Props<A extends string | number> = {
  options: ReadonlyArray<A> | { [group: string]: Array<A> };
  value: A;
  valueChange: (a: A) => void;
  formatValue?: (a: A) => string;
};
export function SelectScalar<A extends string | number>(props: Props<A>) {
  const options = Array.isArray(props.options) ? props.options : Object.values(props.options).flat();

  return (
    <select className="form-control" value={props.value} onChange={(e) => props.valueChange(e.target.value as A)}>
      {Array.isArray(props.options) ? (
        <Options options={options} formatValue={props.formatValue} />
      ) : (
        Object.entries(props.options).map(([group, opts], i) => {
          return (
            <optgroup key={i} label={group}>
              <Options options={opts} formatValue={props.formatValue} />
            </optgroup>
          );
        })
      )}
    </select>
  );
}

function Options<A extends string | number>({
  options,
  formatValue,
}: {
  options: Array<A>;
  formatValue?: (a: A) => string;
}) {
  return (
    <>
      {options.map((v, i) => (
        <option key={i} value={v}>
          {formatValue ? formatValue(v) : v}
        </option>
      ))}
    </>
  );
}
