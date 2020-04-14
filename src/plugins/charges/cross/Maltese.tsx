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
export const Maltese = ({ fill, stroke, center, crossWidth, crossRadius, onClick }: Props) => {
  const [centerX, centerY] = center;
  const wideFactor = 6;
  const depthFactor = 4;

  const topLimb = SvgPathBuilder.start([centerX - crossWidth, centerY - crossWidth])
    .goTo([centerX - wideFactor * crossWidth, centerY - crossRadius])
    .goTo([centerX, centerY - crossRadius + depthFactor * crossWidth])
    .goTo([centerX + wideFactor * crossWidth, centerY - crossRadius])
    .goTo([centerX + crossWidth, centerY - crossWidth]);

  return <FromLimb topLimb={topLimb} center={center} fill={fill} stroke={stroke} onClick={onClick} />;
};
