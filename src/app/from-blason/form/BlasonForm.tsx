import { FieldForm } from './FieldForm';
import { OrdinaryForm } from './OrdinaryForm';
import { ChargeForm } from './ChargeForm';
import * as React from 'react';
import { Blason } from '../../model/blason';
import { Field } from '../../model/field';
import { Ordinary } from '../../model/ordinary';
import { Charge } from '../../model/charge';

type Props = { blason: Blason; blasonChange: (blason: Blason) => void };
export const BlasonForm = ({ blason, blasonChange }: Props) => {
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
    <>
      <FieldForm field={blason.field} fieldChange={fieldChange} />
      <OrdinaryForm ordinary={blason.ordinary || null} ordinaryChange={ordinaryChange} />
      <ChargeForm charge={blason.charge || null} chargeChange={chargeChange} />
    </>
  );
};
