import * as React from 'react';
import { range } from '../../../../utils/range';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension };
export const LozengyBendwiseDisplay: React.FunctionComponent<Props> = ({ dimension: { width, height }, fill }) => {
  const number = 6;
  const numberH = 8;
  const skew = 0.3;
  const outsideSpaces = 3;
  const lozengeHeight = height / numberH;
  const lozengeWidth = width / number;
  return (
    <>
      {range(0, number + outsideSpaces).map((i) => {
        return range(0, numberH + outsideSpaces).map((j) => {
          const startX = (width * (i - outsideSpaces)) / number;
          const startY = (height * (j - outsideSpaces)) / numberH + i * skew * lozengeHeight;

          const pathBuilder = SvgPathBuilder.start([startX, startY])
            .goTo([startX + lozengeWidth, startY + skew * lozengeHeight])
            .goTo([startX + lozengeWidth, startY + (1 + skew) * lozengeHeight])
            .goTo([startX, startY + (1 + skew) * lozengeHeight])
            .close();

          return <PathFromBuilder key={i + '#' + j} pathBuilder={pathBuilder} fill={fill[(i + j) % 2]} stroke="#333" />;
        });
      })}
    </>
  );
};
