import { Field } from '../model/blason';
import { TinctureSelect } from './TinctureSelect';
import * as React from 'react';
import { argent, Tincture } from '../model/tincture';
import { uuid } from '../../utils/uuid';
import { PartyForm } from './PartyForm';

type Props = { field: Field; fieldChange: (field: Field) => void };
export const FieldForm = ({ field, fieldChange }: Props) => {
  function plainTinctureChange(tincture: Tincture) {
    fieldChange({ kind: 'plain', tincture });
  }

  function plainChange(isPlain: boolean) {
    if (isPlain && field.kind !== 'plain') {
      fieldChange({ kind: 'plain', tincture: field.per.tinctures[0] });
    } else if (!isPlain && field.kind === 'plain') {
      fieldChange({ kind: 'party', per: { name: 'fess', tinctures: [field.tincture, argent] } });
    } else {
      throw new Error(`Changing plain to ${isPlain} is impossible for field kind ${field.kind}`);
    }
  }

  const plainCheckId = uuid();

  return (
    <>
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id={plainCheckId}
          checked={field.kind === 'plain'}
          onChange={(e) => plainChange(e.target.checked)}
        />
        <label className="form-check-label" htmlFor={plainCheckId}>
          Plain?
        </label>
      </div>

      {field.kind === 'plain' ? (
        <div className="form-group">
          <label>Select your field</label>
          <TinctureSelect tincture={field.tincture} tinctureChange={plainTinctureChange} />
        </div>
      ) : (
        <PartyForm field={field} fieldChange={fieldChange} />
      )}
    </>
  );
};
