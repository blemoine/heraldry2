import * as React from 'react';
import { Eagle, EagleAttitude, eagleAttitudes } from '../../../model/charge';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../../model/tincture';
import { SelectScalar } from '../../../common/SelectScalar';
import { SupportedNumber, supportedNumbers } from '../../../model/countAndDisposition';

type Props = { charge: Eagle; chargeChange: (eagle: Eagle) => void };

export const EagleForm = ({ charge, chargeChange }: Props) => {
  function chargeTinctureChange(tincture: Tincture) {
    chargeChange({ ...charge, tincture });
  }

  function beakedArmedTinctureChange(beakedAndArmed: Tincture) {
    chargeChange({ ...charge, beakedAndArmed });
  }

  function attitudeChange(attitude: EagleAttitude) {
    chargeChange({ ...charge, attitude });
  }

  function countChange(count: SupportedNumber) {
    chargeChange({ ...charge, countAndDisposition: { count, disposition: 'default' } });
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
      <div className="col">
        <div className="form-group">
          <label>Select the number of eagles</label>
          <SelectScalar options={supportedNumbers} value={charge.countAndDisposition.count} valueChange={countChange} />
        </div>
      </div>
    </>
  );
};
