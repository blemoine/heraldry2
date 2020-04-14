import * as React from 'react';
import { Lion, LionAttitude, lionAttitudes, LionHead, lionHeads } from './lion';
import { TinctureSelect } from '~/app/from-blason/form/TinctureSelect';
import { Tincture } from '~/app/model/tincture';
import { SelectScalar } from '~/app/common/SelectScalar';
import { CountAndDisposition } from '~/app/model/countAndDisposition';
import { CountAndDispositionForm } from '~/app/from-blason/form/CountAndDispositionForm';
import { ChargeFormParameters } from '~/app/from-blason/form/ChargeForm';

export const Form = ({ charge, chargeChange }: ChargeFormParameters<Lion>) => {
  const headPostures = ['None', ...lionHeads] as const;

  function chargeTinctureChange(tincture: Tincture) {
    charge.tincture = tincture;
    chargeChange(charge);
  }

  function secondaryTinctureChange(tincture: Tincture) {
    charge.secondaryTincture = tincture;
    chargeChange(charge);
  }

  const selectedHead = charge.head || 'None';

  function headPostureChange(head: LionHead | 'None') {
    charge.head = head === 'None' ? null : head;
    chargeChange(charge);
  }

  function attitudeChange(attitude: LionAttitude) {
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
          <div className="form-group charge-lion-tincture-select">
            <label>Tincture of the charge</label>
            <TinctureSelect tincture={charge.tincture} tinctureChange={chargeTinctureChange} />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label>{Lion.secondaryTinctureLabel}</label>
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
            <SelectScalar options={lionAttitudes} value={charge.attitude} valueChange={attitudeChange} />
          </div>
        </div>
        {charge.attitude !== 'dormant' && (
          <div className="col">
            <div className="form-group">
              <label>Head posture</label>
              <SelectScalar options={headPostures} value={selectedHead} valueChange={headPostureChange} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
