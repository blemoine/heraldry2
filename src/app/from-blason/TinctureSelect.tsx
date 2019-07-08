import Select, { components } from 'react-select';
import { Tincture, tinctures } from '../model/blason';
import * as React from 'react';
import { OptionProps } from 'react-select/src/components/Option';

type Props = { tincture: Tincture; tinctureChange: (t: Tincture) => void };

const Option = (props: OptionProps<Tincture>) => {
  return (
    <components.Option {...props}>
      <span
        style={{
          verticalAlign: 'middle',
        }}
      >
        {props.label}
      </span>
      <span
        style={{
          marginLeft: '5px',
          verticalAlign: 'middle',
          display: 'inline-block',
          border: '1px solid #333',
          backgroundColor: props.data.color,
          width: '15px',
          height: '15px',
        }}
      ></span>
    </components.Option>
  );
};

export const TinctureSelect = ({ tincture, tinctureChange }: Props) => {
  return (
    <Select
      options={tinctures}
      components={{ Option }}
      getOptionLabel={(t) => t.name}
      getOptionValue={(t) => t.name}
      value={tincture}
      onChange={(t: any) => t && tinctureChange(t)}
    />
  );
};
