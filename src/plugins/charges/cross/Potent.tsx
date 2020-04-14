import { SvgPathBuilder } from '~/app/svg-path-builder/svg-path-builder';
import * as React from 'react';
import { FromLimb } from './FromLimb';

type Props = {
  fill: string;
  stroke: string;
  center: readonly [number, number];
  crossWidth: number;
  crossRadius: number;
  onClick: () => void;
};
export const Potent = ({ fill, stroke, center, crossWidth, crossRadius, onClick }: Props) => {
  const [centerX, centerY] = center;

  const wideFactor = 6;
  const topLimb = SvgPathBuilder.start([centerX - crossWidth, centerY - crossWidth])
    .goTo([centerX - crossWidth, centerY - crossRadius + 2 * crossWidth])
    .goTo([centerX - wideFactor * crossWidth, centerY - crossRadius + 2 * crossWidth])
    .goTo([centerX - wideFactor * crossWidth, centerY - crossRadius])
    .goTo([centerX + wideFactor * crossWidth, centerY - crossRadius])
    .goTo([centerX + wideFactor * crossWidth, centerY - crossRadius + 2 * crossWidth])
    .goTo([centerX + crossWidth, centerY - crossRadius + 2 * crossWidth])
    .goTo([centerX + crossWidth, centerY - crossWidth]);

  return <FromLimb topLimb={topLimb} center={center} fill={fill} stroke={stroke} onClick={onClick} />;
};
