import * as React from 'react';
import { Charge } from '../../model/charge';
import { Tincture } from '../../model/tincture';
import { cannotHappen } from '../../../utils/cannot-happen';
import { LionDisplay } from './charge/lion/LionDisplay';
import { EagleDisplay } from './charge/eagle/EagleDisplay';

type Props = { charge: Charge; width: number; height: number; fillFromTincture: (tincture: Tincture) => string };
export const ChargeDisplay = ({ charge, width, height, fillFromTincture }: Props) => {
  if (charge.name === 'lion') {
    return <LionDisplay charge={charge} width={width} height={height} fillFromTincture={fillFromTincture} />;
  } else if (charge.name === 'eagle') {
    return <EagleDisplay charge={charge} width={width} height={height} fillFromTincture={fillFromTincture} />;
  } else {
    return cannotHappen(charge);
  }
};
