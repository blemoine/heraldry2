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
export const CrossHummetty = ({ fill, stroke, center, crossWidth, crossRadius, onClick }: Props) => {
  const [centerX, centerY] = center;

  const topLimb = SvgPathBuilder.start([centerX - crossWidth, centerY - crossWidth])
    .goTo([centerX - crossWidth, centerY - crossRadius])
    .goTo([centerX + crossWidth, centerY - crossRadius])
    .goTo([centerX + crossWidth, centerY - crossWidth]);

  return <CrossFromLimb topLimb={topLimb} center={center} fill={fill} stroke={stroke} onClick={onClick} />;
};
