import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { range } from '../../../../utils/range';
import { toRadians } from '../../../svg-path-builder/geometrical.helper';

type Props = { fill: [string, string]; dimension: Dimension; number: number };
export const GironnyDisplay = ({ dimension, fill, number }: Props) => {
  const { width, height } = dimension;

  const center = [width / 2, height / 2] as const;

  const angleBetweenPart = 360 / number;

  const basePath = SvgPathBuilder.start([width / 2, 0])
    .horizontalMove((height / 2) * Math.tan(toRadians(angleBetweenPart)))
    .goTo(center)
    .close()
    .scale(center, 2, 2);

  return (
    <>
      <rect x={0} y={0} width={width} height={height} fill={fill[0]} />

      {range(0, number / 2).map((i) => {
        const angleInDegree = i * 2 * angleBetweenPart - (number % 4 === 0 ? 0 : -angleBetweenPart / 2);

        const pathBuilder = basePath.rotate(center, angleInDegree);
        return <PathFromBuilder key={i} pathBuilder={pathBuilder} fill={fill[1]} stroke="#333" />;
      })}
    </>
  );
};
