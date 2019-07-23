import * as React from 'react';
import { Eagle, EagleAttitude, eagleAttitudes } from '../../model/charge';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../model/tincture';
import { SelectScalar } from '../../common/SelectScalar';

type Props = { charge: Eagle; chargeChange: (eagle: Eagle) => void };

export const EagleForm = ({ charge, chargeChange }: Props) => {
  function chargeTinctureChange(tincture: Tincture) {
    chargeChange({
      ...charge,
      tincture: tincture,
    });
  }

  function beakedArmedTinctureChange(tincture: Tincture) {
    chargeChange({
      ...charge,
      beakedAndArmed: tincture,
    });
  }

  function attitudeChange(attitude: EagleAttitude) {
    chargeChange({
      ...charge,
      attitude,
    });
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>Select the tincture of the charge</label>
            <TinctureSelect tincture={charge.tincture} tinctureChange={chargeTinctureChange} />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label>Select the tincture of the beak and talons</label>
            <TinctureSelect tincture={charge.beakedAndArmed} tinctureChange={beakedArmedTinctureChange} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>Select the attitude</label>
            <SelectScalar options={eagleAttitudes} value={charge.attitude} valueChange={attitudeChange} />
          </div>
        </div>
      </div>
    </>
  );
};
