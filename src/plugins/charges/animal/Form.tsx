import * as React from 'react';
import { Animal, AnimalAttitude } from './animal';
import { TinctureSelect } from '~/app/from-blason/form/TinctureSelect';
import { Tincture } from '~/app/model/tincture';
import { SelectScalar } from '~/app/common/SelectScalar';
import { CountAndDisposition } from '~/app/model/countAndDisposition';
import { CountAndDispositionForm } from '~/app/from-blason/form/CountAndDispositionForm';
import { ChargeFormParameters } from '~/app/from-blason/form/ChargeForm';

export const Form = ({ charge, chargeChange }: ChargeFormParameters<Animal>) => {
  const chargeClass = Object.getPrototypeOf(charge).constructor;

  function chargeTinctureChange(tincture: Tincture) {
    charge.tincture = tincture;
    chargeChange(charge);
  }

  function secondaryTinctureChange(tincture: Tincture) {
    charge.secondaryTincture = tincture;
    chargeChange(charge);
  }

  function attitudeChange(attitude: AnimalAttitude) {
    charge.attitude = attitude;
    chargeChange(charge);
  }

  function countAndDispositionChange(countAndDisposition: CountAndDisposition) {
    charge.countAndDisposition = countAndDisposition;
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
            <label>{chargeClass.secondaryTinctureLabel}</label>
            <TinctureSelect tincture={charge.secondaryTincture} tinctureChange={secondaryTinctureChange} />
          </div>
        </div>
      </div>
      <CountAndDispositionForm
        countAndDisposition={charge.countAndDisposition}
        countAndDispositionChange={countAndDispositionChange}
      />
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>Attitude</label>
            <SelectScalar options={chargeClass.attitudes} value={charge.attitude} valueChange={attitudeChange} />
          </div>
        </div>
      </div>
    </>
  );
};
