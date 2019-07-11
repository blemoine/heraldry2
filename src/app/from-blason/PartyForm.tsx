import * as React from 'react';
import Select from 'react-select';
import { TinctureSelect } from './TinctureSelect';
import { parties, Party } from '../model/party';
import { PartyField } from '../model/blason';
import { Tincture } from '../model/tincture';
import { stringifyParty } from './blason.helpers';

const partiesOptions = parties.map((partyName) => ({ value: partyName, label: stringifyParty(partyName) }));

type Props = { field: PartyField; fieldChange: (field: PartyField) => void };
export const PartyForm = ({ field, fieldChange }: Props) => {
  function firstTinctureChange(tincture: Tincture) {
    fieldChange({ kind: 'party', per: { ...field.per, tinctures: [tincture, field.per.tinctures[1]] } });
  }

  function secondTinctureChange(tincture: Tincture) {
    fieldChange({ kind: 'party', per: { ...field.per, tinctures: [field.per.tinctures[0], tincture] } });
  }
  function partyChange(partyName: Party['name']) {
    fieldChange({ kind: 'party', per: { ...field.per, name: partyName } });
  }

  return (
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
  );
};
