import * as React from 'react';
import { SvgPathBuilder } from '../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../common/PathFromBuilder';
import { Dimension } from '../../model/dimension';

type Props = { dimension: Dimension; fill: string; potent: string };
export const PotentDisplay = ({ fill, potent, dimension: { width, height } }: Props) => {
  const pathBuilder = SvgPathBuilder.start([0, 0])
    .goTo([width, 0])
    .goTo([width, height / 2])
    .goTo([(2 * width) / 3, height / 2])
    .goTo([(2 * width) / 3, height])
    .goTo([width / 3, height])
    .goTo([width / 3, height / 2])
    .goTo([0, height / 2])
    .close();

  return (
    <>
      <rect width="100%" height="100%" fill={fill} />
      <PathFromBuilder pathBuilder={pathBuilder} fill={potent} stroke="transparent" />
    </>
  );
};
