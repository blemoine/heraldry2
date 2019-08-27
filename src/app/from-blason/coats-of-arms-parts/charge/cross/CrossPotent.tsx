import { SvgPathBuilder } from '../../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../../common/PathFromBuilder';
import * as React from 'react';
import { flatMap, Result, isError } from '../../../../../utils/result';

type Props = {
  fill: string;
  stroke: string;
  center: readonly [number, number];
  crossWidth: number;
  crossRadius: number;
};
export const CrossPotent = ({ fill, stroke, center, crossWidth, crossRadius }: Props) => {
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

  const maybePathBuilder = [
    topLimb.rotate([centerX, centerY], 90),
    topLimb.rotate([centerX, centerY], 180),
    topLimb.rotate([centerX, centerY], 270),
  ].reduce((maybeAcc: Result<SvgPathBuilder>, limb): Result<SvgPathBuilder> => {
    return flatMap(maybeAcc, (acc) => acc.concat(limb));
  }, topLimb);

  if (isError(maybePathBuilder)) {
    throw new Error(maybePathBuilder.error.join('\n'));
  } else {
    return <PathFromBuilder pathBuilder={maybePathBuilder} fill={fill} stroke={stroke} />;
  }
};
