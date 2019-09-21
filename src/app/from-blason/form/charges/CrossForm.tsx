import * as React from 'react';
import { Cross, crossLimbs, CrossLimbs } from '../../../model/charge';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../../model/tincture';
import { SelectScalar } from '../../../common/SelectScalar';
import { CountAndDisposition } from '../../../model/countAndDisposition';
import { CountAndDispositionForm } from '../CountAndDispositionForm';
import { TinctureConfiguration } from '../../../model/tincture-configuration';

type Props = { tinctureConfiguration: TinctureConfiguration; charge: Cross; chargeChange: (cross: Cross) => void };
export const CrossForm = ({ tinctureConfiguration, charge, chargeChange }: Props) => {
  function chargeTinctureChange(tincture: Tincture) {
    chargeChange({ ...charge, tincture });
  }

  function countAndDispositionChange(countAndDisposition: CountAndDisposition) {
    chargeChange({ ...charge, countAndDisposition });
  }
  function limbsChange(limbs: CrossLimbs) {
    chargeChange({ ...charge, limbs });
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>Tincture of the charge</label>
            <TinctureSelect
              tinctureConfiguration={tinctureConfiguration}
              tincture={charge.tincture}
              tinctureChange={chargeTinctureChange}
            />
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
