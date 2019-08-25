import Select, { components } from 'react-select';
import * as React from 'react';
import { OptionProps } from 'react-select/src/components/Option';
import { isErmine, isFur, isPotent, isVair, Tincture, tinctures } from '../../model/tincture';
import { ErmineDisplay } from '../coats-of-arms-parts/ErmineDisplay';
import { VairDisplay } from '../coats-of-arms-parts/VairDisplay';
import { PotentDisplay } from '../coats-of-arms-parts/PotentDisplay';
import { TinctureConfiguration } from '../../model/tincture-configuration';

const Option = (tinctureConfiguration: TinctureConfiguration) => (props: OptionProps<Tincture>) => {
  const tincture: Tincture = props.data; // cast is mandatory as data is any
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
          backgroundColor: isFur(tincture) ? 'white' : tinctureConfiguration[tincture.name],
          width: '15px',
          height: '15px',
          lineHeight: '15px',
          overflow: 'hidden',
          boxSizing: 'content-box',
          textAlign: 'center',
          padding: '1px',
        }}
      >
        {isErmine(tincture) ? (
          <svg width={12.5} height={15} viewBox={`0 0 200 240`}>
            <ErmineDisplay
              width={200}
              height={240}
              fill={tinctureConfiguration[tincture.field.name]}
              spot={tinctureConfiguration[tincture.spot.name]}
            />
          </svg>
        ) : isVair(tincture) ? (
          <svg width={15} height={15} viewBox={`0 0 200 200`}>
            <VairDisplay
              dimension={{ width: 200, height: 200 }}
              bell={tinctureConfiguration[tincture.bell.name]}
              fill={tinctureConfiguration[tincture.field.name]}
            />
          </svg>
        ) : isPotent(tincture) ? (
          <svg width={15} height={15} viewBox={`0 0 300 200`}>
            <PotentDisplay
              dimension={{ width: 300, height: 200 }}
              potent={tinctureConfiguration[tincture.bell.name]}
              fill={tinctureConfiguration[tincture.field.name]}
            />
          </svg>
        ) : (
          <>&nbsp;</>
        )}
      </span>
    </components.Option>
  );
};

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  tincture: Tincture;
  tinctureChange: (t: Tincture) => void;
};
export const TinctureSelect = ({ tinctureConfiguration, tincture, tinctureChange }: Props) => {
  return (
    <Select
      classNamePrefix="tincture-select"
      options={tinctures}
      components={{ Option: Option(tinctureConfiguration) }}
      getOptionLabel={(t) => t.name}
      getOptionValue={(t) => t.name}
      value={tincture}
      onChange={(t: any) => t && tinctureChange(t)}
    />
  );
};
