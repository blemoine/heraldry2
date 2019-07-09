import * as React from 'react';
import { Ordinary } from '../../../model/blason';
import { cannotHappen } from '../../../../utils/cannot-happen';

type Props = { ordinary: Ordinary['name']; fill: string; width: number; height: number };

export const OrdinaryDisplay = ({ ordinary, fill, width, height }: Props) => {
  if (ordinary === 'chief') {
    const chiefHeight = height / 5;
    return <rect x={0} y={0} width={width} height={chiefHeight} fill={fill} stroke="#333" />;
  } else if (ordinary === 'fess') {
    return <rect x={0} y={height / 3} width={width} height={height / 3} fill={fill} stroke="#333" />;
  } else if (ordinary === 'bend') {
    const basePoint = height / (8 * Math.sqrt(2));
    const length = Math.sqrt(width ** 2 + height ** 2);
    return (
      <g>
        <path
          d={`M${basePoint} ${-basePoint} L${-basePoint} ${basePoint} L${length - basePoint} ${length +
            basePoint} L${length + basePoint} ${length - basePoint} Z`}
          fill={fill}
          stroke="#333"
        />
        <path d={`M0 ${basePoint * 2} L0 0 L${basePoint * 2} 0`} stroke="#333" fill="transparent" />
      </g>
    );
  } else if (ordinary === 'pale') {
    return <rect x={width / 3} y={0} width={width / 3} height={height} fill={fill} stroke="#333" />;
  } else if (ordinary === 'cross') {
    return (
      <g>
        <rect x={(2 * width) / 5} y={0} width={width / 5} height={height} fill={fill} />
        <rect x={0} y={(2 * height) / 5} width={width} height={height / 5} fill={fill} />
        <path d={`M${width / 3} 0 L${(2 * width) / 3} 0`} stroke="#333" fill="transparent" />
      </g>
    );
  } else if (ordinary === 'saltire') {
    const basePoint = height / (10 * Math.sqrt(2));
    const length = Math.sqrt(width ** 2 + height ** 2);
    return (
      <g>
        <path
          d={`M${basePoint} ${-basePoint} L${-basePoint} ${basePoint} L${length - basePoint} ${length +
            basePoint} L${length + basePoint} ${length - basePoint} Z`}
          fill={fill}
        />
        <path
          d={`M${width - basePoint} ${-basePoint} L${width + basePoint} ${basePoint} L${width -
            length +
            basePoint} ${length + basePoint} L${width - length - basePoint} ${length - basePoint} Z`}
          fill={fill}
        />
        <path d={`M0 ${basePoint * 2} L0 0 L${width} 0 L${width} ${basePoint * 2}`} stroke="#333" fill="transparent" />
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
