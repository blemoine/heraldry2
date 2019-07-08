import * as React from 'react';
import { useState } from 'react';
import { uuid } from '../../utils/uuid';
import { BlasonDisplay } from './BlasonDisplay';
import { azure, Blason, tinctures } from '../model/blason';

export const FromBlason = () => {
  const id = uuid();

  const [blason, setBlason] = useState<Blason>({
    field: azure,
  });

  function fieldChange(fieldName: string) {
    const field = tinctures.find((field) => field.name === fieldName);
    if (!field) {
      throw new Error(`The field ${fieldName} doesn't exist`);
    }
    setBlason({ ...blason, field });
  }

  return (
    <div className="row">
      <div className="col-md-12 col-lg-6">
        <div className="form-group">
          <label htmlFor={id}>Select your field</label>
          <select
            id={id}
            className="form-control"
            value={blason.field.name}
            onChange={(e) => fieldChange(e.target.value)}
          ></select>
        </div>
      </div>
      <div className="col-md-12 col-lg-6">
        <BlasonDisplay blason={blason} />
      </div>
    </div>
  );
};
