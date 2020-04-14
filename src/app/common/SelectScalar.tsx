import * as React from 'react';

type Props<A extends string | number> = {
  options: ReadonlyArray<A> | { [group: string]: Array<A> };
  value: A;
  valueChange: (a: A) => void;
  formatValue?: (a: A) => string;
};
export function SelectScalar<A extends string>(props: Props<A>) {
  const options = Array.isArray(props.options) ? props.options : Object.values(props.options).flat();

  return (
    <select className="form-control" value={props.value} onChange={(e) => props.valueChange(e.target.value as A)}>
      {Array.isArray(props.options) ? (
        <Options options={options} formatValue={props.formatValue} />
      ) : (
        Object.entries(props.options)
          .sort()
          .map(([group, opts], i) => {
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

export function SelectNumberScalar<A extends number>(props: Props<A>) {
  const options = Array.isArray(props.options)
    ? props.options.map((i) => i.toString())
    : Object.entries(props.options).reduce<{ [group: string]: Array<string> }>((acc, [key, values]) => {
        acc[key] = values.map((i: A) => i.toString());

        return acc;
      }, {});
  const formatValue = props.formatValue;
  return (
    <SelectScalar
      options={options}
      value={props.value.toString()}
      valueChange={(str) => props.valueChange(parseFloat(str) as A)}
      formatValue={formatValue ? (str) => formatValue(parseFloat(str) as A) : undefined}
    />
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
