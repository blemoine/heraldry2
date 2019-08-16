import * as React from 'react';
import { Dimension } from '../../../../model/dimension';
import { Tincture } from '../../../../model/tincture';
import { Cross } from '../../../../model/charge';
import { cannotHappen } from '../../../../../utils/cannot-happen';
import { SvgPathBuilder } from '../../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../../common/PathFromBuilder';
import { getChargePositions } from '../charge.helper';

type Props = { charge: Cross; dimension: Dimension; fillFromTincture: (tincture: Tincture) => string };
export const CrossDisplay = ({ charge, dimension: { width, height }, fillFromTincture }: Props) => {
  const stroke = charge.tincture.name === 'sable' ? '#777' : '#000';
  const fill = fillFromTincture(charge.tincture);

  const { count, disposition } = charge.countAndDisposition;
  const { cellWidth, cellHeight, positions } = getChargePositions(count, disposition);

  const radius = Math.min(width * cellWidth * 0.9, height * cellHeight * 0.45);
  const crossWidth = radius / 10;

  return (
    <>
      {positions.map(([cx, cy], i) => {
        const centerX = cx * width;
        const centerY = cy * height;
        if (charge.limbs === 'hummetty') {
          const pathBuilder = SvgPathBuilder.start([centerX - crossWidth, centerY - crossWidth])
            .goTo([centerX - crossWidth, centerY - radius])
            .goTo([centerX + crossWidth, centerY - radius])
            .goTo([centerX + crossWidth, centerY - crossWidth])
            .goTo([centerX + radius, centerY - crossWidth])
            .goTo([centerX + radius, centerY + crossWidth])
            .goTo([centerX + crossWidth, centerY + crossWidth])
            .goTo([centerX + crossWidth, centerY + radius])
            .goTo([centerX - crossWidth, centerY + radius])
            .goTo([centerX - crossWidth, centerY + crossWidth])
            .goTo([centerX - radius, centerY + crossWidth])
            .goTo([centerX - radius, centerY - crossWidth])
            .close();

          return <PathFromBuilder key={i} pathBuilder={pathBuilder} fill={fill} stroke={stroke} />;
        } else if (charge.limbs === 'potent') {
          const wideFactor = 6;
          const pathBuilder = SvgPathBuilder.start([centerX - crossWidth, centerY - crossWidth])
            .goTo([centerX - crossWidth, centerY - radius + 2 * crossWidth])
            .goTo([centerX - wideFactor * crossWidth, centerY - radius + 2 * crossWidth])
            .goTo([centerX - wideFactor * crossWidth, centerY - radius])
            .goTo([centerX + wideFactor * crossWidth, centerY - radius])
            .goTo([centerX + wideFactor * crossWidth, centerY - radius + 2 * crossWidth])
            .goTo([centerX + crossWidth, centerY - radius + 2 * crossWidth])
            .goTo([centerX + crossWidth, centerY - crossWidth])
            .goTo([centerX + radius - 2 * crossWidth, centerY - crossWidth])
            .goTo([centerX + radius - 2 * crossWidth, centerY - wideFactor * crossWidth])
            .goTo([centerX + radius, centerY - wideFactor * crossWidth])
            .goTo([centerX + radius, centerY + wideFactor * crossWidth])
            .goTo([centerX + radius - 2 * crossWidth, centerY + wideFactor * crossWidth])
            .goTo([centerX + radius - 2 * crossWidth, centerY + crossWidth])
            .goTo([centerX + crossWidth, centerY + crossWidth])
            .goTo([centerX + crossWidth, centerY + radius - 2 * crossWidth])
            .goTo([centerX + wideFactor * crossWidth, centerY + radius - 2 * crossWidth])
            .goTo([centerX + wideFactor * crossWidth, centerY + radius])
            .goTo([centerX - wideFactor * crossWidth, centerY + radius])
            .goTo([centerX - wideFactor * crossWidth, centerY + radius - 2 * crossWidth])
            .goTo([centerX - crossWidth, centerY + radius - 2 * crossWidth])
            .goTo([centerX - crossWidth, centerY + crossWidth])
            .goTo([centerX - radius + 2 * crossWidth, centerY + crossWidth])
            .goTo([centerX - radius + 2 * crossWidth, centerY + wideFactor * crossWidth])
            .goTo([centerX - radius, centerY + wideFactor * crossWidth])
            .goTo([centerX - radius, centerY - wideFactor * crossWidth])
            .goTo([centerX - radius + 2 * crossWidth, centerY - wideFactor * crossWidth])
            .goTo([centerX - radius + 2 * crossWidth, centerY - crossWidth])
            .goTo([centerX - crossWidth, centerY - crossWidth]);

          return <PathFromBuilder key={i} pathBuilder={pathBuilder} fill={fill} stroke={stroke} />;
        } else if (charge.limbs === 'pattée') {
          const wideFactor = 6;
          const pathBuilder = SvgPathBuilder.start([centerX - crossWidth, centerY - crossWidth])
            .quadraticeBezier(
              [centerX - wideFactor * crossWidth, centerY - radius],
              [centerX - crossWidth, (centerY - crossWidth + (centerY - radius)) / 2]
            )
            .goTo([centerX + wideFactor * crossWidth, centerY - radius])
            .quadraticeBezier(
              [centerX + crossWidth, centerY - crossWidth],
              [centerX + crossWidth, (centerY - crossWidth + (centerY - radius)) / 2]
            )
            .quadraticeBezier(
              [centerX + radius, centerY - wideFactor * crossWidth],
              [(centerX + radius + centerX + crossWidth) / 2, centerY - crossWidth]
            )
            .goTo([centerX + radius, centerY + wideFactor * crossWidth])
            .quadraticeBezier(
              [centerX + crossWidth, centerY + crossWidth],
              [(centerX + radius + centerX + crossWidth) / 2, centerY + crossWidth]
            )
            .quadraticeBezier(
              [centerX + wideFactor * crossWidth, centerY + radius],
              [centerX + crossWidth, (centerY + radius + centerY + crossWidth) / 2]
            )
            .goTo([centerX - wideFactor * crossWidth, centerY + radius])
            .quadraticeBezier(
              [centerX - crossWidth, centerY + crossWidth],
              [centerX - crossWidth, (centerY + radius + centerY + crossWidth) / 2]
            )
            .quadraticeBezier(
              [centerX - radius, centerY + wideFactor * crossWidth],
              [(centerX - radius + centerX - crossWidth) / 2, centerY + crossWidth]
            )
            .goTo([centerX - radius, centerY - wideFactor * crossWidth])
            .quadraticeBezier(
              [centerX - crossWidth, centerY - crossWidth],
              [(centerX - radius + centerX - crossWidth) / 2, centerY - crossWidth]
            );

          return <PathFromBuilder key={i} pathBuilder={pathBuilder} fill={fill} stroke={stroke} />;
        } else {
          return cannotHappen(charge.limbs);
        }
      })}
    </>
  );
};
