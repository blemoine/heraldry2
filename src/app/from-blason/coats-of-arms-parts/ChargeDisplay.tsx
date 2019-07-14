import * as React from 'react';
import { Charge } from '../../model/charge';
import { Tincture } from '../../model/tincture';
import { cannotHappen } from '../../../utils/cannot-happen';
import { LionDisplay } from './charge/lion/LionDisplay';

type Props = { charge: Charge; width: number; height: number; fillFromTincture: (tincture: Tincture) => string };
export const ChargeDisplay = ({ charge, width, height, fillFromTincture }: Props) => {
  if (charge.name === 'lion') {
    return <LionDisplay charge={charge} width={width} height={height} fillFromTincture={fillFromTincture} />;
  } else {
    return cannotHappen(charge.name);
  }
};
