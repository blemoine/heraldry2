import * as React from 'react';
import { ShieldShape } from '../../../model/configuration';
import { cannotHappen } from '../../../../utils/cannot-happen';
import { HeaterDisplay } from './HeaterDisplay';
import { Dimension } from '../../../model/dimension';
import { SpanishDisplay } from './SpanishDisplay';
import { SwissDisplay } from './SwissDisplay';

type Props = { shieldShape: ShieldShape; dimension: Dimension; stroke: string; fill: string; onClick?: () => void };
export const EscutcheonDisplay = ({ shieldShape, dimension, stroke, fill }: Props) => {
  if (shieldShape === 'heater') {
    return <HeaterDisplay dimension={dimension} stroke={stroke} fill={fill} />;
  } else if (shieldShape === 'spanish') {
    return <SpanishDisplay dimension={dimension} stroke={stroke} fill={fill} />;
  } else if (shieldShape === 'swiss') {
    return <SwissDisplay dimension={dimension} stroke={stroke} fill={fill} />;
  } else {
    return cannotHappen(shieldShape);
  }
};
