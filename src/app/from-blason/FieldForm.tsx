import { BendyField, Field, PalyField } from '../model/field';
import { TinctureSelect } from './TinctureSelect';
import * as React from 'react';
import { argent, sable, Tincture } from '../model/tincture';
import { PartyForm } from './PartyForm';
import { SelectScalar } from '../common/SelectScalar';
import { cannotHappen } from '../../utils/cannot-happen';

type Props = { field: Field; fieldChange: (field: Field) => void };
export const FieldForm = ({ field, fieldChange }: Props) => {
  function plainTinctureChange(tincture: Tincture) {
    fieldChange({ kind: 'plain', tincture });
  }

  const fieldKinds: Array<Field['kind']> = ['plain', 'bendy', 'paly', 'party'];

  function changeFieldKind(newKind: Field['kind']) {
    if (field.kind !== newKind) {
      if (newKind === 'party') {
        fieldChange({ kind: 'party', per: { name: 'fess', tinctures: [argent, sable] } });
      } else if (newKind === 'bendy') {
        fieldChange({ kind: 'bendy', tinctures: [argent, sable] });
      } else if (newKind === 'paly') {
        fieldChange({ kind: 'paly', tinctures: [argent, sable] });
      } else if (newKind === 'plain') {
        fieldChange({ kind: 'plain', tincture: argent });
      } else {
        cannotHappen(newKind);
      }
    }
  }

  function firstTinctureChange(field: PalyField | BendyField, tincture: Tincture) {
    fieldChange({ kind: field.kind, tinctures: [tincture, field.tinctures[1]] });
  }

  function secondTinctureChange(field: PalyField | BendyField, tincture: Tincture) {
    fieldChange({ kind: field.kind, tinctures: [field.tinctures[0], tincture] });
  }

  return (
    <>
      <div className="form-group form-check">
        <label>Select the field type</label>
        <SelectScalar options={fieldKinds} value={field.kind} valueChange={changeFieldKind} />
      </div>

      {field.kind === 'plain' ? (
        <div className="form-group">
          <label>Select your field</label>
          <TinctureSelect tincture={field.tincture} tinctureChange={plainTinctureChange} />
        </div>
      ) : field.kind === 'party' ? (
        <PartyForm field={field} fieldChange={fieldChange} />
      ) : field.kind === 'bendy' || field.kind === 'paly' ? (
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label>Select your first tincture</label>
              <TinctureSelect tincture={field.tinctures[0]} tinctureChange={(t) => firstTinctureChange(field, t)} />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Select your second tincture</label>
              <TinctureSelect tincture={field.tinctures[1]} tinctureChange={(t) => secondTinctureChange(field, t)} />
            </div>
          </div>
        </div>
      ) : (
        cannotHappen(field)
      )}
    </>
  );
};
