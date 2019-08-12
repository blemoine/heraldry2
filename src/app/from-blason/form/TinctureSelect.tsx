import Select, { components } from 'react-select';
import * as React from 'react';
import { OptionProps } from 'react-select/src/components/Option';
import { Tincture, tinctures } from '../../model/tincture';
import { ErmineDisplay } from '../coats-of-arms-parts/ErmineDisplay';
import { VairDisplay } from '../coats-of-arms-parts/VairDisplay';

type Props = { tincture: Tincture; tinctureChange: (t: Tincture) => void };

const Option = (props: OptionProps<Tincture>) => {
  return (
    <components.Option {...props}>
      <span
        className="tincture-option"
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
          border: '1px solid #777',
          backgroundColor: props.data.color || 'white',
          width: '15px',
          height: '15px',
          lineHeight: '15px',
          overflow: 'hidden',
          boxSizing: 'content-box',
          textAlign: 'center',
          padding: '1px',
        }}
      >
        { (props.data.name === 'ermine' || props.data.name === 'counter-ermine' || props.data.name === 'erminois') ? (
          <svg width={12.5} height={15} viewBox={`0 0 200 240`}>
            <ErmineDisplay width={200} height={240} fill={props.data.field.color} spot={props.data.spot.color}/>
          </svg>
        ) : props.data.name === 'vair' ? (
          <svg width={15} height={15} viewBox={`0 0 200 200`}>
            <VairDisplay width={200} height={200} />
          </svg>
        ) : (
          <>&nbsp;</>
        )}
      </span>
    </components.Option>
  );
};

export const TinctureSelect = ({ tincture, tinctureChange }: Props) => {
  return (
    <Select
      classNamePrefix="tincture-select"
      options={tinctures}
      components={{ Option }}
      getOptionLabel={(t) => t.name}
      getOptionValue={(t) => t.name}
      value={tincture}
      onChange={(t: any) => t && tinctureChange(t)}
    />
  );
};
