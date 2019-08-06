import * as React from 'react';
import { Roundel } from '../../../model/charge';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../../model/tincture';
import { SelectScalar } from '../../../common/SelectScalar';
import { SupportedNumber, supportedNumbers } from '../../../model/countAndDisposition';

const voidedOptions = ['true', 'false'] as const;

type Props = { charge: Roundel; chargeChange: (roundel: Roundel) => void };
export const RoundelForm = ({ charge, chargeChange }: Props) => {
  function chargeTinctureChange(tincture: Tincture) {
    chargeChange({ ...charge, tincture });
  }

  function countChange(count: SupportedNumber) {
    chargeChange({ ...charge, count });
  }

  function voidedChange(voided: 'true' | 'false') {
    chargeChange({ ...charge, voided: voided === 'true' });
  }

  const voided: 'true' | 'false' = charge.voided ? 'true' : 'false';

  return (
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label>Select the tincture of the charge</label>
          <TinctureSelect tincture={charge.tincture} tinctureChange={chargeTinctureChange} />
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label>Select the number of charge</label>
          <SelectScalar options={supportedNumbers} value={charge.count} valueChange={countChange} />
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label>isVoided</label>
          <SelectScalar options={voidedOptions} value={voided} valueChange={voidedChange} />
        </div>
      </div>
    </div>
  );
};
