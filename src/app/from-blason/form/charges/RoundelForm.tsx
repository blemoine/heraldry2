import * as React from 'react';
import { Roundel, RoundelInside, roundelInsides } from '../../../model/charge';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../../model/tincture';
import { SelectScalar } from '../../../common/SelectScalar';
import { CountAndDisposition } from '../../../model/countAndDisposition';
import { CountAndDispositionForm } from '../CountAndDispositionForm';
import { TinctureConfiguration } from '../../../model/tincture-configuration';

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  charge: Roundel;
  chargeChange: (roundel: Roundel) => void;
};
export const RoundelForm = ({ tinctureConfiguration, charge, chargeChange }: Props) => {
  function chargeTinctureChange(tincture: Tincture) {
    chargeChange({ ...charge, tincture });
  }

  function countAndDispositionChange(countAndDisposition: CountAndDisposition) {
    chargeChange({ ...charge, countAndDisposition });
  }

  function voidedChange(inside: RoundelInside) {
    chargeChange({ ...charge, inside });
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
            <label>isVoided</label>
            <SelectScalar options={roundelInsides} value={charge.inside} valueChange={voidedChange} />
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
