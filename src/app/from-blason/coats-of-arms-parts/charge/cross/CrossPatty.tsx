import { SvgPathBuilder } from '../../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../../common/PathFromBuilder';
import * as React from 'react';

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
  const pathBuilder = SvgPathBuilder.start([centerX - crossWidth, centerY - crossWidth])
    .quadraticeBezier(
      [centerX - wideFactor * crossWidth, centerY - crossRadius],
      [centerX - crossWidth, (centerY - crossWidth + (centerY - crossRadius)) / 2]
    )
    .goTo([centerX + wideFactor * crossWidth, centerY - crossRadius])
    .quadraticeBezier(
      [centerX + crossWidth, centerY - crossWidth],
      [centerX + crossWidth, (centerY - crossWidth + (centerY - crossRadius)) / 2]
    )
    .quadraticeBezier(
      [centerX + crossRadius, centerY - wideFactor * crossWidth],
      [(centerX + crossRadius + centerX + crossWidth) / 2, centerY - crossWidth]
    )
    .goTo([centerX + crossRadius, centerY + wideFactor * crossWidth])
    .quadraticeBezier(
      [centerX + crossWidth, centerY + crossWidth],
      [(centerX + crossRadius + centerX + crossWidth) / 2, centerY + crossWidth]
    )
    .quadraticeBezier(
      [centerX + wideFactor * crossWidth, centerY + crossRadius],
      [centerX + crossWidth, (centerY + crossRadius + centerY + crossWidth) / 2]
    )
    .goTo([centerX - wideFactor * crossWidth, centerY + crossRadius])
    .quadraticeBezier(
      [centerX - crossWidth, centerY + crossWidth],
      [centerX - crossWidth, (centerY + crossRadius + centerY + crossWidth) / 2]
    )
    .quadraticeBezier(
      [centerX - crossRadius, centerY + wideFactor * crossWidth],
      [(centerX - crossRadius + centerX - crossWidth) / 2, centerY + crossWidth]
    )
    .goTo([centerX - crossRadius, centerY - wideFactor * crossWidth])
    .quadraticeBezier(
      [centerX - crossWidth, centerY - crossWidth],
      [(centerX - crossRadius + centerX - crossWidth) / 2, centerY - crossWidth]
    );

  return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke={stroke} />;
};
