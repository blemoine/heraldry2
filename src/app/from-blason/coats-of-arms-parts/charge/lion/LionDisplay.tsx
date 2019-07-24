import * as React from 'react';
import { Lion } from '../../../../model/charge';
import { Tincture } from '../../../../model/tincture';
import { UnitLionDisplay } from './UnitLionDisplay';
import { range } from '../../../../../utils/range';
import { Dimension, scale } from '../../../../model/dimension';

type Props = { charge: Lion; dimension: Dimension; fillFromTincture: (tincture: Tincture) => string };
export const LionDisplay = ({ charge, dimension, fillFromTincture }: Props) => {
  const count = charge.countAndDisposition.count;
  const sizeFactor = count === 1 ? 0.85 : 1;

  const computedDimension = scale(dimension, sizeFactor / charge.countAndDisposition.count);
  return (
    <>
      {range(0, charge.countAndDisposition.count).map((idx) => (
        <g
          key={idx}
          transform={`translate(${(dimension.width - computedDimension.width) / 2} ${idx * computedDimension.height -
            computedDimension.height / 10})`}
        >
          <UnitLionDisplay charge={charge} dimension={computedDimension} fillFromTincture={fillFromTincture} />
        </g>
      ))}
    </>
  );
};
