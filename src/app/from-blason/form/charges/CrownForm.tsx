import * as React from 'react';
import { Crown, CrownType, crownTypes } from '../../../model/charge';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../../model/tincture';
import { SelectScalar } from '../../../common/SelectScalar';
import { CountAndDisposition } from '../../../model/countAndDisposition';
import { CountAndDispositionForm } from '../CountAndDispositionForm';

type Props = { charge: Crown; chargeChange: (crown: Crown) => void };

export const CrownForm = ({ charge, chargeChange }: Props) => {
  function chargeTinctureChange(tincture: Tincture) {
    chargeChange({ ...charge, tincture });
  }

  function typeChange(type: CrownType) {
    chargeChange({ ...charge, type });
  }

  function countAndDispositionChange(countAndDisposition: CountAndDisposition) {
    chargeChange({ ...charge, countAndDisposition });
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
            <label>Type</label>
            <SelectScalar options={crownTypes} value={charge.type} valueChange={typeChange} />
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
