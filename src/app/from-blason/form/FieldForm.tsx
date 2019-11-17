import { Field, fieldKinds, PartyField, PlainField, TiercedField } from '../../model/field';
import { TinctureSelect } from './TinctureSelect';
import * as React from 'react';
import { areTinctureEquals, Tincture, tinctures } from '../../model/tincture';
import { PartyForm } from './PartyForm';
import { SelectScalar } from '../../common/SelectScalar';
import { cannotHappen } from '../../../utils/cannot-happen';
import { ButtonGroup } from '../../common/ButtonGroup';
import { TiercedForm } from './TiercedForm';
import { stringifyFieldKind } from '../../model/stringify/stringify.helper';
import { TincturesConfiguration } from './TincturesConfiguration';
import { LineSelect } from './LineSelect';
import { allDeclaredTincturesOfField } from '../blason.helpers';

const numberOfBars = [6, 8, 10] as const;
const gironnyNumberAvailable = [8, 10, 12] as const;
type Props = { field: Field; fieldChange: (field: Field) => void };
export function FieldForm({ field, fieldChange }: Props) {
  function plainTinctureChange(tincture: Tincture) {
    fieldChange({ kind: 'plain', tincture });
  }

  function changeFieldKind(newKind: Field['kind']) {
    if (field.kind !== newKind) {
      const exitingTinctures = allDeclaredTincturesOfField(field);
      const firstTincture = exitingTinctures[0] || tinctures[0];
      const secondTincture = exitingTinctures[1] || tinctures.find((c) => !areTinctureEquals(c, firstTincture));
      const thirdTincture =
        exitingTinctures[2] ||
        tinctures.find((c) => !areTinctureEquals(c, firstTincture) && !areTinctureEquals(c, secondTincture));

      if (newKind === 'party') {
        fieldChange({
          kind: newKind,
          per: { name: 'fess', tinctures: [firstTincture, secondTincture], line: 'straight' },
        });
      } else if (newKind === 'tierced') {
        fieldChange({
          kind: newKind,
          per: {
            name: 'fess',
            tinctures: [firstTincture, secondTincture, thirdTincture],
            line: 'straight',
          },
        });
      } else if (
        newKind === 'paly' ||
        newKind === 'paly-pily' ||
        newKind === 'chequy' ||
        newKind === 'lozengy' ||
        newKind === 'barry-pily' ||
        newKind === 'bendy-pily' ||
        newKind === 'bendy-pily-sinister' ||
        newKind === 'chevronny' ||
        newKind === 'chevronny-reversed' ||
        newKind === 'quarterly-of-nine' ||
        newKind === 'lozengy-bendwise' ||
        newKind === 'embrassee-a-dexter' ||
        newKind === 'embrassee-a-sinister' ||
        newKind === 'lozenge-throughout' ||
        newKind === 'lozenge-throughout-arched' ||
        newKind === 'barry-and-per-pale' ||
        newKind === 'bendy-and-per-bend-sinister' ||
        newKind === 'bendy-sinister-and-per-bend' ||
        newKind === 'bendy-and-per-pale' ||
        newKind === 'barry-and-per-chevron-throughout'
      ) {
        fieldChange({ kind: newKind, tinctures: [firstTincture, secondTincture] });
      } else if (newKind === 'plain') {
        fieldChange({ kind: newKind, tincture: firstTincture });
      } else if (newKind === 'barry' || newKind === 'bendy' || newKind === 'bendySinister') {
        fieldChange({ kind: newKind, number: 10, tinctures: [firstTincture, secondTincture], line: 'straight' });
      } else if (newKind === 'gironny') {
        fieldChange({ kind: newKind, number: 8, tinctures: [firstTincture, secondTincture] });
      } else {
        cannotHappen(newKind);
      }
    }
  }

  function tincturesChanges(
    field: Exclude<Field, PlainField | PartyField | TiercedField>,
    tinctures: [Tincture, Tincture]
  ) {
    fieldChange({ ...field, tinctures });
  }

  return (
    <>
      <div className="form-group field-type-select">
        <label>Field type</label>
        <SelectScalar
          options={fieldKinds}
          value={field.kind}
          valueChange={changeFieldKind}
          formatValue={stringifyFieldKind}
        />
      </div>
      {field.kind === 'party' ? (
        <PartyForm field={field} fieldChange={fieldChange} />
      ) : field.kind === 'tierced' ? (
        <TiercedForm field={field} fieldChange={fieldChange} />
      ) : (
        <div className="row">
          {field.kind === 'plain' ? (
            <div className="col">
              <div className="form-group field-tincture-select">
                <label>Field</label>
                <TinctureSelect tincture={field.tincture} tinctureChange={plainTinctureChange} />
              </div>
            </div>
          ) : field.kind === 'bendy' ||
            field.kind === 'bendySinister' ||
            field.kind === 'paly' ||
            field.kind === 'chequy' ||
            field.kind === 'lozengy' ||
            field.kind === 'paly-pily' ||
            field.kind === 'barry-pily' ||
            field.kind === 'bendy-pily' ||
            field.kind === 'bendy-pily-sinister' ||
            field.kind === 'chevronny' ||
            field.kind === 'chevronny-reversed' ||
            field.kind === 'barry' ||
            field.kind === 'quarterly-of-nine' ||
            field.kind === 'gironny' ||
            field.kind === 'lozengy-bendwise' ||
            field.kind === 'embrassee-a-dexter' ||
            field.kind === 'embrassee-a-sinister' ||
            field.kind === 'lozenge-throughout' ||
            field.kind === 'lozenge-throughout-arched' ||
            field.kind === 'barry-and-per-pale' ||
            field.kind === 'bendy-and-per-bend-sinister' ||
            field.kind === 'bendy-sinister-and-per-bend' ||
            field.kind === 'bendy-and-per-pale' ||
            field.kind === 'barry-and-per-chevron-throughout' ? (
            <TincturesConfiguration
              tinctures={field.tinctures}
              tincturesChanges={(tinctures) => tincturesChanges(field, tinctures)}
            />
          ) : (
            cannotHappen(field)
          )}
        </div>
      )}

      {field.kind === 'gironny' && (
        <div className="form-group">
          <label>Number</label>
          <div>
            <ButtonGroup
              options={gironnyNumberAvailable}
              value={field.number}
              valueChange={(number) => fieldChange({ ...field, number })}
            />
          </div>
        </div>
      )}

      {(field.kind === 'barry' || field.kind === 'bendy' || field.kind === 'bendySinister') && (
        <>
          <div className="form-group">
            <label>Number of bar</label>

            <div>
              <ButtonGroup
                options={numberOfBars}
                value={field.number}
                valueChange={(number) => fieldChange({ ...field, number })}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Line</label>

            <div>
              <LineSelect line={field.line} lineChange={(line) => fieldChange({ ...field, line })} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
