import * as React from 'react';
import { TiercedField } from '../../model/field';
import { stringifyParty } from '../blason.helpers';
import { SelectScalar } from '../../common/SelectScalar';
import { LineSelect } from './LineSelect';
import { Line } from '../../model/line';
import { TinctureConfiguration } from '../../model/tincture-configuration';
import { ThreeTinctureConfiguration } from './parties/ThreeTinctureConfiguration';
import { Tierced, tierceds } from '../../model/tierced';

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  field: TiercedField;
  fieldChange: (field: TiercedField) => void;
};
export const TiercedForm = ({ tinctureConfiguration, field, fieldChange }: Props) => {
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
      <ThreeTinctureConfiguration
        tinctureConfiguration={tinctureConfiguration}
        tinctures={per.tinctures}
        tincturesChanges={(tinctures) => fieldChange({ kind: 'tierced', per: { ...per, tinctures } })}
      />
    </div>
  );
};
