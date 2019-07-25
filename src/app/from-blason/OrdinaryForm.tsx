import { OrdinaryNameSelect } from './OrdinaryNameSelect';
import * as React from 'react';
import { Ordinary } from '../model/ordinary';
import { argent } from '../model/tincture';
import { OrdinaryDispatcherForm } from './ordinaries/OrdinaryDispatcherForm';

type Props = { ordinary: Ordinary | null; ordinaryChange: (ordinary: Ordinary | null) => void };
export const OrdinaryForm = ({ ordinary, ordinaryChange }: Props) => {
  function changeOrdinary(ordinaryName: Ordinary['name'] | null) {
    if (ordinaryName) {
      const tincture = ordinary ? ordinary.tincture : argent;
      if (ordinaryName === 'pale') {
        ordinaryChange({ name: ordinaryName, tincture, count: 1 });
      } else {
        ordinaryChange({ name: ordinaryName, tincture });
      }
    } else {
      ordinaryChange(null);
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
        {ordinary && <OrdinaryDispatcherForm ordinary={ordinary} ordinaryChange={ordinaryChange} />}
      </div>
    </div>
  );
};
