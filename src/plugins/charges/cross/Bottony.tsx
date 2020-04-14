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
export const Bottony = ({ fill, stroke, center, crossWidth, crossRadius, onClick }: Props) => {
  const computeCrossRadius = 0.77 * crossRadius;
  const [centerX, centerY] = center;

  const radius = 1.4 * crossWidth;
  const topLimb = SvgPathBuilder.start([centerX - crossWidth, centerY - crossWidth])
    .goTo([centerX - crossWidth, centerY - computeCrossRadius + crossWidth])
    .arcTo([centerX - crossWidth, centerY - computeCrossRadius], { radius: radius, largeArc: 1, sweep: 1 })
    .arcTo([centerX + crossWidth, centerY - computeCrossRadius], { radius: radius, largeArc: 1, sweep: 1 })
    .arcTo([centerX + crossWidth, centerY - computeCrossRadius + crossWidth], { radius: radius, largeArc: 1, sweep: 1 })
    .goTo([centerX + crossWidth, centerY - crossWidth]);

  return <FromLimb topLimb={topLimb} center={center} fill={fill} stroke={stroke} onClick={onClick} />;
};
