import { Field, fieldKinds, PartyField, PlainField } from '../../model/field';
import { TinctureSelect } from './TinctureSelect';
import * as React from 'react';
import { argent, gules, isMetal, Tincture } from '../../model/tincture';
import { PartyForm } from './PartyForm';
import { SelectScalar } from '../../common/SelectScalar';
import { cannotHappen } from '../../../utils/cannot-happen';
import { stringifyFieldKind } from '../blason.helpers';

const numberOfBars = [6, 8, 10] as const;
type Props = { field: Field; fieldChange: (field: Field) => void };
export const FieldForm = ({ field, fieldChange }: Props) => {
  function plainTinctureChange(tincture: Tincture) {
    fieldChange({ kind: 'plain', tincture });
  }

  function changeFieldKind(newKind: Field['kind']) {
    if (field.kind !== newKind) {
      const newColors = extractColors(field);
      if (newKind === 'party') {
        fieldChange({ kind: 'party', per: { name: 'fess', tinctures: newColors, line: 'straight' } });
      } else if (
        newKind === 'paly' ||
        newKind === 'paly-pily' ||
        newKind === 'bendySinister' ||
        newKind === 'bendy' ||
        newKind === 'chequy' ||
        newKind === 'lozengy' ||
        newKind === 'barry-pily'
      ) {
        fieldChange({ kind: newKind, tinctures: newColors });
      } else if (newKind === 'plain') {
        fieldChange({ kind: 'plain', tincture: newColors[0] });
      } else if (newKind === 'barry') {
        fieldChange({ kind: 'barry', number: 10, tinctures: newColors });
      } else {
        cannotHappen(newKind);
      }
    }
  }

  function extractColors(field: Field): [Tincture, Tincture] {
    if (field.kind === 'plain') {
      return [field.tincture, isMetal(field.tincture) ? gules : argent];
    } else if (field.kind === 'party') {
      return field.per.tinctures;
    } else if (
      field.kind === 'barry' ||
      field.kind === 'paly' ||
      field.kind === 'bendySinister' ||
      field.kind === 'bendy' ||
      field.kind === 'chequy' ||
      field.kind === 'lozengy' ||
      field.kind === 'paly-pily' ||
      field.kind === 'barry-pily'
    ) {
      return field.tinctures;
    } else {
      return cannotHappen(field);
    }
  }

  function firstTinctureChange(field: Exclude<Field, PlainField | PartyField>, tincture: Tincture) {
    fieldChange({ ...field, tinctures: [tincture, field.tinctures[1]] });
  }

  function secondTinctureChange(field: Exclude<Field, PlainField | PartyField>, tincture: Tincture) {
    fieldChange({ ...field, tinctures: [field.tinctures[0], tincture] });
  }

  return (
    <>
      <div className="form-group form-check field-type-select">
        <label>Select the field type</label>
        <SelectScalar
          classNamePrefix="field-type"
          options={fieldKinds}
          value={field.kind}
          valueChange={changeFieldKind}
          formatValue={stringifyFieldKind}
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
        <div className="form-group field-tincture-select">
          <label>Select your field</label>
          <TinctureSelect tincture={field.tincture} tinctureChange={plainTinctureChange} />
        </div>
      ) : field.kind === 'party' ? (
        <PartyForm field={field} fieldChange={fieldChange} />
      ) : field.kind === 'bendy' ||
        field.kind === 'bendySinister' ||
        field.kind === 'paly' ||
        field.kind === 'chequy' ||
        field.kind === 'lozengy' ||
        field.kind === 'paly-pily' ||
        field.kind === 'barry-pily' ||
        field.kind === 'barry' ? (
        <div className="row">
          <div className="col">
            <div className="form-group field-first-tincture-select">
              <label>Select your first tincture</label>
              <TinctureSelect tincture={field.tinctures[0]} tinctureChange={(t) => firstTinctureChange(field, t)} />
            </div>
          </div>
          <div className="col">
            <div className="form-group field-second-tincture-select">
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
