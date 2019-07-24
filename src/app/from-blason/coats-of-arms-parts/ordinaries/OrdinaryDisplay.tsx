import * as React from 'react';
import { Ordinary } from '../../../model/ordinary';
import { cannotHappen } from '../../../../utils/cannot-happen';
import { Dimension } from '../../../model/dimension';

type Props = { ordinary: Ordinary['name']; fill: string; dimension: Dimension };

export const OrdinaryDisplay = ({ ordinary, fill, dimension: { width, height } }: Props) => {
  if (ordinary === 'chief') {
    const chiefHeight = height / 5;
    return <rect x={0} y={0} width={width} height={chiefHeight} fill={fill} stroke="#333" />;
  } else if (ordinary === 'fess') {
    return <rect x={0} y={height / 3} width={width} height={height / 3} fill={fill} stroke="#333" />;
  } else if (ordinary === 'bend') {
    const basePoint = height / (8 * Math.sqrt(2));
    const length = Math.sqrt(width ** 2 + height ** 2);
    return (
      <path
        d={`M${basePoint} ${-basePoint} L${-basePoint} ${basePoint} L${length - basePoint} ${length +
          basePoint} L${length + basePoint} ${length - basePoint} Z`}
        fill={fill}
        stroke="#333"
      />
    );
  } else if (ordinary === 'pale') {
    return <rect x={width / 3} y={0} width={width / 3} height={height} fill={fill} stroke="#333" />;
  } else if (ordinary === 'cross') {
    return (
      <path
        d={`M ${(2 * width) / 5} 0 H ${(3 * width) / 5} V ${(2 * height) / 5} H ${width} V ${(3 * height) / 5} H ${(3 *
          width) /
          5} V ${height} H ${(2 * width) / 5} V ${(3 * height) / 5} H 0 V ${(2 * height) / 5} H ${(2 * width) / 5} Z`}
        fill={fill}
        stroke="#333"
      />
    );
  } else if (ordinary === 'saltire') {
    const basePointW = width / (10 * Math.sqrt(2));
    const basePointH = height / (10 * Math.sqrt(2));

    const w = width / 2;
    const h = height / 2;
    return (
      <g>
        <path
          d={`M${w} ${h - basePointH} L ${2 * w} ${-basePointH} L ${2 * w + basePointW} ${h -
            (w * basePointH) / basePointW} L${w + basePointW} ${h} L ${2 * w + basePointW} ${h +
            (w * basePointH) / basePointW} L ${2 * w} ${2 * h + basePointH} L${w} ${h + basePointH} L ${(h *
            basePointW) /
            basePointH -
            w} ${2 * h + basePointH} L ${-basePointW} ${h + (w * basePointH) / basePointW} L ${w -
            basePointW} ${h} L ${-basePointW} ${h - (w * basePointH) / basePointW} L ${(h * basePointW) / basePointH -
            w} ${-basePointH} Z`}
          fill={fill}
          stroke="#333"
        />
        <circle cx={2 * w} cy={2 * h - basePointH} r={5} />
      </g>
    );
  } else if (ordinary === 'chevron') {
    const basePoint = height / 5;

    return (
      <path
        d={`M${width / 2} ${height / 3} L0 ${height / 3 + width / 2} L0 ${height / 3 + width / 2 - basePoint} L${width /
          2} ${height / 3 - basePoint} L${width} ${height / 3 + width / 2 - basePoint} L${width}  ${height / 3 +
          width / 2} Z`}
        fill={fill}
        stroke="#333"
      />
    );
  } else {
    return cannotHappen(ordinary);
  }
};
