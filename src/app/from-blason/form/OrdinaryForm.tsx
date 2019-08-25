import { OrdinaryNameSelect } from './OrdinaryNameSelect';
import * as React from 'react';
import { Ordinary } from '../../model/ordinary';
import { argent } from '../../model/tincture';
import { OrdinaryDispatcherForm } from './ordinaries/OrdinaryDispatcherForm';
import { TinctureConfiguration } from '../../model/tincture-configuration';

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  ordinary: Ordinary | null;
  ordinaryChange: (ordinary: Ordinary | null) => void;
};
export const OrdinaryForm = ({ tinctureConfiguration, ordinary, ordinaryChange }: Props) => {
  function changeOrdinary(ordinaryName: Ordinary['name'] | null) {
    if (ordinaryName) {
      const tincture = ordinary ? ordinary.tincture : argent;
      if (ordinaryName === 'pale' || ordinaryName === 'chevron' || ordinaryName === 'chevronel') {
        ordinaryChange({ name: ordinaryName, tincture, count: 1, line: 'straight' });
      } else {
        ordinaryChange({ name: ordinaryName, tincture, line: 'straight' });
      }
    } else {
      ordinaryChange(null);
    }
  }

  return (
    <div className="row">
      <div className="col">
        <div className="form-group ordinary-type-select">
          <label>Select your ordinary</label>
          <OrdinaryNameSelect ordinary={ordinary ? ordinary.name : null} ordinaryChange={changeOrdinary} />
        </div>
      </div>
      <div className="col">
        {ordinary && (
          <OrdinaryDispatcherForm
            tinctureConfiguration={tinctureConfiguration}
            ordinary={ordinary}
            ordinaryChange={ordinaryChange}
          />
        )}
      </div>
    </div>
  );
};
