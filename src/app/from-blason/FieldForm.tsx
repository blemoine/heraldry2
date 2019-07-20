import { BarryField, BendyField, BendySinisterField, Field, PalyField } from '../model/field';
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

  const fieldKinds: Array<Field['kind']> = ['plain', 'bendy', 'bendySinister', 'paly', 'party', 'barry'];
  function formatFieldKind(field: Field['kind']): string {
    if (field === 'plain') {
      return 'plain';
    } else if (field === 'bendy') {
      return 'bendy';
    } else if (field === 'bendySinister') {
      return 'bendy sinister';
    } else if (field === 'paly') {
      return 'paly';
    } else if (field === 'barry') {
      return 'barry';
    } else if (field === 'party') {
      return 'party';
    } else {
      return cannotHappen(field);
    }
  }

  function changeFieldKind(newKind: Field['kind']) {
    if (field.kind !== newKind) {
      if (newKind === 'party') {
        fieldChange({ kind: 'party', per: { name: 'fess', tinctures: [argent, sable] } });
      } else if (newKind === 'bendy') {
        fieldChange({ kind: 'bendy', tinctures: [argent, sable] });
      } else if (newKind === 'bendySinister') {
        fieldChange({ kind: 'bendySinister', tinctures: [argent, sable] });
      } else if (newKind === 'paly') {
        fieldChange({ kind: 'paly', tinctures: [argent, sable] });
      } else if (newKind === 'plain') {
        fieldChange({ kind: 'plain', tincture: argent });
      } else if (newKind === 'barry') {
        fieldChange({ kind: 'barry', number: 10, tinctures: [argent, sable] });
      } else {
        cannotHappen(newKind);
      }
    }
  }

  function firstTinctureChange(field: PalyField | BendyField | BendySinisterField | BarryField, tincture: Tincture) {
    fieldChange({ ...field, tinctures: [tincture, field.tinctures[1]] });
  }

  function secondTinctureChange(field: PalyField | BendyField | BendySinisterField | BarryField, tincture: Tincture) {
    fieldChange({ ...field, tinctures: [field.tinctures[0], tincture] });
  }

  const numberOfBars = [6, 8, 10] as const;
  return (
    <>
      <div className="form-group form-check">
        <label>Select the field type</label>
        <SelectScalar
          options={fieldKinds}
          value={field.kind}
          valueChange={changeFieldKind}
          formatValue={formatFieldKind}
        />
      </div>

      {field.kind === 'barry' && (
        <div className="form-group">
          <label>Select the number of bar</label>
          <SelectScalar
            options={numberOfBars}
            value={field.number}
            valueChange={(number) => fieldChange({ ...field, number })}
          />
        </div>
      )}

      {field.kind === 'plain' ? (
        <div className="form-group">
          <label>Select your field</label>
          <TinctureSelect tincture={field.tincture} tinctureChange={plainTinctureChange} />
        </div>
      ) : field.kind === 'party' ? (
        <PartyForm field={field} fieldChange={fieldChange} />
      ) : field.kind === 'bendy' ||
        field.kind === 'bendySinister' ||
        field.kind === 'paly' ||
        field.kind === 'barry' ? (
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
