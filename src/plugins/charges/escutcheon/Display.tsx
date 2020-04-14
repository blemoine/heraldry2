import * as React from 'react';
import { Escutcheon } from './escutcheon';
import { Dimension, scale } from '~/app/model/dimension';
import { getChargePositions } from '~/app/from-blason/coats-of-arms-parts/charge/charge.helper';
import { FocusablePathFromBuilder } from '~/app/common/PathFromBuilder';
import { LineOptions, SvgPathBuilder } from '~/app/svg-path-builder/svg-path-builder';
import { ChargeDisplayParameters } from '~/app/from-blason/coats-of-arms-parts/ChargeDisplay';
import { getStrokeColor } from '~/app/from-blason/blason.helpers';

function heaterPathBuilder({ width, height }: Dimension, lineOptions: LineOptions | null): SvgPathBuilder {
  return SvgPathBuilder.start([0, 0])
    .goTo([width / 20, 0], null)
    .goTo([width - width / 20, 0], lineOptions)
    .goTo([width, 0], null)
    .goTo([width, (3 * height) / 5], lineOptions)
    .quadraticBezier([width / 2, height], [width, height * 0.8], lineOptions)
    .quadraticBezier([0, (3 * height) / 5], [0, height * 0.8], lineOptions)
    .goTo([0, 0], lineOptions);
}

export const Display = ({
  charge,
  dimension,
  fillFromTincture,
  shape,
  onClick,
}: ChargeDisplayParameters<Escutcheon>) => {
  const { width, height } = dimension;
  const stroke = getStrokeColor(charge.tincture);
  const fill = fillFromTincture(charge.tincture);

  const { count, disposition } = charge.countAndDisposition;
  const { cellWidth, cellHeight, positions } = getChargePositions(count, disposition, shape);
  const computedDimension = scale(dimension, Math.min(1.5 * cellWidth, cellHeight));
  const pathBuilder = heaterPathBuilder(computedDimension, null);
  return (
    <>
      {positions.map(([cx, cy], i) => {
        return (
          <g
            key={i}
            transform={`translate(${cx * width - computedDimension.width / 2} ${
              cy * height - computedDimension.height / 2
            })`}
          >
            <FocusablePathFromBuilder
              pathBuilder={pathBuilder}
              stroke={stroke}
              fill={fill}
              onClick={onClick}
              style={{ pointerEvents: 'none' }}
            />
          </g>
        );
      })}
    </>
  );
};
