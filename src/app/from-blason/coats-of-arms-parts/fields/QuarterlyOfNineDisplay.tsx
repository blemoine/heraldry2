import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension };
export const QuarterlyOfNineDisplay: React.FunctionComponent<Props> = ({ dimension, fill }) => {
  const { width, height } = dimension;

  const squareHeight = height / 3;
  const squareWidth = width / 3;
  const square = SvgPathBuilder.rectangle([0, 0], { width: squareWidth, height: squareHeight });

  // Usefull in quarterly to display properly the bottom of left/right cut
  const lastLineSquare = square.scale([0, 0], 1, 2);
  return (
    <>
      <PathFromBuilder pathBuilder={square} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={square.translate([squareWidth, 0])} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={square.translate([2 * squareWidth, 0])} fill={fill[0]} stroke="#333" />

      <PathFromBuilder pathBuilder={square.translate([0, squareHeight])} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={square.translate([squareWidth, squareHeight])} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={square.translate([2 * squareWidth, squareHeight])} fill={fill[1]} stroke="#333" />

      <PathFromBuilder pathBuilder={lastLineSquare.translate([0, 2 * squareHeight])} fill={fill[0]} stroke="#333" />
      <PathFromBuilder
        pathBuilder={lastLineSquare.translate([squareWidth, 2 * squareHeight])}
        fill={fill[1]}
        stroke="#333"
      />
      <PathFromBuilder
        pathBuilder={lastLineSquare.translate([2 * squareWidth, 2 * squareHeight])}
        fill={fill[0]}
        stroke="#333"
      />
    </>
  );
};
