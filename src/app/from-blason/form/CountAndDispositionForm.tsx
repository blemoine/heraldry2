import {
  availableDispositions,
  CountAndDisposition,
  Disposition,
  SupportedNumber,
  supportedNumbers,
} from '../../model/countAndDisposition';
import { SelectScalar } from '../../common/SelectScalar';
import * as React from 'react';

type Props = {
  countAndDisposition: CountAndDisposition;
  countAndDispositionChange: (countAndDisposition: CountAndDisposition) => void;
};
export const CountAndDispositionForm = ({ countAndDisposition, countAndDispositionChange }: Props) => {
  function countChange(count: SupportedNumber) {
    count = parseInt(count);
    countAndDispositionChange({ count, disposition: count === 1 ? 'default' : countAndDisposition.disposition });
  }

  function dispositionChange(disposition: Disposition) {
    countAndDispositionChange({ ...countAndDisposition, disposition });
  }

  return (
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label>Number</label>
          <SelectScalar options={supportedNumbers} value={countAndDisposition.count} valueChange={countChange} />
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label>Disposition</label>
          <SelectScalar
            options={countAndDisposition.count === 1 ? ['default'] : availableDispositions}
            value={countAndDisposition.disposition}
            valueChange={dispositionChange}
          />
        </div>
      </div>
    </div>
  );
};
