import { SvgPathBuilder } from '../../../../svg-path-builder/svg-path-builder';
import * as React from 'react';
import { CrossFromLimb } from './CrossFromLimb';

type Props = {
  fill: string;
  stroke: string;
  center: readonly [number, number];
  crossWidth: number;
  crossRadius: number;
  onClick: () => void;
};
export const CrossPatty = ({ fill, stroke, center, crossWidth, crossRadius, onClick }: Props) => {
  const [centerX, centerY] = center;

  const wideFactor = 6;
  const topLimb = SvgPathBuilder.start([centerX - crossWidth, centerY - crossWidth])
    .quadraticBezier(
      [centerX - wideFactor * crossWidth, centerY - crossRadius],
      [centerX - crossWidth, (centerY - crossWidth + (centerY - crossRadius)) / 2]
    )
    .goTo([centerX + wideFactor * crossWidth, centerY - crossRadius])
    .quadraticBezier(
      [centerX + crossWidth, centerY - crossWidth],
      [centerX + crossWidth, (centerY - crossWidth + (centerY - crossRadius)) / 2]
    );

  return <CrossFromLimb topLimb={topLimb} center={center} fill={fill} stroke={stroke} onClick={onClick} />;
};
