import { SvgPathBuilder } from '../../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../../common/PathFromBuilder';
import * as React from 'react';
import { combine, isError } from '../../../../../utils/result';

type Props = {
  fill: string;
  stroke: string;
  center: readonly [number, number];
  crossWidth: number;
  crossRadius: number;
};
export const CrossPatty = ({ fill, stroke, center, crossWidth, crossRadius }: Props) => {
  const [centerX, centerY] = center;

  const wideFactor = 6;
  const topLimb = SvgPathBuilder.start([centerX - crossWidth, centerY - crossWidth])
    .quadraticeBezier(
      [centerX - wideFactor * crossWidth, centerY - crossRadius],
      [centerX - crossWidth, (centerY - crossWidth + (centerY - crossRadius)) / 2]
    )
    .goTo([centerX + wideFactor * crossWidth, centerY - crossRadius])
    .quadraticeBezier(
      [centerX + crossWidth, centerY - crossWidth],
      [centerX + crossWidth, (centerY - crossWidth + (centerY - crossRadius)) / 2]
    );

  const maybePathBuilder = combine(
    [
      topLimb,
      topLimb.rotate([centerX, centerY], 90),
      topLimb.rotate([centerX, centerY], 180),
      topLimb.rotate([centerX, centerY], 270),
    ],
    (a, b) => a.concat(b)
  );

  if (isError(maybePathBuilder)) {
    throw new Error(maybePathBuilder.error.join('\n'));
  } else {
    return <PathFromBuilder pathBuilder={maybePathBuilder} fill={fill} stroke={stroke} />;
  }
};
