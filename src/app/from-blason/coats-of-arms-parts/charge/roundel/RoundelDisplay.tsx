import * as React from 'react';
import { Roundel } from '../../../../model/charge';
import { Dimension } from '../../../../model/dimension';
import { Tincture } from '../../../../model/tincture';
import { getChargePositions } from '../charge.helper';
import { PathFromBuilder } from '../../../../common/PathFromBuilder';
import { SvgPathBuilder } from '../../../../svg-path-builder/svg-path-builder';
import { cannotHappen } from '../../../../../utils/cannot-happen';
import { SimpleBlasonShape } from '../../blasonDisplay.helper';

type Props = {
  charge: Roundel;
  dimension: Dimension;
  shape: SimpleBlasonShape;
  fillFromTincture: (tincture: Tincture) => string;
  onClick: () => void;
};
export const RoundelDisplay = ({ charge, dimension, fillFromTincture, shape, onClick }: Props) => {
  const { width, height } = dimension;
  const stroke = charge.tincture.name === 'sable' ? '#777' : '#000';
  const fill = fillFromTincture(charge.tincture);

  const { count, disposition } = charge.countAndDisposition;
  const { cellWidth, cellHeight, positions } = getChargePositions(count, disposition, shape);
  const radius = Math.min(0.75 * cellWidth * width, 0.4 * cellHeight * height);

  return (
    <>
      {positions.map(([cx, cy], i) => {
        const centerX = cx * width;
        const centerY = cy * height;
        if (charge.inside === 'voided') {
          const innerRadius = radius * 0.65;

          const pathBuilder = SvgPathBuilder.start([centerX, centerY - radius])
            .arcTo([centerX, centerY + radius], { radius })
            .arcTo([centerX, centerY - radius], { radius })
            .moveTo([centerX, centerY - innerRadius])
            .arcTo([centerX, centerY + innerRadius], { radius: innerRadius })
            .arcTo([centerX, centerY - innerRadius], { radius: innerRadius });

          return (
            <PathFromBuilder
              key={i}
              pathBuilder={pathBuilder}
              stroke={stroke}
              fill={fill}
              fillRule="evenodd"
              onClick={onClick}
              style={{ cursor: 'pointer' }}
            />
          );
        } else if (charge.inside === 'nothing') {
          return (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={radius}
              stroke={stroke}
              fill={fill}
              onClick={onClick}
              style={{ cursor: 'pointer' }}
            />
          );
        } else {
          return cannotHappen(charge.inside);
        }
      })}
    </>
  );
};
