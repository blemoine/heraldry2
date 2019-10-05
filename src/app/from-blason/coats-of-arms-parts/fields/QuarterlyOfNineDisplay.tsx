import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension };
export const QuarterlyOfNineDisplay: React.FunctionComponent<Props> = ({ dimension, fill }) => {
  const { width, height } = dimension;

  const squareHeight = height / 3;
  const square = SvgPathBuilder.start([0, 0])
    .goTo([width / 3, 0])
    .goTo([width / 3, squareHeight])
    .goTo([0, squareHeight])
    .goTo([0, 0]);

  // Usefull in quarterly to display properly the bottom of left/right cut
  const lastLineSquare = square.scale([0, 0], 1, 2);
  return (
    <>
      <PathFromBuilder pathBuilder={square} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={square.translate([width / 3, 0])} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={square.translate([(2 * width) / 3, 0])} fill={fill[0]} stroke="#333" />

      <PathFromBuilder pathBuilder={square.translate([0, squareHeight])} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={square.translate([width / 3, squareHeight])} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={square.translate([(2 * width) / 3, squareHeight])} fill={fill[1]} stroke="#333" />

      <PathFromBuilder pathBuilder={lastLineSquare.translate([0, 2 * squareHeight])} fill={fill[0]} stroke="#333" />
      <PathFromBuilder
        pathBuilder={lastLineSquare.translate([width / 3, 2 * squareHeight])}
        fill={fill[1]}
        stroke="#333"
      />
      <PathFromBuilder
        pathBuilder={lastLineSquare.translate([(2 * width) / 3, 2 * squareHeight])}
        fill={fill[0]}
        stroke="#333"
      />
    </>
  );
};
