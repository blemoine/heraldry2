import * as React from 'react';
import { Ordinary } from '../../../model/blason';
import { cannotHappen } from '../../../../utils/cannot-happen';

type Props = { ordinary: Ordinary['name']; fill: string; width: number; height: number; clipPath: string };

export const OrdinaryDisplay = ({ ordinary, fill, width, height, clipPath }: Props) => {
  if (ordinary === 'chief') {
    const chiefHeight = height / 5;
    return (
      <g>
        <rect x={0} y={0} width={width} height={chiefHeight} fill={fill} />
        <path d={`M0 ${chiefHeight} L0 0 L${width} 0 L${width} ${chiefHeight}`} stroke="#333" fill="transparent" />
      </g>
    );
  } else if (ordinary === 'fess') {
    return (
      <g>
        <rect x={0} y={height / 3} width={width} height={height / 3} fill={fill} clipPath={clipPath} />
      </g>
    );
  } else if (ordinary === 'bend') {
    return <></>;
  } else if (ordinary === 'pale') {
    return <></>;
  } else if (ordinary === 'cross') {
    return <></>;
  } else if (ordinary === 'chevron') {
    return <></>;
  } else if (ordinary === 'saltire') {
    return <></>;
  } else {
    return cannotHappen(ordinary);
  }
};
