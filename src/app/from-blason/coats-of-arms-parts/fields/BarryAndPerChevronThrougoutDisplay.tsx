import * as React from 'react';
import { range } from '../../../../utils/range';
import { Dimension } from '../../../model/dimension';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';

type Props = { fill: [string, string]; dimension: Dimension; rows: number };
export const BarryAndPerChevronThrougoutDisplay: React.FunctionComponent<Props> = ({
  dimension: { width, height },
  fill,
  rows,
}) => {
  const chevronPathBuilder = SvgPathBuilder.start([width / 2, 0])
    .goTo([width, height])
    .goTo([0, height])
    .close();
  return (
    <>
      {range(0, rows).map((j) => (
        <rect
          key={j}
          x={0}
          y={(height * j) / rows}
          height={height / rows}
          width={width}
          fill={fill[j % 2]}
          stroke="#333"
        />
      ))}
      <clipPath id="chevron-throughout-clip-path" clipPathUnits="userSpaceOnUse">
        <PathFromBuilder pathBuilder={chevronPathBuilder} fill="blue" stroke="#333" />
      </clipPath>

      <g clipPath="url(#chevron-throughout-clip-path)">
        {range(0, rows).map((j) => (
          <rect
            key={j}
            x={0}
            y={(height * j) / rows}
            height={height / rows}
            width={width}
            fill={fill[(j + 1) % 2]}
            stroke="#333"
          />
        ))}
      </g>
    </>
  );
};
