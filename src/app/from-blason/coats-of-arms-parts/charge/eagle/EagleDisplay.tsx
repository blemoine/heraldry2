import * as React from 'react';
import { Eagle } from '../../../../model/charge';
import { Tincture } from '../../../../model/tincture';
import SvgEagleDisplayed from './SvgEagleDisplayed';
import { Dimension, scale } from '../../../../model/dimension';
import { getChargePositions } from '../charge.helper';
import { SimpleBlasonShape } from '../../blasonDisplay.helper';

type Props = {
  charge: Eagle;
  dimension: Dimension;
  shape: SimpleBlasonShape;
  fillFromTincture: (tincture: Tincture) => string;
};
export const EagleDisplay = (props: Props) => {
  const charge = props.charge;
  const stroke = charge.tincture.name === 'sable' ? '#777' : '#000';

  const mainFill = props.fillFromTincture(charge.tincture);
  const tongueFill = props.fillFromTincture(charge.beakedAndArmed);
  const talonFill = props.fillFromTincture(charge.beakedAndArmed);

  const { count, disposition } = charge.countAndDisposition;

  const dimension = props.dimension;

  const { cellWidth, positions, cellHeight } = getChargePositions(count, disposition, props.shape);
  const { width, height } = dimension;

  const computedDimension = scale(dimension, Math.min(2.2 * cellWidth, 0.8 * cellHeight));
  return (
    <>
      {positions.map(([cx, cy], idx) => {
        const centerX = cx * width;
        const centerY = cy * height;
        return (
          <g
            key={idx}
            transform={`translate(${centerX - computedDimension.width / 2} ${centerY - computedDimension.height / 2} )`}
          >
            <SvgEagleDisplayed
              dimension={computedDimension}
              stroke={stroke}
              mainFill={mainFill}
              tongueFill={tongueFill}
              talonFill={talonFill}
            />
          </g>
        );
      })}
    </>
  );
};
