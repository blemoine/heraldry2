import * as React from 'react';
import { SvgPathBuilder } from '../svg-path-builder/svg-path-builder';

type Props = { pathBuilder: SvgPathBuilder; fill: string; stroke: string; fillRule?: 'evenodd' | 'nonzero' };
export const PathFromBuilder = ({ pathBuilder, fill, stroke, fillRule }: Props) => {
  const props = {
    d: pathBuilder.toPathAttribute(),
    fill,
    stroke,
    ...(fillRule ? { fillRule } : {}),
  };

  return <path {...props} />;
};
