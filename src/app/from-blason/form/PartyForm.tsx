import * as React from 'react';
import { TinctureSelect } from './TinctureSelect';
import { parties, Party } from '../../model/party';
import { PartyField } from '../../model/field';
import { Tincture } from '../../model/tincture';
import { stringifyParty } from '../blason.helpers';
import { SelectScalar } from '../../common/SelectScalar';
import { LineSelect } from './LineSelect';
import { Line } from '../../model/line';
import { TinctureConfiguration } from '../../model/tincture-configuration';

const partiesOptions = parties;

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  field: PartyField;
  fieldChange: (field: PartyField) => void;
};
export const PartyForm = ({ tinctureConfiguration, field, fieldChange }: Props) => {
  function firstTinctureChange(tincture: Tincture) {
    fieldChange({ kind: 'party', per: { ...field.per, tinctures: [tincture, field.per.tinctures[1]] } });
  }

  function secondTinctureChange(tincture: Tincture) {
    fieldChange({ kind: 'party', per: { ...field.per, tinctures: [field.per.tinctures[0], tincture] } });
  }
  function partyChange(partyName: Party['name']) {
    fieldChange({ kind: 'party', per: { ...field.per, name: partyName } });
  }
  function lineChange(line: Line) {
    fieldChange({ kind: 'party', per: { ...field.per, line } });
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
          <TinctureSelect
            tinctureConfiguration={tinctureConfiguration}
            tincture={field.per.tinctures[0]}
            tinctureChange={firstTinctureChange}
          />
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label>Select your second tincture</label>
          <TinctureSelect
            tinctureConfiguration={tinctureConfiguration}
            tincture={field.per.tinctures[1]}
            tinctureChange={secondTinctureChange}
          />
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label>Select the line style</label>
          <LineSelect line={field.per.line} lineChange={lineChange} />
        </div>
      </div>
    </div>
  );
};
