import * as React from 'react';
import { Pale } from '../../model/ordinary';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../model/tincture';
import { SelectScalar } from '../../common/SelectScalar';
import { LineSelect } from '../LineSelect';
import { Line } from '../../model/line';

type Props = { ordinary: Pale; ordinaryChange: (pale: Pale) => void };
const countOptions = [1, 2] as const;
export const PaleForm = ({ ordinary, ordinaryChange }: Props) => {
  function ordinaryTinctureChange(tincture: Tincture) {
    ordinaryChange({ ...ordinary, tincture });
  }

  function countChange(count: 1 | 2) {
    ordinaryChange({ ...ordinary, count });
  }

  function lineChange(line: Line) {
    ordinaryChange({ ...ordinary, line });
  }

  return (
    <>
      <div className="form-group">
        <label>Select the tincture of the ordinary</label>
        <TinctureSelect tincture={ordinary.tincture} tinctureChange={ordinaryTinctureChange} />
      </div>
      <div className="form-group">
        <label>Select the number of pale</label>
        <SelectScalar options={countOptions} value={ordinary.count} valueChange={countChange} />
      </div>

      <div className="form-group">
        <label>Select the line style</label>
        <LineSelect line={ordinary.line} lineChange={lineChange} />
      </div>
    </>
  );
};
