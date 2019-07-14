import * as React from 'react';
import { Lion, LionHead, lionHeads } from '../../model/charge';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../model/tincture';
import Select from 'react-select';
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

  let defaultHeadValue = { value: null, label: 'None' };
  const headPostures = [defaultHeadValue, ...lionHeads.map((head) => ({ value: head, label: head }))];
  const selectedHead = headPostures.find(({value}) => value === charge.head) || headPostures;

  function headPostureChange(head: LionHead | null) {
    chargeChange({
      ...charge,
      head,
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
      <div className="col">
        <div className="form-group">
          <label>Select the head posture</label>
          <Select
            options={headPostures}
            value={selectedHead}
            onChange={(t: any) => headPostureChange(t.value === 'None' ? null : t.value)}
          />
        </div>
      </div>
    </div>
  );
};
