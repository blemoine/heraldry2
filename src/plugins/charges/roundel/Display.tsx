import * as React from 'react';
import { Roundel } from './roundel';
import { getChargePositions } from '~/app/from-blason/coats-of-arms-parts/charge/charge.helper';
import { ChargeDisplayParameters } from '~/app/from-blason/coats-of-arms-parts/ChargeDisplay';
import { FocusablePathFromBuilder } from '~/app/common/PathFromBuilder';
import { SvgPathBuilder } from '~/app/svg-path-builder/svg-path-builder';
import { getStrokeColor } from '~/app/from-blason/blason.helpers';
import { cannotHappen } from '~/utils/cannot-happen';

export const Display = ({
  charge,
  dimension: { width, height },
  fillFromTincture,
  shape,
  onClick,
}: ChargeDisplayParameters<Roundel>) => {
  const stroke = getStrokeColor(charge.tincture);
  const fill = fillFromTincture(charge.tincture);

  const { count, disposition } = charge.countAndDisposition;
  const { cellWidth, cellHeight, positions } = getChargePositions(count, disposition, shape);
  const radius = Math.min(0.75 * cellWidth * width, 0.4 * cellHeight * height);

  return (
    <>
      {positions.map(([cx, cy], i) => {
        const centerX = cx * width;
        const centerY = cy * height;

        const externalPathBuilder = SvgPathBuilder.start([centerX, centerY - radius])
          .arcTo([centerX, centerY + radius], { radius })
          .arcTo([centerX, centerY - radius], { radius });

        if (charge.inside === 'voided') {
          const innerRadius = radius * 0.65;

          const pathBuilder = externalPathBuilder
            .moveTo([centerX, centerY - innerRadius])
            .arcTo([centerX, centerY + innerRadius], { radius: innerRadius })
            .arcTo([centerX, centerY - innerRadius], { radius: innerRadius });

          return (
            <FocusablePathFromBuilder
              key={i}
              pathBuilder={pathBuilder}
              stroke={stroke}
              fill={fill}
              fillRule="evenodd"
              onClick={onClick}
            />
          );
        } else if (charge.inside === 'nothing') {
          return (
            <FocusablePathFromBuilder
              key={i}
              pathBuilder={externalPathBuilder}
              stroke={stroke}
              fill={fill}
              fillRule="evenodd"
              onClick={onClick}
            />
          );
        } else {
          return cannotHappen(charge.inside);
        }
      })}
    </>
  );
};
