import * as React from 'react';
import { useState } from 'react';
import { uuid } from '../../utils/uuid';
import { BlasonDisplay } from './BlasonDisplay';

export const FromBlason = () => {
  const id = uuid();

  const [blason, setBlason] = useState('');

  return (
    <div className="row">
      <div className="col-md-12 col-lg-6">
        <div className="form-group">
          <label htmlFor={id}>Type your blason</label>
          <textarea
            className="form-control"
            id={id}
            value={blason}
            onChange={(e) => setBlason(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="col-md-12 col-lg-6">
        <BlasonDisplay blason={blason} />
      </div>
    </div>
  );
};
