import * as React from 'react';
import { ShieldShape } from '../../../model/configuration';
import { cannotHappen } from '../../../../utils/cannot-happen';
import { HeaterDisplay } from './HeaterDisplay';
import { Dimension } from '../../../model/dimension';

type Props = { shieldShape: ShieldShape; dimension: Dimension };
export const EscutcheonDisplay = ({ shieldShape, dimension }: Props) => {
  if (shieldShape === 'heater') {
    return <HeaterDisplay dimension={dimension} />;
  } else {
    return cannotHappen(shieldShape);
  }
};
