import * as React from 'react';
import { Ordinary, Pale } from '../../../model/ordinary';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../../model/tincture';
import { LineSelect } from '../LineSelect';
import { Line } from '../../../model/line';

type SupportedOrdinary = Exclude<Ordinary, Pale>;
type Props = { ordinary: SupportedOrdinary; ordinaryChange: (ordinary: SupportedOrdinary) => void };
export const StandardOrdinaryForm = ({ ordinary, ordinaryChange }: Props) => {
  function ordinaryTinctureChange(tincture: Tincture) {
    ordinaryChange({ ...ordinary, tincture });
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
        <label>Select the line style</label>
        <LineSelect line={ordinary.line} lineChange={lineChange} />
      </div>
    </>
  );
};
