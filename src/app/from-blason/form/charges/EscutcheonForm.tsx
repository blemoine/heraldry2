import * as React from 'react';
import { Escutcheon } from '../../../model/charge';
import { TinctureSelect } from '../TinctureSelect';
import { Tincture } from '../../../model/tincture';
import { CountAndDisposition } from '../../../model/countAndDisposition';
import { CountAndDispositionForm } from '../CountAndDispositionForm';
import { TinctureConfiguration } from '../../../model/tincture-configuration';

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  charge: Escutcheon;
  chargeChange: (escutcheon: Escutcheon) => void;
};
export const EscutcheonForm = ({ tinctureConfiguration, charge, chargeChange }: Props) => {
  function chargeTinctureChange(tincture: Tincture) {
    chargeChange({ ...charge, tincture });
  }

  function countAndDispositionChange(countAndDisposition: CountAndDisposition) {
    chargeChange({ ...charge, countAndDisposition });
  }

  return (
    <>
      <div className="col">
        <div className="form-group">
          <label>Tincture of the charge</label>
          <TinctureSelect
            tinctureConfiguration={tinctureConfiguration}
            tincture={charge.tincture}
            tinctureChange={chargeTinctureChange}
          />
        </div>
      </div>
      <CountAndDispositionForm
        countAndDisposition={charge.countAndDisposition}
        countAndDispositionChange={countAndDispositionChange}
      />
    </>
  );
};
