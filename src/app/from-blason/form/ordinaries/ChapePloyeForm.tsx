import * as React from 'react';
import { ChapePloye, chapePloyeTincturesKind } from '../../../model/ordinary';
import { MetalsAndColours, or, Tincture } from '../../../model/tincture';
import { LineSelect } from '../LineSelect';
import { Line } from '../../../model/line';
import { TinctureConfiguration } from '../../../model/tincture-configuration';
import { TincturesConfiguration } from '../TincturesConfiguration';
import { allDeclaredTincturesOfOrdinary } from '../../blason.helpers';
import { cannotHappen } from '../../../../utils/cannot-happen';
import { SelectScalar } from '../../../common/SelectScalar';
import { MetalAndColoursSelect } from '../TinctureSelect';

type SupportedOrdinary = ChapePloye;
type Props = {
  tinctureConfiguration: TinctureConfiguration;
  ordinary: SupportedOrdinary;
  ordinaryChange: (ordinary: SupportedOrdinary) => void;
};
export const ChapePloyeForm = ({ tinctureConfiguration, ordinary, ordinaryChange }: Props) => {
  function tincturesChanges(tinctures: Array<Tincture>) {
    if (ordinary.tinctures.kind === 'simple') {
      if (tinctures.length != 1) {
        throw new Error(`For a party, tinctures must have length 1, got ${tinctures.length}`);
      }
      ordinaryChange({
        ...ordinary,
        tinctures: { kind: 'simple', tincture: tinctures[0] },
      });
    } else if (ordinary.tinctures.kind === 'party') {
      if (tinctures.length != 2) {
        throw new Error(`For a party, tinctures must have length 2, got ${tinctures.length}`);
      }
      ordinaryChange({
        ...ordinary,
        tinctures: { kind: 'party', per: 'pale', tinctures: [tinctures[0], tinctures[1]] },
      });
    } else {
      cannotHappen(ordinary.tinctures);
    }
  }

  function ordinaryFimbriatedChange(fimbriated: MetalsAndColours | null) {
    ordinaryChange({ ...ordinary, fimbriated });
  }

  function kindChange(kind: ChapePloye['tinctures']['kind']) {
    const tinctures = allDeclaredTincturesOfOrdinary(ordinary);
    if (kind === 'simple') {
      ordinaryChange({ ...ordinary, tinctures: { kind, tincture: tinctures[0] } });
    } else if (kind === 'party') {
      ordinaryChange({ ...ordinary, tinctures: { kind, per: 'pale', tinctures: [tinctures[0], tinctures[1] || or] } });
    } else {
      cannotHappen(kind);
    }
  }

  function lineChange(line: Line) {
    ordinaryChange({ ...ordinary, line });
  }

  const tinctures = allDeclaredTincturesOfOrdinary(ordinary);

  return (
    <div className="row">
      <TincturesConfiguration
        tinctures={tinctures}
        tincturesChanges={(tinctures) => tincturesChanges(tinctures)}
        tinctureConfiguration={tinctureConfiguration}
      />

      <div className="col">
        <div className="form-group">
          <label>Line style</label>
          <LineSelect line={ordinary.line} lineChange={lineChange} />
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label>Type</label>
          <SelectScalar value={ordinary.tinctures.kind} valueChange={kindChange} options={chapePloyeTincturesKind} />
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
