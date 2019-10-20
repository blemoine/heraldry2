import * as React from 'react';
import { Escutcheon } from '../../../../model/charge';
import { Tincture } from '../../../../model/tincture';
import { Dimension, scale } from '../../../../model/dimension';
import { getChargePositions } from '../charge.helper';
import { SimpleBlasonShape } from '../../blasonDisplay.helper';
import { EscutcheonDisplay } from '../../escutcheon/EscutcheonDisplay';

type Props = {
  charge: Escutcheon;
  dimension: Dimension;
  shape: SimpleBlasonShape;
  fillFromTincture: (tincture: Tincture) => string;
  onClick: () => void;
};
export const EscutcheonChargeDisplay = ({ charge, dimension, fillFromTincture, shape, onClick }: Props) => {
  const { width, height } = dimension;
  const stroke = charge.tincture.name === 'sable' ? '#777' : '#000';
  const fill = fillFromTincture(charge.tincture);

  const { count, disposition } = charge.countAndDisposition;
  const { cellWidth, cellHeight, positions } = getChargePositions(count, disposition, shape);
  const computedDimension = scale(dimension, Math.min(1.5 * cellWidth, cellHeight));
  return (
    <>
      {positions.map(([cx, cy], i) => {
        return (
          <g
            key={i}
            transform={`translate(${cx * width - computedDimension.width / 2} ${cy * height -
              computedDimension.height / 2})`}
          >
            <EscutcheonDisplay
              shieldShape="heater"
              dimension={computedDimension}
              stroke={stroke}
              fill={fill}
              onClick={onClick}
            />
          </g>
        );
      })}
    </>
  );
};
