import * as React from 'react';
import { useState } from 'react';
import { uuid } from '../../utils/uuid';
import { BlasonDisplay } from './BlasonDisplay';
import { Blason, Tincture, vair } from '../model/blason';
import { TinctureSelect } from './TinctureSelect';

export const FromBlason = () => {
  const id = uuid();

  const [blason, setBlason] = useState<Blason>({
    field: vair,
  });

  function fieldChange(field: Tincture) {
    setBlason({ ...blason, field });
  }

  return (
    <div className="row">
      <div className="col-md-12 col-lg-6">
        <div className="form-group">
          <label htmlFor={id}>Select your field</label>
          <TinctureSelect tincture={blason.field} tinctureChange={fieldChange} />
        </div>
      </div>
      <div className="col-md-12 col-lg-6">
        <BlasonDisplay blason={blason} />
      </div>
    </div>
  );
};
