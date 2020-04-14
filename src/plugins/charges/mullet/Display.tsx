import * as React from 'react';
import { Mullet } from './mullet';
import { SvgPathBuilder } from '~/app/svg-path-builder/svg-path-builder';
import { FocusablePathFromBuilder } from '~/app/common/PathFromBuilder';
import { cannotHappen } from '~/utils/cannot-happen';
import { toRadians } from '~/app/svg-path-builder/geometrical.helper';
import { range } from '~/utils/range';
import { isError } from '~/utils/result';
import { getChargePositions } from '~/app/from-blason/coats-of-arms-parts/charge/charge.helper';
import { ChargeDisplayParameters } from '~/app/from-blason/coats-of-arms-parts/ChargeDisplay';
import { getStrokeColor } from '~/app/from-blason/blason.helpers';

export const Display = ({
  charge,
  dimension: { width, height },
  fillFromTincture,
  shape,
  onClick,
}: ChargeDisplayParameters<Mullet>) => {
  const stroke = getStrokeColor(charge.tincture);
  const fill = fillFromTincture(charge.tincture);

  const { count, disposition } = charge.countAndDisposition;
  const { cellWidth, cellHeight, positions } = getChargePositions(count, disposition, shape);
  const externalRadius = Math.min(0.75 * cellWidth * width, 0.4 * cellHeight * height);
  const externalLowRadius = 0.4 * externalRadius;

  const angleBetweenLimbs = 360 / charge.points;

  const limbs = SvgPathBuilder.start([
    externalLowRadius * Math.cos(toRadians(90 + angleBetweenLimbs / 2)),
    -externalLowRadius * Math.sin(toRadians(90 + angleBetweenLimbs / 2)),
  ])
    .goTo([0, -externalRadius])
    .goTo([
      externalLowRadius * Math.cos(toRadians(90 - angleBetweenLimbs / 2)),
      -externalLowRadius * Math.sin(toRadians(90 - angleBetweenLimbs / 2)),
    ]);

  const star = range(0, charge.points - 1).reduce<SvgPathBuilder>((path, i) => {
    const result = path.concat(limbs.rotate([0, 0], (i + 1) * angleBetweenLimbs));
    if (isError(result)) {
      throw new Error(`Got error ${JSON.stringify(result)} while drawing a star with limbs ${i}`);
    }
    return result;
  }, limbs);

  return (
    <>
      {positions.map(([cx, cy], i) => {
        const centerX = cx * width;
        const centerY = cy * height;

        const pathBuilder = star.translate([centerX, centerY]);
        if (charge.inside === 'nothing') {
          return (
            <FocusablePathFromBuilder key={i} pathBuilder={pathBuilder} stroke={stroke} fill={fill} onClick={onClick} />
          );
        } else if (charge.inside === 'pierced') {
          const innerRadius = externalRadius * 0.1;
          const voidedPathBuilder = pathBuilder
            .moveTo([centerX, centerY - innerRadius])
            .arcTo([centerX, centerY + innerRadius], { radius: innerRadius })
            .arcTo([centerX, centerY - innerRadius], { radius: innerRadius });

          return (
            <FocusablePathFromBuilder
              key={i}
              pathBuilder={voidedPathBuilder}
              stroke={stroke}
              fill={fill}
              fillRule="evenodd"
              onClick={onClick}
            />
          );
        } else {
          return cannotHappen(charge.inside);
        }
      })}
    </>
  );
};
