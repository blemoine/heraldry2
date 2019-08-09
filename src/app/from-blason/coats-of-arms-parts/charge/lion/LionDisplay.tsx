import * as React from 'react';
import { Lion } from '../../../../model/charge';
import { Tincture } from '../../../../model/tincture';
import { UnitLionDisplay } from './UnitLionDisplay';
import { Dimension, scale } from '../../../../model/dimension';
import { getChargePositions } from '../charge.helper';

type Props = { charge: Lion; dimension: Dimension; fillFromTincture: (tincture: Tincture) => string };
export const LionDisplay = ({ charge, dimension, fillFromTincture }: Props) => {
  const countAndDisposition = charge.countAndDisposition;
  const count = countAndDisposition.count;

  const disposition = 'disposition' in countAndDisposition ? countAndDisposition.disposition : 'default';
  const { cellWidth, cellHeight, positions } = getChargePositions(count, disposition);
  const { width, height } = dimension;
  const computedDimension = scale(dimension, Math.min(2.2 * cellWidth, cellHeight));

  return (
    <>
      {positions.map(([cx, cy], idx) => {
        const centerX = cx * width;
        const centerY = cy * height;
        return (
          <g
            key={idx}
            transform={`translate(${centerX - computedDimension.width / 2} ${centerY - computedDimension.height / 2} )`}
          >
            <UnitLionDisplay charge={charge} dimension={computedDimension} fillFromTincture={fillFromTincture} />
          </g>
        );
      })}
    </>
  );
};
