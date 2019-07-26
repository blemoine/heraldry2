import * as React from 'react';
import { SvgPathBuilder } from '../svg-path-builder/svg-path-builder';

type Props = { pathBuilder: SvgPathBuilder; fill: string; stroke: string };
export const PathFromBuilder = ({ pathBuilder, fill, stroke }: Props) => {
  return <path d={pathBuilder.toPathAttribute()} fill={fill} stroke={stroke} />;
};
