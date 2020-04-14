import * as React from 'react';
import { BasicCharge } from './basic';
import { scale } from '~/app/model/dimension';
import { getChargePositions } from '~/app/from-blason/coats-of-arms-parts/charge/charge.helper';
import { ChargeDisplayParameters } from '~/app/from-blason/coats-of-arms-parts/ChargeDisplay';
import { getStrokeColor } from '~/app/from-blason/blason.helpers';

export const Display = ({
  charge,
  dimension,
  fillFromTincture,
  shape,
  onClick,
}: ChargeDisplayParameters<BasicCharge>) => {
  const Svg = charge.getSvg();
  const { width, height } = dimension;
  const stroke = getStrokeColor(charge.tincture);
  const fill = fillFromTincture(charge.tincture);

  const { count, disposition } = charge.countAndDisposition;
  const { cellWidth, cellHeight, positions } = getChargePositions(count, disposition, shape);
  const computedDimension = scale(dimension, Math.min(1.5 * cellWidth, cellHeight));
  return (
    <>
      {positions.map(([cx, cy], i) => {
        return (
          <g
            key={i}
            transform={`translate(${cx * width - computedDimension.width / 2} ${
              cy * height - computedDimension.height / 2
            })`}
          >
            <Svg dimension={computedDimension} stroke={stroke} mainFill={fill} onClick={onClick} />;
          </g>
        );
      })}
    </>
  );
};
