import * as React from 'react';
import { SvgPathBuilder } from '../svg-path-builder/svg-path-builder';
import { CSSProperties, useState } from 'react';

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

export const FocusablePathFromBuilder = (props: Props) => {
  const baseStrokeWidth = props.strokeWidth || 1;
  const [strokeWidth, setStrokeWidth] = useState(baseStrokeWidth);

  const onMouseDown = () => {
    setStrokeWidth(baseStrokeWidth + 2);
    if (props.onMouseDown) {
      props.onMouseDown();
    }
  };

  const onMouseUp = () => {
    setStrokeWidth(baseStrokeWidth);
    if (props.onMouseUp) {
      props.onMouseUp();
    }
  };
  const style = { ...props.style, cursor: 'pointer' };

  return (
    <PathFromBuilder
      pathBuilder={props.pathBuilder}
      fill={props.fill}
      stroke={props.stroke}
      strokeWidth={strokeWidth}
      fillRule={props.fillRule}
      onClick={props.onClick}
      style={style}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};
