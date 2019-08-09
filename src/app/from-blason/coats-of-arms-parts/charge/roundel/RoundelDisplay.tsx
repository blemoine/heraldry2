import * as React from 'react';
import { Roundel } from '../../../../model/charge';
import { Dimension } from '../../../../model/dimension';
import { Tincture } from '../../../../model/tincture';
import { getChargePositions } from '../charge.helper';
import { PathFromBuilder } from '../../../../common/PathFromBuilder';
import { SvgPathBuilder } from '../../../../svg-path-builder/svg-path-builder';
import { cannotHappen } from '../../../../../utils/cannot-happen';

type Props = { charge: Roundel; dimension: Dimension; fillFromTincture: (tincture: Tincture) => string };
export const RoundelDisplay = ({ charge, dimension: { width, height }, fillFromTincture }: Props) => {
  const stroke = charge.tincture.name === 'sable' ? '#777' : '#000';
  const fill = fillFromTincture(charge.tincture);

  const { cellWidth, positions } = getChargePositions(charge.count, 'default');
  const radius = 0.75 * width * cellWidth;
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

          return <PathFromBuilder key={i} pathBuilder={pathBuilder} stroke={stroke} fill={fill} fillRule="evenodd" />;
        } else if (charge.inside === 'nothing') {
          return <circle key={i} cx={centerX} cy={centerY} r={radius} stroke={stroke} fill={fill} />;
        } else {
          return cannotHappen(charge.inside);
        }
      })}
    </>
  );
};
