import * as React from 'react';
import { TinctureSelect } from './TinctureSelect';
import { parties, Party } from '../model/party';
import { PartyField } from '../model/blason';
import { Tincture } from '../model/tincture';
import { stringifyParty } from './blason.helpers';
import { SelectScalar } from '../common/SelectScalar';

const partiesOptions = parties;

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
          <SelectScalar
            options={partiesOptions}
            formatValue={stringifyParty}
            value={field.per.name}
            valueChange={(t) => partyChange(t)}
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
