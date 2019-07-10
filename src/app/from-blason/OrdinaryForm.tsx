import { OrdinaryNameSelect } from './OrdinaryNameSelect';
import { TinctureSelect } from './TinctureSelect';
import * as React from 'react';
import { Ordinary } from '../model/ordinary';
import { argent, Tincture } from '../model/tincture';

type Props = { ordinary: Ordinary | null; ordinaryChange: (ordinary: Ordinary | null) => void };
export const OrdinaryForm = ({ ordinary, ordinaryChange }: Props) => {
  function changeOrdinary(ordinaryName: Ordinary['name'] | null) {
    if (ordinaryName) {
      const tincture = ordinary ? ordinary.tincture : argent;
      ordinaryChange({ name: ordinaryName, tincture });
    } else {
      ordinaryChange(null);
    }
  }

  function ordinaryTinctureChange(ordinaryTincture: Tincture) {
    if (ordinary) {
      ordinaryChange({
        ...ordinary,
        tincture: ordinaryTincture,
      });
    } else {
      throw new Error('This function should not be called if there is no ordinary');
    }
  }

  return (
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label>Select your ordinary</label>
          <OrdinaryNameSelect ordinary={ordinary ? ordinary.name : null} ordinaryChange={changeOrdinary} />
        </div>
      </div>
      <div className="col">
        {ordinary && (
          <div className="form-group">
            <label>Select the tincture of the ordinary</label>
            <TinctureSelect tincture={ordinary.tincture} tinctureChange={ordinaryTinctureChange} />
          </div>
        )}
      </div>
    </div>
  );
};
