import * as React from 'react';
import { BasicCharge } from './basic';
import { TinctureSelect } from '~/app/from-blason/form/TinctureSelect';
import { Tincture } from '~/app/model/tincture';
import { CountAndDisposition } from '~/app/model/countAndDisposition';
import { CountAndDispositionForm } from '~/app/from-blason/form/CountAndDispositionForm';
import { ChargeFormParameters } from '~/app/from-blason/form/ChargeForm';

export const Form = ({ charge, chargeChange }: ChargeFormParameters<BasicCharge>) => {
  function chargeTinctureChange(tincture: Tincture) {
    charge.tincture = tincture;
    chargeChange(charge);
  }

  function countAndDispositionChange(countAndDisposition: CountAndDisposition) {
    charge.countAndDisposition = countAndDisposition;
    chargeChange(charge);
  }

  return (
    <>
      <div className="col">
        <div className="form-group">
          <label>Tincture of the charge</label>
          <TinctureSelect tincture={charge.tincture} tinctureChange={chargeTinctureChange} />
        </div>
      </div>
      <CountAndDispositionForm
        countAndDisposition={charge.countAndDisposition}
        countAndDispositionChange={countAndDispositionChange}
      />
    </>
  );
};
