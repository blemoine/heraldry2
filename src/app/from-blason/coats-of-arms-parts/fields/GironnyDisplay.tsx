import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { range } from '../../../../utils/range';
import { toRadians } from '../../../svg-path-builder/geometrical.helper';

type Props = { fill: [string, string]; dimension: Dimension; number: number };
export const GironnyDisplay = (props: Props) => {
  const { dimension, fill } = props;
  const height = dimension.height;
  const width = dimension.width;

  const center = [width / 2, height / 2] as const;

  const angleBetweenPart = 360 / props.number;

  const basePath = SvgPathBuilder.start([width / 2, 0])
    .horizontalMove((width / 2) * Math.tan(toRadians(angleBetweenPart)))
    .goTo(center)
    .close();

  return (
    <>
      <rect x={0} y={0} width={width} height={height} fill={fill[0]} />

      {range(0, props.number / 2).map((i) => {
        const angleInDegree = i * 2 * angleBetweenPart;

        let pathBuilder: SvgPathBuilder;
        if ((angleInDegree >= 90 && angleInDegree < 180) || angleInDegree >= 270) {
          pathBuilder = basePath.scale([width / 2, height / 2], (2 * height) / width, (2 * width) / height);
        } else {
          pathBuilder = basePath.scale([width / 2, height / 2], 2, 2);
        }

        return (
          <PathFromBuilder
            key={i}
            pathBuilder={pathBuilder.rotate(center, angleInDegree)}
            fill={fill[1]}
            stroke="#333"
          />
        );
      })}
    </>
  );
};
