import * as React from 'react';
import { Lozenge, LozengeInside, lozengeInsides } from '../../../model/charge';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../../model/tincture';
import { SelectScalar } from '../../../common/SelectScalar';
import { SupportedNumber, supportedNumbers } from '../../../model/countAndDisposition';

type Props = { charge: Lozenge; chargeChange: (lozenge: Lozenge) => void };
export const LozengeForm = ({ charge, chargeChange }: Props) => {
  function chargeTinctureChange(tincture: Tincture) {
    chargeChange({ ...charge, tincture });
  }

  function countChange(count: SupportedNumber) {
    chargeChange({ ...charge, count });
  }
  function voidedChange(inside: LozengeInside) {
    chargeChange({ ...charge, inside });
  }

  return (
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label>Select the tincture of the charge</label>
          <TinctureSelect tincture={charge.tincture} tinctureChange={chargeTinctureChange} />
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label>Select the number of charge</label>
          <SelectScalar options={supportedNumbers} value={charge.count} valueChange={countChange} />
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label>isVoided</label>
          <SelectScalar options={lozengeInsides} value={charge.inside} valueChange={voidedChange} />
        </div>
      </div>
    </div>
  );
};
