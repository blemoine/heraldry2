import * as React from 'react';
import { Ordinary, Pale } from '../../model/ordinary';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../model/tincture';

type SupportedOrdinary = Exclude<Ordinary, Pale>;
type Props = { ordinary: SupportedOrdinary; ordinaryChange: (ordinary: SupportedOrdinary) => void };
export const StandardOrdinaryForm = ({ ordinary, ordinaryChange }: Props) => {
  function ordinaryTinctureChange(ordinaryTincture: Tincture) {
    ordinaryChange({
      ...ordinary,
      tincture: ordinaryTincture,
    });
  }

  return (
    <>
      <div className="form-group">
        <label>Select the tincture of the ordinary</label>
        <TinctureSelect tincture={ordinary.tincture} tinctureChange={ordinaryTinctureChange} />
      </div>
    </>
  );
};
