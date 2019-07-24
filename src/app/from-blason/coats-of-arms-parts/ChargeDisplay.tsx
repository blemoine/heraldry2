import * as React from 'react';
import { Charge } from '../../model/charge';
import { Tincture } from '../../model/tincture';
import { cannotHappen } from '../../../utils/cannot-happen';
import { LionDisplay } from './charge/lion/LionDisplay';
import { EagleDisplay } from './charge/eagle/EagleDisplay';
import { Dimension } from '../../model/dimension';

type Props = { charge: Charge; dimension: Dimension; fillFromTincture: (tincture: Tincture) => string };
export const ChargeDisplay = ({ charge, dimension, fillFromTincture }: Props) => {
  if (charge.name === 'lion') {
    return <LionDisplay charge={charge} dimension={dimension} fillFromTincture={fillFromTincture} />;
  } else if (charge.name === 'eagle') {
    return <EagleDisplay charge={charge} dimension={dimension} fillFromTincture={fillFromTincture} />;
  } else {
    return cannotHappen(charge);
  }
};
