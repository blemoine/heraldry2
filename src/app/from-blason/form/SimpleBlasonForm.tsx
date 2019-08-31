import { FieldForm } from './FieldForm';
import { OrdinaryForm } from './OrdinaryForm';
import { ChargeForm } from './ChargeForm';
import * as React from 'react';
import { SimpleBlason } from '../../model/blason';
import { Field } from '../../model/field';
import { Ordinary } from '../../model/ordinary';
import { Charge } from '../../model/charge';
import { TinctureConfiguration } from '../../model/tincture-configuration';

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  blason: SimpleBlason;
  blasonChange: (blason: SimpleBlason) => void;
};
export const SimpleBlasonForm = ({ tinctureConfiguration, blason, blasonChange }: Props) => {
  function fieldChange(field: Field) {
    blasonChange({ ...blason, field });
  }

  function ordinaryChange(ordinary: Ordinary | null) {
    if (ordinary) {
      blasonChange({ ...blason, ordinary });
    } else {
      const newBlason = { ...blason };
      delete newBlason.ordinary;
      blasonChange(newBlason);
    }
  }

  function chargeChange(charge: Charge | null) {
    if (charge) {
      blasonChange({ ...blason, charge });
    } else {
      const newBlason = { ...blason };
      delete newBlason.charge;
      blasonChange(newBlason);
    }
  }
  return (
    <div style={{border: '1px solid #CCC', padding: '5px'}}>
      <FieldForm tinctureConfiguration={tinctureConfiguration} field={blason.field} fieldChange={fieldChange} />
      <OrdinaryForm
        tinctureConfiguration={tinctureConfiguration}
        ordinary={blason.ordinary || null}
        ordinaryChange={ordinaryChange}
      />
      <ChargeForm
        tinctureConfiguration={tinctureConfiguration}
        charge={blason.charge || null}
        chargeChange={chargeChange}
      />
    </div>
  );
};
