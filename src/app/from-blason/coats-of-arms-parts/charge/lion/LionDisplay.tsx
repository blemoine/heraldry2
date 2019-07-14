import { Lion } from '../../../../model/charge';
import SvgLionRampant from './SvgLionRampant';
import * as React from 'react';
import { Tincture } from '../../../../model/tincture';

type Props = { charge: Lion; width: number; height: number; fillFromTincture: (tincture: Tincture) => string };
export const LionDisplay = ({ charge, width, height, fillFromTincture }: Props) => {
  return (
    <SvgLionRampant
      width={width * 0.8}
      height={height * 0.8}
      x={width * 0.1}
      y={0}
      mainFill={fillFromTincture(charge.tincture)}
      tongueFill={fillFromTincture(charge.armedAndLangued)}
      clawFill={fillFromTincture(charge.armedAndLangued)}
    />
  );
};
