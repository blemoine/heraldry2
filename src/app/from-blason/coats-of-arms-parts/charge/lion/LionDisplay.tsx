import * as React from 'react';
import { Lion } from '../../../../model/charge';
import { Tincture } from '../../../../model/tincture';
import { UnitLionDisplay } from './UnitLionDisplay';
import { range } from '../../../../../utils/range';

type Props = { charge: Lion; width: number; height: number; fillFromTincture: (tincture: Tincture) => string };
export const LionDisplay = ({ charge, width, height, fillFromTincture }: Props) => {
  const count = charge.countAndDisposition.count;
  const sizeFactor = count === 1 ? 0.85 : 1;
  const computedHeight = (sizeFactor * height) / charge.countAndDisposition.count;
  const computedWidth = (sizeFactor * width) / charge.countAndDisposition.count;
  return (
    <>
      {range(0, charge.countAndDisposition.count).map((idx) => (
        <g
          key={idx}
          transform={`translate(${(width - computedWidth) / 2} ${idx * computedHeight - computedHeight / 10})`}
        >
          <UnitLionDisplay
            charge={charge}
            width={computedWidth}
            height={computedHeight}
            fillFromTincture={fillFromTincture}
          />
        </g>
      ))}
    </>
  );
};
