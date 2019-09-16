import * as React from 'react';
import { Mullet, MulletInside, mulletInsides, mulletPoints, MulletPoints } from '../../../model/charge';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../../model/tincture';
import { SelectScalar } from '../../../common/SelectScalar';
import { CountAndDisposition } from '../../../model/countAndDisposition';
import { CountAndDispositionForm } from '../CountAndDispositionForm';
import { TinctureConfiguration } from '../../../model/tincture-configuration';

type Props = { tinctureConfiguration: TinctureConfiguration; charge: Mullet; chargeChange: (mullet: Mullet) => void };
export const MulletForm = ({ tinctureConfiguration, charge, chargeChange }: Props) => {
  function chargeTinctureChange(tincture: Tincture) {
    chargeChange({ ...charge, tincture });
  }

  function countAndDispositionChange(countAndDisposition: CountAndDisposition) {
    chargeChange({ ...charge, countAndDisposition });
  }
  function insideChange(inside: MulletInside) {
    chargeChange({ ...charge, inside });
  }
  function pointsChange(points: MulletPoints) {
    chargeChange({ ...charge, points });
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>Select the tincture of the charge</label>
            <TinctureSelect
              tinctureConfiguration={tinctureConfiguration}
              tincture={charge.tincture}
              tinctureChange={chargeTinctureChange}
            />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label>points</label>
            <SelectScalar options={mulletPoints} value={charge.points} valueChange={pointsChange} />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label>inside</label>
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
