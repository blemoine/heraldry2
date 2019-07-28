import * as React from 'react';
import { Base, Bordure, Chief, Fess, Ordinary, Pale } from '../../model/ordinary';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../model/tincture';
import { LineSelect } from '../LineSelect';
import { Line } from '../../model/line';

type SupportedOrdinary = Exclude<Ordinary, Pale>;
type Props = { ordinary: SupportedOrdinary; ordinaryChange: (ordinary: SupportedOrdinary) => void };
export const StandardOrdinaryForm = ({ ordinary, ordinaryChange }: Props) => {
  function ordinaryTinctureChange(tincture: Tincture) {
    ordinaryChange({ ...ordinary, tincture });
  }

  function lineChange(ordinary: Chief | Bordure | Fess | Base, line: Line) {
    ordinaryChange({ ...ordinary, line });
  }

  return (
    <>
      <div className="form-group">
        <label>Select the tincture of the ordinary</label>
        <TinctureSelect tincture={ordinary.tincture} tinctureChange={ordinaryTinctureChange} />
      </div>

      {'line' in ordinary && <LineSelect line={ordinary.line} lineChange={(line) => lineChange(ordinary, line)} />}
    </>
  );
};
