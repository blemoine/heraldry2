import { SvgPathBuilder } from '../../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../../common/PathFromBuilder';
import * as React from 'react';

type Props = { fill: string; stroke: string; center: readonly [number, number]; crossWidth: number; crossRadius: number };
export const CrossHummetty = ({ fill, stroke, center, crossWidth, crossRadius }: Props) => {
  const [centerX, centerY] = center;

  const pathBuilder = SvgPathBuilder.start([centerX - crossWidth, centerY - crossWidth])
    .goTo([centerX - crossWidth, centerY - crossRadius])
    .goTo([centerX + crossWidth, centerY - crossRadius])
    .goTo([centerX + crossWidth, centerY - crossWidth])
    .goTo([centerX + crossRadius, centerY - crossWidth])
    .goTo([centerX + crossRadius, centerY + crossWidth])
    .goTo([centerX + crossWidth, centerY + crossWidth])
    .goTo([centerX + crossWidth, centerY + crossRadius])
    .goTo([centerX - crossWidth, centerY + crossRadius])
    .goTo([centerX - crossWidth, centerY + crossWidth])
    .goTo([centerX - crossRadius, centerY + crossWidth])
    .goTo([centerX - crossRadius, centerY - crossWidth])
    .close();

  return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke={stroke} />;
};
