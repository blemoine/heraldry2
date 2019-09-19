import * as React from 'react';
import { SvgPathBuilder } from '../svg-path-builder/svg-path-builder';
import { CSSProperties } from 'react';

type Props = {
  pathBuilder: SvgPathBuilder;
  fill: string;
  stroke: string;
  onClick?: () => void;
  fillRule?: 'evenodd' | 'nonzero';
  style?: CSSProperties;
};
export const PathFromBuilder = ({ pathBuilder, fill, stroke, fillRule, onClick, style }: Props) => {
  const props = {
    d: pathBuilder.toPathAttribute(),
    fill,
    stroke,
    ...(fillRule ? { fillRule } : {}),
    ...(onClick ? { onClick } : {}),
    ...(style ? { style } : {}),
  };

  return <path {...props} />;
};
