import * as React from 'react';
import { useState } from 'react';
import { uuid } from '../../utils/uuid';
import { BlasonDisplay } from './BlasonDisplay';
import { azure, Blason, Tincture, tinctures } from '../model/blason';
import Select, { components } from 'react-select';
import { OptionProps } from 'react-select/src/components/Option';

const Option = (props: OptionProps<Tincture>) => {
  console.log(props);
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

export const FromBlason = () => {
  const id = uuid();

  const [blason, setBlason] = useState<Blason>({
    field: azure,
  });

  function fieldChange(field: Tincture | null) {
    if (field) {
      setBlason({ ...blason, field });
    } else {
      console.warn('A field is mandatory');
    }
  }

  return (
    <div className="row">
      <div className="col-md-12 col-lg-6">
        <div className="form-group">
          <label htmlFor={id}>Select your field</label>
          <Select
            options={tinctures}
            components={{ Option }}
            getOptionLabel={(t) => t.name}
            getOptionValue={(t) => t.name}
            value={blason.field}
            onChange={(t: any) => fieldChange(t)}
          />
        </div>
      </div>
      <div className="col-md-12 col-lg-6">
        <BlasonDisplay blason={blason} />
      </div>
    </div>
  );
};
