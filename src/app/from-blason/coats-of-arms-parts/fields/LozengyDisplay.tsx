import * as React from 'react';
import { range } from '../../../../utils/range';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension };
export const LozengyDisplay: React.FunctionComponent<Props> = ({ dimension: { width, height }, fill }) => {
  const number = 6;
  const radiusX = width / (2 * number);
  const radiusY = height / (2 * number);
  return (
    <>
      {range(0, number + 1).map((i) => {
        return range(0, number + 1).map((j) => {
          const pathBuilder = SvgPathBuilder.start([(width * i) / number - radiusX, (height * j) / number])
            .goTo([(width * i) / number, (height * j) / number - radiusY])
            .goTo([(width * i) / number + radiusX, (height * j) / number])
            .goTo([(width * i) / number, (height * j) / number + radiusY])
            .close();

          return <PathFromBuilder key={i + '#' + j} pathBuilder={pathBuilder} fill={fill[0]} stroke="#333" />;
        });
      })}
      {range(0, number + 1).map((i) => {
        return range(0, number + 1).map((j) => {
          const pathBuilder = SvgPathBuilder.start([
            (width * i) / number - radiusX + radiusX,
            (height * j) / number + radiusY,
          ])
            .goTo([(width * i) / number + radiusX, (height * j) / number - radiusY + radiusY])
            .goTo([(width * i) / number + radiusX + radiusX, (height * j) / number + radiusY])
            .goTo([(width * i) / number + radiusX, (height * j) / number + radiusY + radiusY])
            .close();

          return <PathFromBuilder key={i + '#' + j} pathBuilder={pathBuilder} fill={fill[1]} stroke="#333" />;
        });
      })}
    </>
  );
};
