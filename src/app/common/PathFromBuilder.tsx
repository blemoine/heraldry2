import * as React from 'react';
import { SvgPathBuilder } from '../svg-path-builder/svg-path-builder';
import { CSSProperties } from 'react';

type Props = {
  pathBuilder: SvgPathBuilder;
  fill: string;
  stroke: string;
  strokeWidth?: number;
  onClick?: () => void;
  fillRule?: 'evenodd' | 'nonzero';
  style?: CSSProperties;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
};
export const PathFromBuilder = ({
  pathBuilder,
  fill,
  stroke,
  fillRule,
  onClick,
  style,
  strokeWidth,
  onMouseDown,
  onMouseUp,
}: Props) => {
  const props = {
    d: pathBuilder.toPathAttribute(),
    fill,
    stroke,
    ...(fillRule ? { fillRule } : {}),
    ...(onClick ? { onClick } : {}),
    ...(style ? { style } : {}),
    ...(strokeWidth ? { strokeWidth } : {}),
    ...(onMouseDown ? { onMouseDown } : {}),
    ...(onMouseUp ? { onMouseUp } : {}),
  };

  return <path {...props} />;
};
