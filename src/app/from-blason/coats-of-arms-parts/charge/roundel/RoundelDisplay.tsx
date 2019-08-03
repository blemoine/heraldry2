import * as React from 'react';
import { Roundel } from '../../../../model/charge';
import { Dimension } from '../../../../model/dimension';
import { Tincture } from '../../../../model/tincture';
import { range } from '../../../../../utils/range';
import { max } from '../../../../../utils/max';

const repartitionMapping = {
  1: [1],
  2: [2],
  3: [2, 1],
  4: [3, 1],
  5: [3, 2],
  6: [3, 2, 1],
  7: [3, 2, 2],
  8: [3, 3, 2],
  9: [3, 3, 3],
  10: [4, 3, 2, 1],
  11: [4, 3, 3, 1],
  12: [4, 3, 3, 2],
  13: [4, 3, 3, 3],
  14: [5, 4, 3, 2],
  15: [5, 4, 3, 2, 1],
  16: [5, 4, 3, 3, 1],
  17: [5, 4, 3, 3, 2],
  18: [6, 5, 4, 2, 1],
  19: [6, 5, 4, 3, 1],
  20: [6, 5, 4, 3, 2],
} as const;

type Props = { charge: Roundel; dimension: Dimension; fillFromTincture: (tincture: Tincture) => string };
export const RoundelDisplay = ({ charge, dimension: { width, height }, fillFromTincture }: Props) => {
  const stroke = charge.tincture.name === 'sable' ? '#777' : '#000';

  const fill = fillFromTincture(charge.tincture);

  const repartition: ReadonlyArray<number> = repartitionMapping[charge.count];
  const columnCount = max(repartition) || 1;
  const radius = (0.75 * width) / (columnCount * 2 + 1);
  const cellSize = width / (columnCount * 2 + 1);
  return (
    <>
      {repartition.map((numberOfRoundel, row) => {
        const cy = ((row * 1.5 + 1) * height) / (repartition.length * 2);
        const offset: number = columnCount - numberOfRoundel;
        return range(0, numberOfRoundel).map((i) => {
          const cx = (i * 2 + 1.5 + offset) * cellSize;

          return <circle key={row + '_' + i} cx={cx} cy={cy} r={radius} stroke={stroke} fill={fill} />;
        });
      })}
    </>
  );
};
