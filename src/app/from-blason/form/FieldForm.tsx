import { Field, fieldKinds, PartyField, PlainField } from '../../model/field';
import { TinctureSelect } from './TinctureSelect';
import * as React from 'react';
import { argent, gules, isMetal, Tincture } from '../../model/tincture';
import { PartyForm } from './PartyForm';
import { SelectScalar } from '../../common/SelectScalar';
import { cannotHappen } from '../../../utils/cannot-happen';
import { stringifyFieldKind } from '../blason.helpers';
import { TinctureConfiguration } from '../../model/tincture-configuration';
import { ButtonGroup } from '../../common/ButtonGroup';

function extractColors(field: Field): [Tincture, Tincture] {
  if (field.kind === 'plain') {
    return [field.tincture, isMetal(field.tincture) ? gules : argent];
  } else if (field.kind === 'party') {
    if (field.per.name === 'pall') {
      return [field.per.tinctures[0], field.per.tinctures[1]];
    } else {
      return field.per.tinctures;
    }
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
    field.kind === 'gironny' ||
    field.kind === 'quarterly-of-nine' ||
    field.kind === 'lozengy-bendwise'
  ) {
    return field.tinctures;
  } else {
    return cannotHappen(field);
  }
}

const numberOfBars = [6, 8, 10] as const;
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
      } else if (
        newKind === 'paly' ||
        newKind === 'paly-pily' ||
        newKind === 'chequy' ||
        newKind === 'lozengy' ||
        newKind === 'barry-pily' ||
        newKind === 'bendy-pily' ||
        newKind === 'bendy-pily-sinister' ||
        newKind === 'chevronny' ||
        newKind === 'quarterly-of-nine' ||
        newKind === 'lozengy-bendwise'
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

  function firstTinctureChange(field: Exclude<Field, PlainField | PartyField>, tincture: Tincture) {
    fieldChange({ ...field, tinctures: [tincture, field.tinctures[1]] });
  }

  function secondTinctureChange(field: Exclude<Field, PlainField | PartyField>, tincture: Tincture) {
    fieldChange({ ...field, tinctures: [field.tinctures[0], tincture] });
  }

  return (
    <>
      {field.kind === 'party' ? (
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
          <PartyForm tinctureConfiguration={tinctureConfiguration} field={field} fieldChange={fieldChange} />
        </>
      ) : (
        <div className="row">
          <div className="col">
            <div className="form-group field-type-select">
              <label>Field type</label>
              <SelectScalar
                options={fieldKinds}
                value={field.kind}
                valueChange={changeFieldKind}
                formatValue={stringifyFieldKind}
              />
            </div>
          </div>
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
            field.kind === 'barry' ||
            field.kind === 'quarterly-of-nine' ||
            field.kind === 'gironny' ||
            field.kind === 'lozengy-bendwise' ? (
            <>
              <div className="col">
                <div className="form-group field-first-tincture-select">
                  <label>First tincture</label>
                  <TinctureSelect
                    tinctureConfiguration={tinctureConfiguration}
                    tincture={field.tinctures[0]}
                    tinctureChange={(t) => firstTinctureChange(field, t)}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group field-second-tincture-select">
                  <label>Second tincture</label>
                  <TinctureSelect
                    tinctureConfiguration={tinctureConfiguration}
                    tincture={field.tinctures[1]}
                    tinctureChange={(t) => secondTinctureChange(field, t)}
                  />
                </div>
              </div>
            </>
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
              options={[8, 12] as const}
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
