import * as React from 'react';
import { Cross, crossLimbs, CrossLimbs } from './cross';
import { TinctureSelect } from '~/app/from-blason/form/TinctureSelect';
import { Tincture } from '~/app/model/tincture';
import { SelectScalar } from '~/app/common/SelectScalar';
import { CountAndDisposition } from '~/app/model/countAndDisposition';
import { CountAndDispositionForm } from '~/app/from-blason/form/CountAndDispositionForm';
import { ChargeFormParameters } from '~/app/from-blason/form/ChargeForm';

export const Form = ({ charge, chargeChange }: ChargeFormParameters<Cross>) => {
  function chargeTinctureChange(tincture: Tincture) {
    charge.tincture = tincture;
    chargeChange(charge);
  }
  function countAndDispositionChange(countAndDisposition: CountAndDisposition) {
    charge.countAndDisposition = countAndDisposition;
    chargeChange(charge);
  }
  function limbsChange(limbs: CrossLimbs) {
    charge.limbs = limbs;
    chargeChange(charge);
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>Tincture of the charge</label>
            <TinctureSelect tincture={charge.tincture} tinctureChange={chargeTinctureChange} />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label>limbs</label>
            <SelectScalar options={crossLimbs} value={charge.limbs} valueChange={limbsChange} />
          </div>
        </div>
      </div>
      <CountAndDispositionForm
        countAndDisposition={charge.countAndDisposition}
        countAndDispositionChange={countAndDispositionChange}
      />
    </>
  );
};
