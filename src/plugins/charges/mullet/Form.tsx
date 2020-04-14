import * as React from 'react';
import { Mullet, MulletInside, mulletInsides, mulletPoints, MulletPoints } from './mullet';
import { TinctureSelect } from '~/app/from-blason/form/TinctureSelect';
import { Tincture } from '~/app/model/tincture';
import { CountAndDisposition } from '~/app/model/countAndDisposition';
import { CountAndDispositionForm } from '~/app/from-blason/form/CountAndDispositionForm';
import { SelectScalar } from '~/app/common/SelectScalar';
import { ButtonGroup } from '~/app/common/ButtonGroup';
import { ChargeFormParameters } from '~/app/from-blason/form/ChargeForm';

export const Form = ({ charge, chargeChange }: ChargeFormParameters<Mullet>) => {
  function chargeTinctureChange(tincture: Tincture) {
    charge.tincture = tincture;
    chargeChange(charge);
  }
  function countAndDispositionChange(countAndDisposition: CountAndDisposition) {
    charge.countAndDisposition = countAndDisposition;
    chargeChange(charge);
  }
  function insideChange(inside: MulletInside) {
    charge.inside = inside;
    chargeChange(charge);
  }
  function pointsChange(points: MulletPoints) {
    charge.points = points;
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
            <label>Points</label>
            <div>
              <ButtonGroup options={mulletPoints} value={charge.points} valueChange={pointsChange} />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label>Inside</label>
            <SelectScalar options={mulletInsides} value={charge.inside} valueChange={insideChange} />
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
