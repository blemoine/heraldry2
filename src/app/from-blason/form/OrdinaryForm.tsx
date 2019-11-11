import { OrdinaryNameSelect } from './OrdinaryNameSelect';
import * as React from 'react';
import { Ordinary } from '../../model/ordinary';
import { areTinctureEquals, argent, MetalsAndColours, tinctures } from '../../model/tincture';
import { OrdinaryDispatcherForm } from './ordinaries/OrdinaryDispatcherForm';
import { Line } from '../../model/line';
import { allDeclaredTincturesOfOrdinary } from '../blason.helpers';

type Props = {
  ordinary: Ordinary | null;
  ordinaryChange: (ordinary: Ordinary | null) => void;
};
export function OrdinaryForm({ ordinary, ordinaryChange }: Props) {
  function changeOrdinary(ordinaryName: Ordinary['name'] | null) {
    if (ordinaryName) {
      const tincture = ordinary ? allDeclaredTincturesOfOrdinary(ordinary)[0] : argent;
      const line: Line = ordinary ? ordinary.line : 'straight';
      const fimbriated: MetalsAndColours | null = ordinary ? ordinary.fimbriated : null;
      if (ordinaryName === 'pale' || ordinaryName === 'chevron' || ordinaryName === 'chevronel') {
        ordinaryChange({ name: ordinaryName, tincture, count: 1, line, fimbriated });
      } else if (ordinaryName === 'chape-ploye' || ordinaryName === 'chausse-ploye') {
        const missingColor = tinctures.find((t) => !areTinctureEquals(t, tincture));
        if (!missingColor) {
          throw new Error(`There should be a tincture different from ${tincture.name}`);
        }
        ordinaryChange({
          name: ordinaryName,
          tinctures: { kind: 'simple', tincture },
          line,
          fimbriated,
        });
      } else {
        ordinaryChange({ name: ordinaryName, tincture, line, fimbriated });
      }
    } else {
      ordinaryChange(null);
    }
  }

  return (
    <div className="row">
      <div className="col">
        <div className="form-group ordinary-type-select">
          <label>Ordinary</label>
          <OrdinaryNameSelect ordinary={ordinary?.name || null} ordinaryChange={changeOrdinary} />
        </div>
      </div>
      <div className="col">
        {ordinary && <OrdinaryDispatcherForm ordinary={ordinary} ordinaryChange={ordinaryChange} />}
      </div>
    </div>
  );
}
