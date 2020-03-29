import * as React from 'react';
import { Crown } from '../../../../model/charge';
import { Tincture } from '../../../../model/tincture';
import { UnitCrownDisplay } from './UnitCrownDisplay';
import { Dimension, scale } from '../../../../model/dimension';
import { getChargePositions } from '../charge.helper';
import { SimpleBlasonShape } from '../../blasonDisplay.helper';

type Props = {
  charge: Crown;
  dimension: Dimension;
  shape: SimpleBlasonShape;
  fillFromTincture: (tincture: Tincture) => string;
  onClick: () => void;
};
export const CrownDisplay = ({ charge, dimension, fillFromTincture, shape, onClick }: Props) => {
  const { count, disposition } = charge.countAndDisposition;
  const { cellWidth, cellHeight, positions } = getChargePositions(count, disposition, shape);
  const { width, height } = dimension;
  const computedDimension = scale(dimension, Math.min(2.2 * cellWidth, 0.8 * cellHeight));

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
            <UnitCrownDisplay
              charge={charge}
              dimension={computedDimension}
              fillFromTincture={fillFromTincture}
              onClick={onClick}
            />
          </g>
        );
      })}
    </>
  );
};
