import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension };
export const ChevronnyReversedDisplay = (props: Props) => {
  const { dimension, fill } = props;
  const height = dimension.height;
  const width = dimension.width;

  const bendWidth = height / 6;

  const path1 = SvgPathBuilder.start([width / 2, 0])
    .goTo([width, bendWidth])
    .goTo([width, bendWidth + bendWidth])
    .goTo([width / 2, bendWidth])
    .goTo([0, bendWidth + bendWidth])
    .goTo([0, bendWidth])
    .close()
    .scale([width / 2, height / 2], 1, -1)
    .translate([0, (-3 * height) / 4]);

  const path2 = path1.translate([0, 2 * bendWidth]);
  const path3 = path2.translate([0, 2 * bendWidth]);

  return (
    <>
      <rect x={0} y={0} width={width} height={height} fill={fill[0]} />
      <PathFromBuilder pathBuilder={path1} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={path2} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={path3} fill={fill[1]} stroke="#333" />
    </>
  );
};
