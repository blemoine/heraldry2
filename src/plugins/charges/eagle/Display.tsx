import * as React from 'react';
import { Eagle } from './eagle';
import { scale } from '~/app/model/dimension';
import { getChargePositions } from '~/app/from-blason/coats-of-arms-parts/charge/charge.helper';
import { ChargeDisplayParameters } from '~/app/from-blason/coats-of-arms-parts/ChargeDisplay';
import { getStrokeColor } from '~/app/from-blason/blason.helpers';

export const Display = ({ charge, dimension, fillFromTincture, shape, onClick }: ChargeDisplayParameters<Eagle>) => {
  const Svg = charge.getSvg();
  const stroke = getStrokeColor(charge.tincture);

  const mainFill = fillFromTincture(charge.tincture);
  const tongueFill = fillFromTincture(charge.secondaryTincture);
  const talonFill = tongueFill;

  const { count, disposition } = charge.countAndDisposition;

  const { cellWidth, positions, cellHeight } = getChargePositions(count, disposition, shape);
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
            <Svg
              dimension={computedDimension}
              stroke={stroke}
              mainFill={mainFill}
              tongueFill={tongueFill}
              talonFill={talonFill}
              onClick={onClick}
            />
          </g>
        );
      })}
    </>
  );
};
