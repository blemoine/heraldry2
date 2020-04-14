import * as React from 'react';
import { Cross } from './cross';
import { cannotHappen } from '~/utils/cannot-happen';
import { getChargePositions } from '~/app/from-blason/coats-of-arms-parts/charge/charge.helper';
import { ChargeDisplayParameters } from '~/app/from-blason/coats-of-arms-parts/ChargeDisplay';
import { getStrokeColor } from '~/app/from-blason/blason.helpers';
import { Bottony } from './Bottony';
import { Cercelee } from './Cercelee';
import { Crosselet } from './Crosselet';
import { Flory } from './Flory';
import { Hummetty } from './Hummetty';
import { Maltese } from './Maltese';
import { Moline } from './Moline';
import { Patty } from './Patty';
import { Potent } from './Potent';

export const Display = ({
  charge,
  dimension: { width, height },
  fillFromTincture,
  shape,
  onClick,
}: ChargeDisplayParameters<Cross>) => {
  const stroke = getStrokeColor(charge.tincture);
  const fill = fillFromTincture(charge.tincture);

  const { count, disposition } = charge.countAndDisposition;
  const { cellWidth, cellHeight, positions } = getChargePositions(count, disposition, shape);

  const radius = Math.min(width * cellWidth * 0.9, height * cellHeight * 0.45);
  const crossWidth = radius / 10;
  return (
    <>
      {positions.map(([cx, cy], i) => {
        const center = [cx * width, cy * height] as const;
        let CrossType;
        let widthFactor = 1;
        let radiusFactor = 1;
        if (charge.limbs === 'hummetty') {
          CrossType = Hummetty;
        } else if (charge.limbs === 'bottony') {
          CrossType = Bottony;
        } else if (charge.limbs === 'cercelée') {
          CrossType = Cercelee;
          radiusFactor = 0.85;
        } else if (charge.limbs === 'moline') {
          CrossType = Moline;
          radiusFactor = 0.85;
        } else if (charge.limbs === 'potent') {
          CrossType = Potent;
        } else if (charge.limbs === 'pattée') {
          CrossType = Patty;
        } else if (charge.limbs === 'crosselet') {
          CrossType = Crosselet;
          widthFactor = 0.7;
        } else if (charge.limbs === 'maltese') {
          CrossType = Maltese;
          widthFactor = 0.7;
        } else if (charge.limbs === 'flory') {
          CrossType = Flory;
        } else {
          return cannotHappen(charge.limbs);
        }
        return (
          <CrossType
            key={i}
            fill={fill}
            stroke={stroke}
            center={center}
            crossWidth={crossWidth * widthFactor}
            crossRadius={radius * radiusFactor}
            onClick={onClick}
          />
        );
      })}
    </>
  );
};
