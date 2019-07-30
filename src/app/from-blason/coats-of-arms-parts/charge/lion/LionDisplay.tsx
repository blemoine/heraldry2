import * as React from 'react';
import { Lion } from '../../../../model/charge';
import { Tincture } from '../../../../model/tincture';
import { UnitLionDisplay } from './UnitLionDisplay';
import { range } from '../../../../../utils/range';
import { Dimension, scale } from '../../../../model/dimension';

type Props = { charge: Lion; dimension: Dimension; fillFromTincture: (tincture: Tincture) => string };
export const LionDisplay = ({ charge, dimension, fillFromTincture }: Props) => {
  const count = charge.countAndDisposition.count;
  const sizeFactor = 0.85;

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
};
