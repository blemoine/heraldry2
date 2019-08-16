import * as React from 'react';
import { Charge } from '../../model/charge';
import { Tincture } from '../../model/tincture';
import { cannotHappen } from '../../../utils/cannot-happen';
import { LionDisplay } from './charge/lion/LionDisplay';
import { EagleDisplay } from './charge/eagle/EagleDisplay';
import { Dimension } from '../../model/dimension';
import { FleurDeLysDisplay } from './charge/fleurdelys/FleurDeLysDisplay';
import { RoundelDisplay } from './charge/roundel/RoundelDisplay';
import { LozengeDisplay } from './charge/lozenge/LozengeDisplay';
import { CrossDisplay } from './charge/cross/CrossDisplay';

type Props = { charge: Charge; dimension: Dimension; fillFromTincture: (tincture: Tincture) => string };
export const ChargeDisplay = ({ charge, dimension, fillFromTincture }: Props) => {
  if (charge.name === 'lion') {
    return <LionDisplay charge={charge} dimension={dimension} fillFromTincture={fillFromTincture} />;
  } else if (charge.name === 'eagle') {
    return <EagleDisplay charge={charge} dimension={dimension} fillFromTincture={fillFromTincture} />;
  } else if (charge.name === 'fleurdelys') {
    return <FleurDeLysDisplay charge={charge} dimension={dimension} fillFromTincture={fillFromTincture} />;
  } else if (charge.name === 'roundel') {
    return <RoundelDisplay charge={charge} dimension={dimension} fillFromTincture={fillFromTincture} />;
  } else if (charge.name === 'lozenge') {
    return <LozengeDisplay charge={charge} dimension={dimension} fillFromTincture={fillFromTincture} />;
  } else if (charge.name === 'cross') {
    return <CrossDisplay charge={charge} dimension={dimension} fillFromTincture={fillFromTincture} />;
  } else {
    return cannotHappen(charge);
  }
};
