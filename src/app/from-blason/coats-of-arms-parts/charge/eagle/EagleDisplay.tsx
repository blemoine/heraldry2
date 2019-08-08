import * as React from 'react';
import { Eagle } from '../../../../model/charge';
import { Tincture } from '../../../../model/tincture';
import SvgEagleDisplayed from './SvgEagleDisplayed';
import { Dimension, scale } from '../../../../model/dimension';
import { range } from '../../../../../utils/range';
import { getChargePositions } from '../charge.helper';

type Props = { charge: Eagle; dimension: Dimension; fillFromTincture: (tincture: Tincture) => string };
export const EagleDisplay = (props: Props) => {
  const charge = props.charge;
  const stroke = charge.tincture.name === 'sable' ? '#777' : '#000';

  const mainFill = props.fillFromTincture(charge.tincture);
  const tongueFill = props.fillFromTincture(charge.beakedAndArmed);
  const talonFill = props.fillFromTincture(charge.beakedAndArmed);

  const count = charge.countAndDisposition.count;
  const sizeFactor = 0.85;

  const dimension = props.dimension;

  if ('disposition' in charge.countAndDisposition && charge.countAndDisposition.disposition === 'default') {
    const { cellWidth, positions } = getChargePositions(charge.countAndDisposition.count);
    const { width, height } = dimension;

    const radius = 2.2 * width * cellWidth;
    return (
      <>
        {positions.map(([cx, cy], idx) => {
          const centerX = cx * width;
          const centerY = cy * height;
          const computedDimension = { width: radius, height: radius };
          return (
            <g
              key={idx}
              transform={`translate(${centerX - computedDimension.width / 2} ${centerY -
                computedDimension.height / 2} )`}
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
  } else {
    const computedDimension = scale(dimension, sizeFactor / count);
    return (
      <>
        {range(0, count).map((idx) => (
          <g
            key={idx}
            transform={`translate(${(dimension.width - computedDimension.width) / 2} ${idx * computedDimension.height +
              (dimension.height - count * computedDimension.height) / 2 -
              computedDimension.height / 15} )`}
          >
            <SvgEagleDisplayed
              dimension={computedDimension}
              stroke={stroke}
              mainFill={mainFill}
              tongueFill={tongueFill}
              talonFill={talonFill}
            />
          </g>
        ))}
      </>
    );
  }
};
