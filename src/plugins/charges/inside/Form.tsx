import * as React from 'react';
import { InsideCharge, InsideValue } from '~/plugins/charges/inside/inside';
import { TinctureSelect } from '~/app/from-blason/form/TinctureSelect';
import { Tincture } from '~/app/model/tincture';
import { CountAndDisposition } from '~/app/model/countAndDisposition';
import { CountAndDispositionForm } from '~/app/from-blason/form/CountAndDispositionForm';
import { SelectScalar } from '~/app/common/SelectScalar';
import { ChargeFormParameters } from '~/app/from-blason/form/ChargeForm';

export const Form = ({ charge, chargeChange }: ChargeFormParameters<InsideCharge>) => {
  const chargeClass = Object.getPrototypeOf(charge).constructor;

  function chargeTinctureChange(tincture: Tincture) {
    charge.tincture = tincture;
    chargeChange(charge);
  }
  function countAndDispositionChange(countAndDisposition: CountAndDisposition) {
    charge.countAndDisposition = countAndDisposition;
    chargeChange(charge);
  }
  function insideChange(inside: InsideValue) {
    charge.inside = inside;
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
            <label>Inside</label>
            <SelectScalar options={chargeClass.insideValues} value={charge.inside} valueChange={insideChange} />
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
