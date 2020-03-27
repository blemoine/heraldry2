import * as React from 'react';

export const ButtonGroup = function <A extends string | number>({
  options,
  value,
  valueChange,
}: {
  options: ReadonlyArray<A>;
  value: A;
  valueChange: (a: A) => void;
}) {
  return (
    <div className="btn-group">
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => valueChange(opt)}
          type="button"
          className={'btn btn-outline-secondary ' + (value === opt ? 'active' : '')}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};
