import * as React from 'react';
import { Lozenge } from '../../../../model/charge';
import { Dimension } from '../../../../model/dimension';
import { Tincture } from '../../../../model/tincture';
import { getChargePositions } from '../charge.helper';
import { SvgPathBuilder } from '../../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../../common/PathFromBuilder';

type Props = { charge: Lozenge; dimension: Dimension; fillFromTincture: (tincture: Tincture) => string };
export const LozengeDisplay = ({ charge, dimension: { width, height }, fillFromTincture }: Props) => {
  const stroke = charge.tincture.name === 'sable' ? '#777' : '#000';
  const fill = fillFromTincture(charge.tincture);

  const { cellWidth, positions } = getChargePositions(charge.count);
  const radius = 0.75 * width * cellWidth;
  return (
    <>
      {positions.map(([cx, cy], i) => {
        const pathBuilder = SvgPathBuilder.start([cx * width, cy * height - radius])
          .goTo([cx * width + radius, cy * height])
          .goTo([cx * width, cy * height + radius])
          .goTo([cx * width - radius, cy * height])
          .close();
        return <PathFromBuilder  key={i} pathBuilder={pathBuilder} stroke={stroke} fill={fill} />;
      })}
    </>
  );
};
