import * as React from 'react';
import { ChapePloye, Ordinary, Pale } from '../../../model/ordinary';
import { MetalAndColoursSelect, TinctureSelect } from '../TinctureSelect';
import { MetalsAndColours, Tincture } from '../../../model/tincture';
import { LineSelect } from '../LineSelect';
import { Line } from '../../../model/line';
import { TinctureConfiguration } from '../../../model/tincture-configuration';

type SupportedOrdinary = Exclude<Ordinary, Pale | ChapePloye>;
type Props = {
  tinctureConfiguration: TinctureConfiguration;
  ordinary: SupportedOrdinary;
  ordinaryChange: (ordinary: SupportedOrdinary) => void;
};
export const StandardOrdinaryForm = ({ tinctureConfiguration, ordinary, ordinaryChange }: Props) => {
  function ordinaryTinctureChange(tincture: Tincture) {
    ordinaryChange({ ...ordinary, tincture });
  }

  function ordinaryFimbriatedChange(fimbriated: MetalsAndColours | null) {
    ordinaryChange({ ...ordinary, fimbriated });
  }

  function lineChange(line: Line) {
    ordinaryChange({ ...ordinary, line });
  }

  return (
    <div className="row">
      <div className="col">
        <div className="form-group ordinary-tincture-select">
          <label>Tincture</label>
          <TinctureSelect
            tinctureConfiguration={tinctureConfiguration}
            tincture={ordinary.tincture}
            tinctureChange={ordinaryTinctureChange}
          />
        </div>
      </div>

      <div className="col">
        <div className="form-group">
          <label>Line style</label>
          <LineSelect line={ordinary.line} lineChange={lineChange} />
        </div>
      </div>

      <div className="form-group">
        <label>Fimbriated</label>
        <MetalAndColoursSelect
          tinctureConfiguration={tinctureConfiguration}
          tincture={ordinary.fimbriated}
          tinctureChange={ordinaryFimbriatedChange}
        />
      </div>
    </div>
  );
};
