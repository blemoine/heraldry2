import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { BendyField } from '../../../model/field';
import { range } from '../../../../utils/range';

type Props = { fill: [string, string]; dimension: Dimension; number: BendyField['number'] };
export const BendyDisplay: React.FunctionComponent<Props> = (props) => {
  const { fill } = props;
  const dimension = props.dimension;
  const height = dimension.height;
  const width = dimension.width;

  const a = (1.09 - 1.182) / (1.33 - 1.066);
  const b = 1.09 - a * 1.33;

  const maxCoordinate = Math.max(height * ((a * height) / width + b), width);
  const bendWidth = maxCoordinate / props.number;

  const bendPath = SvgPathBuilder.start([-maxCoordinate, 0])
    .goTo([maxCoordinate * 2, 0])
    .goTo([maxCoordinate * 2, bendWidth])
    .goTo([-maxCoordinate, bendWidth])
    .close()
    .rotate([(Math.sqrt(2) * bendWidth) / 2, bendWidth / 2], 45)
    .translate([width, 0]);

  return (
    <>
      {range(0, props.number).map((i) => {
        const path = bendPath.translate([-Math.sqrt(2) * bendWidth * (i + 1 / 2), 0]);

        return <PathFromBuilder key={i} pathBuilder={path} fill={fill[i % 2]} stroke="#333" />;
      })}
    </>
  );
};
