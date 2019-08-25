import * as React from 'react';
import { Lion, LionAttitude, lionAttitudes, LionHead, lionHeads } from '../../../model/charge';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../../model/tincture';
import { SelectScalar } from '../../../common/SelectScalar';
import { CountAndDisposition } from '../../../model/countAndDisposition';
import { CountAndDispositionForm } from '../CountAndDispositionForm';
import { TinctureConfiguration } from '../../../model/tincture-configuration';

type Props = { tinctureConfiguration: TinctureConfiguration; charge: Lion; chargeChange: (lion: Lion) => void };

const headPostures = ['None', ...lionHeads] as const;

export const LionForm = ({ tinctureConfiguration, charge, chargeChange }: Props) => {
  function chargeTinctureChange(tincture: Tincture) {
    chargeChange({ ...charge, tincture: tincture });
  }

  function armedLanguedTinctureChange(tincture: Tincture) {
    chargeChange({ ...charge, armedAndLangued: tincture });
  }

  const selectedHead = charge.head || 'None';

  function headPostureChange(head: LionHead | 'None') {
    chargeChange({
      ...charge,
      head: head === 'None' ? null : head,
    });
  }

  function attitudeChange(attitude: LionAttitude) {
    chargeChange({ ...charge, attitude });
  }

  function countAndDispositionChange(countAndDisposition: CountAndDisposition) {
    chargeChange({ ...charge, countAndDisposition });
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="form-group charge-lion-tincture-select">
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
            <label>Select the tincture of the claws and tongue</label>
            <TinctureSelect
              tinctureConfiguration={tinctureConfiguration}
              tincture={charge.armedAndLangued}
              tinctureChange={armedLanguedTinctureChange}
            />
          </div>
        </div>
      </div>
      <CountAndDispositionForm
        countAndDisposition={charge.countAndDisposition}
        countAndDispositionChange={countAndDispositionChange}
      />
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>Select the attitude</label>
            <SelectScalar options={lionAttitudes} value={charge.attitude} valueChange={attitudeChange} />
          </div>
        </div>
      </div>
      <div className="row">
        {charge.attitude !== 'dormant' && (
          <div className="col">
            <div className="form-group">
              <label>Select the head posture</label>
              <SelectScalar options={headPostures} value={selectedHead} valueChange={headPostureChange} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
