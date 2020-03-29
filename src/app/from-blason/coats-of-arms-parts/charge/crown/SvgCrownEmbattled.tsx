import React, { useState } from 'react';
import { Dimension } from '../../../../model/dimension';

const SvgCrownEmbattled = (props: { dimension: Dimension; stroke: string; mainFill: string; onClick: () => void }) => {
  const [strokeWidth, setStrokeWidth] = useState(1);
  const onMouseDown = () => setStrokeWidth(1 + 2);
  const onMouseUp = () => setStrokeWidth(1);

  const onClick = props.onClick;
  return (
    <svg viewBox="0 0 433.579 214.186" width={props.dimension.width} height={props.dimension.height}>
      <g stroke={props.stroke} strokeLinecap="round" strokeLinejoin="round" transform="translate(2.16,-2.16)">
        <g transform="translate(0,-2.8125)">
          <path
            d="M381.68 67.14 A757.377 858.622 -180 0 0 354.02 60.66 L364.41 22.09 A757.377 757.377 -180 0 0 292.09 11.1         L287.38 49.97 A757.377 858.622 -180 0 0 248.84 46.87 L251.61 8.04 A757.377 757.377 -180 0 0 178.77 7.98         L181.54 46.82 A757.377 858.622 -180 0 0 142.99 49.85 L138.28 10.99 A757.377 757.377 -180 0 0 65.91 21.88         L76.31 60.44 A757.377 858.622 -180 0 0 47.58 67.14 L32.94 29.25 A757.377 757.377 -180 0 0 0 38.18 L16.67         75.85 L32.01 110.49 A189.562 83.25 -180 0 0 31.82 110.82 L50.3 151.81 L63.47 181.56 L64.52 181.12 A189.562         83.25 -180 0 0 366.99 181.13 L398.15 108.43 A11.8297 5.19525 -119.07 0 0 398.21 108.34 L412.59 75.85         L429.26 38.18 A757.377 757.377 -180 0 0 396.32 29.25 L381.68 67.14 Z"
            fill={props.mainFill}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            strokeWidth={strokeWidth}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
          />
        </g>
        <g transform="translate(63.3169,0)">
          <path
            d="M0 180.44 A151.875 33.75 0 0 1 303.75 180.44 A151.875 33.75 0 1 1 0 180.44 Z"
            fill={props.mainFill}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            strokeWidth={strokeWidth}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
          />
          <g transform="translate(15.1875,-13.5)">
            <path
              d="M0 193.94 A136.688 20.25 0 0 1 273.37 193.94 A136.688 20.25 0 1 1 0 193.94 Z"
              fill="black"
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              strokeWidth={strokeWidth}
              onClick={onClick}
              style={{ cursor: 'pointer' }}
            />
          </g>
        </g>
        <g transform="translate(31.5197,-77.6472)">
          <path
            d="M12.73 213.65 A461.488 461.488 179.89 0 1 354.11 213.36 A8.95725 8.95725 -180 0 0 360.72 196.71 A461.145         461.145 -0.05 0 0 5.13 196.15 A9.55999 9.55999 -180 0 0 12.73 213.65 Z"
            fill={props.mainFill}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            strokeWidth={strokeWidth}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
          />
        </g>
        <g transform="translate(58.2544,-25.5938)">
          <path
            d="M10.93 213.65 A562.192 482.593 90 0 1 303.97 213.36 A7.68901 8.95725 -180 0 0 309.65 196.71 A551.154 473.117         -90 0 0 4.41 196.15 A8.20641 9.55999 -180 0 0 10.93 213.65 Z"
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

export default SvgCrownEmbattled;
