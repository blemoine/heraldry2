import * as React from 'react';
import { Roundel } from '../../../../model/charge';
import { Dimension } from '../../../../model/dimension';
import { Tincture } from '../../../../model/tincture';
import { getChargePositions } from '../charge.helper';

type Props = { charge: Roundel; dimension: Dimension; fillFromTincture: (tincture: Tincture) => string };
export const RoundelDisplay = ({ charge, dimension: { width, height }, fillFromTincture }: Props) => {
  const stroke = charge.tincture.name === 'sable' ? '#777' : '#000';
  const fill = fillFromTincture(charge.tincture);

  const { cellWidth, positions } = getChargePositions(charge.count);
  const radius = 0.75 * width * cellWidth;
  return (
    <>
      {positions.map(([cx, cy], i) => {
        return <circle key={i} cx={cx * width} cy={cy * height} r={radius} stroke={stroke} fill={fill} />;
      })}
    </>
  );
};
