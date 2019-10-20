import * as React from 'react';
import { ChapePloye } from '../../../model/ordinary';
import { Tincture } from '../../../model/tincture';
import { LineSelect } from '../LineSelect';
import { Line } from '../../../model/line';
import { TinctureConfiguration } from '../../../model/tincture-configuration';
import { TincturesConfiguration } from '../TincturesConfiguration';

type SupportedOrdinary = ChapePloye;
type Props = {
  tinctureConfiguration: TinctureConfiguration;
  ordinary: SupportedOrdinary;
  ordinaryChange: (ordinary: SupportedOrdinary) => void;
};
export const ChapePloyeForm = ({ tinctureConfiguration, ordinary, ordinaryChange }: Props) => {
  function tincturesChanges(tinctures: [Tincture, Tincture]) {
    ordinaryChange({ ...ordinary, tinctures });
  }

  function lineChange(line: Line) {
    ordinaryChange({ ...ordinary, line });
  }

  return (
    <div className="row">
      <TincturesConfiguration
        tinctures={ordinary.tinctures}
        tincturesChanges={(tinctures) => tincturesChanges(tinctures)}
        tinctureConfiguration={tinctureConfiguration}
      />

      <div className="col">
        <div className="form-group">
          <label>Line style</label>
          <LineSelect line={ordinary.line} lineChange={lineChange} />
        </div>
      </div>
    </div>
  );
};
