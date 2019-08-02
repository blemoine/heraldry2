import * as React from 'react';
import { FleurDeLys } from '../../../model/charge';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../../model/tincture';
import { SelectScalar } from '../../../common/SelectScalar';

type Props = { charge: FleurDeLys; chargeChange: (fleurDeLys: FleurDeLys) => void };
const countOptions = [1, 2, 3] as const;
export const FleurDeLysForm = ({ charge, chargeChange }: Props) => {
  function chargeTinctureChange(tincture: Tincture) {
    chargeChange({ ...charge, tincture });
  }

  function countChange(count: 1 | 2 | 3) {
    chargeChange({ ...charge, count });
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
          <SelectScalar options={countOptions} value={charge.count} valueChange={countChange} />
        </div>
      </div>
    </div>
  );
};
