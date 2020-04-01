import React, { useState } from 'react';
import { Dimension } from '../../../../model/dimension';

const SvgCrownDovetailed = (props: { dimension: Dimension; stroke: string; mainFill: string; onClick: () => void }) => {
  const [strokeWidth, setStrokeWidth] = useState(1);
  const onMouseDown = () => setStrokeWidth(1 + 2);
  const onMouseUp = () => setStrokeWidth(1);

  const onClick = props.onClick;
  return (
    <svg viewBox="0 0 105.9 37.5051" width={props.dimension.width} height={props.dimension.height}>
      <g stroke={props.stroke} strokeLinecap="round" strokeLinejoin="round" transform="translate(1.2,-1.2)">
        <g transform="translate(0,-5.625)">
          <path
            d="M89.38 37.51 L91.08 37.51 A306.668 529.699 0 0 1 103.5 8.03 L84.76 8.03 L87.62 24.28 L70.57 24.28 L73.44         8.03 L57.41 8.03 L60.28 24.28 L43.22 24.28 L46.09 8.03 L29.18 8.03 L32.05 24.28 L15 24.28 L17.86 8.03         L0 8.03 L12.41 37.51 L14.12 37.51 a0.392049 0.392049 0 0 1 -0.00757792 -0.0767068 a0.392049 0.392049         0 0 1 0.392045 -0.392045 L88.99 37.04 a0.392049 0.392049 0 0 1 0.392045 0.392045 a0.392049 0.392049         0 0 1 -0.00757792 0.0767068 Z"
            fill={props.mainFill}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            strokeWidth={strokeWidth}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
          />
        </g>
        <g transform="translate(9.63281,-2.84217E-014)">
          <path
            d="M2.25 37.51 L81.98 37.51 A3.23098 3.23098 -180 0 0 81.98 31.32 L2.25 31.32 A3.25195 3.25195 -180 0 0 2.25         37.51 Z"
            fill={props.mainFill}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            strokeWidth={strokeWidth}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
          />
        </g>
      </g>
    </svg>
  );
};

export default SvgCrownDovetailed;
