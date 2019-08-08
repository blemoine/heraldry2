import * as React from 'react';
import { Lion } from '../../../../model/charge';
import { Tincture } from '../../../../model/tincture';
import { UnitLionDisplay } from './UnitLionDisplay';
import { range } from '../../../../../utils/range';
import { Dimension, scale } from '../../../../model/dimension';
import { getChargePositions } from '../charge.helper';

type Props = { charge: Lion; dimension: Dimension; fillFromTincture: (tincture: Tincture) => string };
export const LionDisplay = ({ charge, dimension, fillFromTincture }: Props) => {
  const count = charge.countAndDisposition.count;
  const sizeFactor = 0.85;

  if ('disposition' in charge.countAndDisposition && charge.countAndDisposition.disposition === 'default') {
    const { cellWidth, positions } = getChargePositions(charge.countAndDisposition.count);
    const { width, height } = dimension;

    const radius = 2.1 * width * cellWidth;
    return (
      <>
        {positions.map(([cx, cy], idx) => {
          const centerX = cx * width;
          const centerY = cy * height;
          const computedDimension = { width: radius, height: radius };
          return (
            <g
              key={idx}
              transform={`translate(${centerX - computedDimension.width / 2} ${centerY -
                computedDimension.height / 2} )`}
            >
              <UnitLionDisplay charge={charge} dimension={computedDimension} fillFromTincture={fillFromTincture} />
            </g>
          );
        })}
      </>
    );
  } else {
    const computedDimension = scale(dimension, sizeFactor / count);
    computedDimension.width = 0.95 * computedDimension.width;

    return (
      <>
        {range(0, count).map((idx) => (
          <g
            key={idx}
            transform={`translate(${(dimension.width - computedDimension.width) / 2} ${idx * computedDimension.height +
              (dimension.height - count * computedDimension.height) / 2 -
              computedDimension.height / 15} )`}
          >
            <UnitLionDisplay charge={charge} dimension={computedDimension} fillFromTincture={fillFromTincture} />
          </g>
        ))}
      </>
    );
  }
};
