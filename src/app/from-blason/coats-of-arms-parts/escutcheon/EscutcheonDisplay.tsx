import * as React from 'react';
import { ShieldShape } from '../../../model/configuration';
import { cannotHappen } from '../../../../utils/cannot-happen';
import { HeaterDisplay } from './HeaterDisplay';
import { Dimension } from '../../../model/dimension';
import { SpanishDisplay } from './SpanishDisplay';
import { SwissDisplay } from './SwissDisplay';

type Props = { shieldShape: ShieldShape; dimension: Dimension };
export const EscutcheonDisplay = ({ shieldShape, dimension }: Props) => {
  if (shieldShape === 'heater') {
    return <HeaterDisplay dimension={dimension} />;
  } else if (shieldShape === 'spanish') {
    return <SpanishDisplay dimension={dimension} />;
  } else if (shieldShape === 'swiss') {
    return <SwissDisplay dimension={dimension} />;
  } else {
    return cannotHappen(shieldShape);
  }
};
