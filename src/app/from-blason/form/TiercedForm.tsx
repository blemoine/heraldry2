import * as React from 'react';
import { TiercedField } from '../../model/field';
import { SelectScalar } from '../../common/SelectScalar';
import { LineSelect } from './LineSelect';
import { Line } from '../../model/line';
import { Tierced, tierceds } from '../../model/tierced';
import { stringifyParty } from '../../model/stringify/stringify.helper';
import { TincturesConfiguration } from './TincturesConfiguration';

type Props = {
  field: TiercedField;
  fieldChange: (field: TiercedField) => void;
};
export const TiercedForm = ({ field, fieldChange }: Props) => {
  const per = field.per;

  function tiercedChange(partyName: Tierced['name']) {
    fieldChange({ kind: 'tierced', per: { ...per, name: partyName } });
  }
  function lineChange(line: Line) {
    fieldChange({ kind: 'tierced', per: { ...per, line } });
  }

  return (
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label>Tierced</label>
          <SelectScalar
            options={tierceds}
            formatValue={stringifyParty}
            value={per.name}
            valueChange={(t) => tiercedChange(t)}
          />
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label>Line style</label>
          <LineSelect line={per.line} lineChange={lineChange} />
        </div>
      </div>
      <TincturesConfiguration
        tinctures={per.tinctures}
        tincturesChanges={(tinctures) => fieldChange({ kind: 'tierced', per: { ...per, tinctures } })}
      />
    </div>
  );
};
