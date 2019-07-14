import * as React from 'react';
import { Lion } from '../../model/charge';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../model/tincture';
type Props = { charge: Lion; chargeChange: (lion: Lion) => void };

export const LionForm = ({ charge, chargeChange }: Props) => {
  function chargeTinctureChange(tincture: Tincture) {
    chargeChange({
      ...charge,
      tincture: tincture,
    });
  }

  function armedLanguedTinctureChange(tincture: Tincture) {
    chargeChange({
      ...charge,
      armedAndLangued: tincture,
    });
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
          <label>Select the tincture of the claws and tongue</label>
          <TinctureSelect tincture={charge.armedAndLangued} tinctureChange={armedLanguedTinctureChange} />
        </div>
      </div>
    </div>
  );
};
