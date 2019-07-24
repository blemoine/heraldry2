import * as React from 'react';
import { Eagle } from '../../../../model/charge';
import { Tincture } from '../../../../model/tincture';
import SvgEagleDisplayed from './SvgEagleDisplayed';
import { Dimension, scale } from '../../../../model/dimension';

type Props = { charge: Eagle; dimension: Dimension; fillFromTincture: (tincture: Tincture) => string };
export const EagleDisplay = (props: Props) => {
  const charge = props.charge;
  const stroke = charge.tincture.name === 'sable' ? '#777' : '#000';

  const mainFill = props.fillFromTincture(charge.tincture);
  const tongueFill = props.fillFromTincture(charge.beakedAndArmed);
  const talonFill = props.fillFromTincture(charge.beakedAndArmed);

  const sizeFactor = 0.85;

  const computedDimension = scale(props.dimension, sizeFactor);

  return (
    <g transform={`translate(${(props.dimension.width * (1 - sizeFactor)) / 2} 0)`}>
      <SvgEagleDisplayed
        dimension={computedDimension}
        stroke={stroke}
        mainFill={mainFill}
        tongueFill={tongueFill}
        talonFill={talonFill}
      />
    </g>
  );
};
