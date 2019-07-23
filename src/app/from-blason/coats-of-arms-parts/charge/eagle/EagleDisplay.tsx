import * as React from 'react';
import { Eagle } from '../../../../model/charge';
import { Tincture } from '../../../../model/tincture';
import SvgEagleDisplayed from './SvgEagleDisplayed';

type Props = { charge: Eagle; width: number; height: number; fillFromTincture: (tincture: Tincture) => string };
export const EagleDisplay = (props: Props) => {
  const charge = props.charge;
  const stroke = charge.tincture.name === 'sable' ? '#777' : '#000';

  const mainFill = props.fillFromTincture(charge.tincture);
  const tongueFill = props.fillFromTincture(charge.beakedAndArmed);
  const talonFill = props.fillFromTincture(charge.beakedAndArmed);

  const sizeFactor = 0.85;
  const computedWidth = props.width * sizeFactor;
  const computedHeight = props.height * sizeFactor;

  return (
    <g transform={`translate(${(props.width * (1 - sizeFactor)) / 2} 0)`}>
      <SvgEagleDisplayed
        width={computedWidth}
        height={computedHeight}
        stroke={stroke}
        mainFill={mainFill}
        tongueFill={tongueFill}
        talonFill={talonFill}
      />
    </g>
  );
};
