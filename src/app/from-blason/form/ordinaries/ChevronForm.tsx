import * as React from 'react';
import { Chevron, Chevronel } from '../../../model/ordinary';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../../model/tincture';
import { SelectScalar } from '../../../common/SelectScalar';
import { LineSelect } from '../LineSelect';
import { Line } from '../../../model/line';
import { TinctureConfiguration } from '../../../model/tincture-configuration';

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  ordinary: Chevron | Chevronel;
  ordinaryChange: (chevron: Chevron | Chevronel) => void;
};
const countOptions = [1, 2, 3] as const;
export const ChevronForm = ({ tinctureConfiguration, ordinary, ordinaryChange }: Props) => {
  function ordinaryTinctureChange(tincture: Tincture) {
    ordinaryChange({ ...ordinary, tincture });
  }

  function countChange(count: 1 | 2 | 3) {
    ordinaryChange({ ...ordinary, count });
  }

  function lineChange(line: Line) {
    ordinaryChange({ ...ordinary, line });
  }

  return (
    <>
      <div className="form-group">
        <label>Tincture</label>
        <TinctureSelect
          tinctureConfiguration={tinctureConfiguration}
          tincture={ordinary.tincture}
          tinctureChange={ordinaryTinctureChange}
        />
      </div>
      <div className="form-group">
        <label>Number of chevron</label>
        <SelectScalar options={countOptions} value={ordinary.count} valueChange={countChange} />
      </div>

      <div className="form-group">
        <label>Line style</label>
        <LineSelect line={ordinary.line} lineChange={lineChange} />
      </div>
    </>
  );
};
