import { Field } from '../model/blason';
import { TinctureSelect } from './TinctureSelect';
import * as React from 'react';
import { Tincture } from '../model/tincture';

type Props = { field: Field; fieldChange: (field: Field) => void };
export const FieldForm = ({ field, fieldChange }: Props) => {
  function plainTinctureChange(tincture: Tincture) {
    fieldChange({ kind: 'plain', tincture });
  }

  return field.kind === 'plain' ? (
    <div className="form-group">
      <label>Select your field</label>
      <TinctureSelect tincture={field.tincture} tinctureChange={plainTinctureChange} />
    </div>
  ) : (
    <div>TODO</div>
  );
};
