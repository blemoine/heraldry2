import { Field, fieldKinds, PartyField, PlainField, TiercedField } from '../../model/field';
import { TinctureSelect } from './TinctureSelect';
import * as React from 'react';
import { argent, gules, isMetal, Tincture, tinctures } from '../../model/tincture';
import { PartyForm } from './PartyForm';
import { SelectScalar } from '../../common/SelectScalar';
import { cannotHappen } from '../../../utils/cannot-happen';
import { TinctureConfiguration } from '../../model/tincture-configuration';
import { ButtonGroup } from '../../common/ButtonGroup';
import { TiercedForm } from './TiercedForm';
import { stringifyFieldKind } from '../../model/stringify/stringify.helper';
import { TincturesConfiguration } from './TincturesConfiguration';

function extractColors(field: Field): [Tincture, Tincture] {
  if (field.kind === 'plain') {
    return [field.tincture, isMetal(field.tincture) ? gules : argent];
  } else if (field.kind === 'party') {
    if (field.per.name === 'pall') {
      return [field.per.tinctures[0], field.per.tinctures[1]];
    } else {
      return field.per.tinctures;
    }
  } else if (field.kind === 'tierced') {
    return [field.per.tinctures[0], field.per.tinctures[1]];
  } else if (
    field.kind === 'barry' ||
    field.kind === 'paly' ||
    field.kind === 'bendySinister' ||
    field.kind === 'bendy' ||
    field.kind === 'chequy' ||
    field.kind === 'lozengy' ||
    field.kind === 'paly-pily' ||
    field.kind === 'barry-pily' ||
    field.kind === 'bendy-pily' ||
    field.kind === 'bendy-pily-sinister' ||
    field.kind === 'chevronny' ||
    field.kind === 'chevronny-reversed' ||
    field.kind === 'gironny' ||
    field.kind === 'quarterly-of-nine' ||
    field.kind === 'lozengy-bendwise' ||
    field.kind === 'embrassee-a-dexter' ||
    field.kind === 'embrassee-a-sinister' ||
    field.kind === 'lozenge-throughout' ||
    field.kind === 'lozenge-throughout-arched' ||
    field.kind === 'barry-and-per-pale'
  ) {
    return field.tinctures;
  } else {
    return cannotHappen(field);
  }
}

const numberOfBars = [6, 8, 10] as const;
const gironnyNumberAvailable = [8, 12] as const;
type Props = { tinctureConfiguration: TinctureConfiguration; field: Field; fieldChange: (field: Field) => void };
export function FieldForm({ tinctureConfiguration, field, fieldChange }: Props) {
  function plainTinctureChange(tincture: Tincture) {
    fieldChange({ kind: 'plain', tincture });
  }

  function changeFieldKind(newKind: Field['kind']) {
    if (field.kind !== newKind) {
      const newColors = extractColors(field);
      if (newKind === 'party') {
        fieldChange({ kind: newKind, per: { name: 'fess', tinctures: newColors, line: 'straight' } });
      } else if (newKind === 'tierced') {
        const missingColor = tinctures.find((c) => c.name !== newColors[0].name && c.name !== newColors[1].name);
        if (!missingColor) {
          throw new Error(`There should be a color different than ${newColors}`);
        }
        fieldChange({
          kind: newKind,
          per: {
            name: 'fess',
            tinctures: [newColors[0], newColors[1], missingColor],
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
        newKind === 'barry-and-per-pale'
      ) {
        fieldChange({ kind: newKind, tinctures: newColors });
      } else if (newKind === 'plain') {
        fieldChange({ kind: newKind, tincture: newColors[0] });
      } else if (newKind === 'barry' || newKind === 'bendy' || newKind === 'bendySinister') {
        fieldChange({ kind: newKind, number: 10, tinctures: newColors });
      } else if (newKind === 'gironny') {
        fieldChange({ kind: newKind, number: 8, tinctures: newColors });
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
        <PartyForm tinctureConfiguration={tinctureConfiguration} field={field} fieldChange={fieldChange} />
      ) : field.kind === 'tierced' ? (
        <TiercedForm tinctureConfiguration={tinctureConfiguration} field={field} fieldChange={fieldChange} />
      ) : (
        <div className="row">
          {field.kind === 'plain' ? (
            <div className="col">
              <div className="form-group field-tincture-select">
                <label>Field</label>
                <TinctureSelect
                  tinctureConfiguration={tinctureConfiguration}
                  tincture={field.tincture}
                  tinctureChange={plainTinctureChange}
                />
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
            field.kind === 'barry-and-per-pale' ? (
            <TincturesConfiguration
              tinctures={field.tinctures}
              tincturesChanges={(tinctures) => tincturesChanges(field, tinctures)}
              tinctureConfiguration={tinctureConfiguration}
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

      {(field.kind === 'barry' || field.kind === 'bendy') && (
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
      )}
    </>
  );
}
