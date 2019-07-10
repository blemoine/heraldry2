import { Field } from '../model/blason';
import { TinctureSelect } from './TinctureSelect';
import * as React from 'react';
import { argent, Tincture } from '../model/tincture';
import { uuid } from '../../utils/uuid';
import Select from 'react-select';
import { parties, Party } from '../model/party';

const partiesOptions = parties.map((partyName) => ({ value: partyName, label: partyName }));

type Props = { field: Field; fieldChange: (field: Field) => void };
export const FieldForm = ({ field, fieldChange }: Props) => {
  function plainTinctureChange(tincture: Tincture) {
    fieldChange({ kind: 'plain', tincture });
  }

  // TODO abstract Party form, should remove throw Error
  function firstTinctureChange(tincture: Tincture) {
    if (field.kind === 'party') {
      fieldChange({ kind: 'party', per: { ...field.per, tinctures: [tincture, field.per.tinctures[1]] } });
    } else {
      throw new Error(`Changing second tincture is impossible for field kind ${field.kind}`);
    }
  }

  function secondTinctureChange(tincture: Tincture) {
    if (field.kind === 'party') {
      fieldChange({ kind: 'party', per: { ...field.per, tinctures: [field.per.tinctures[0], tincture] } });
    } else {
      throw new Error(`Changing second tincture is impossible for field kind ${field.kind}`);
    }
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

  function partyChange(partyName: Party['name']) {
    if (field.kind === 'party') {
      fieldChange({ kind: 'party', per: { ...field.per, name: partyName } });
    } else {
      throw new Error(`Changing party name is impossible for field kind ${field.kind}`);
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
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label>Select your party</label>
              <Select
                options={partiesOptions}
                value={partiesOptions.find(({ value }) => value === field.per.name)}
                onChange={(t: any) => partyChange(t.value)}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Select your first tincture</label>
              <TinctureSelect tincture={field.per.tinctures[0]} tinctureChange={firstTinctureChange} />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Select your second tincture</label>
              <TinctureSelect tincture={field.per.tinctures[1]} tinctureChange={secondTinctureChange} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
