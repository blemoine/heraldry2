import * as React from 'react';
import { Fess, Pale } from '../../../model/ordinary';
import { MetalAndColoursSelect, TinctureSelect } from '../TinctureSelect';
import { MetalsAndColours, Tincture } from '../../../model/tincture';
import { LineSelect } from '../LineSelect';
import { Line } from '../../../model/line';
import { ButtonGroup } from '../../../common/ButtonGroup';

type Props = { ordinary: Pale | Fess; ordinaryChange: (ordinary: Pale | Fess) => void };
const countOptions = [1, 2] as const;
export const PaleForm = ({ ordinary, ordinaryChange }: Props) => {
  function ordinaryTinctureChange(tincture: Tincture) {
    ordinaryChange({ ...ordinary, tincture });
  }
  function ordinaryFimbriatedChange(fimbriated: MetalsAndColours | null) {
    ordinaryChange({ ...ordinary, fimbriated });
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
        <label>Tincture</label>
        <TinctureSelect tincture={ordinary.tincture} tinctureChange={ordinaryTinctureChange} />
      </div>
      <div className="form-group">
        <label>Number of pale</label>
        <div>
          <ButtonGroup options={countOptions} value={ordinary.count} valueChange={countChange} />
        </div>
      </div>

      <div className="form-group">
        <label>Line style</label>
        <LineSelect line={ordinary.line} lineChange={lineChange} />
      </div>

      <div className="form-group">
        <label>Fimbriated</label>
        <MetalAndColoursSelect tincture={ordinary.fimbriated} tinctureChange={ordinaryFimbriatedChange} />
      </div>
    </>
  );
};
