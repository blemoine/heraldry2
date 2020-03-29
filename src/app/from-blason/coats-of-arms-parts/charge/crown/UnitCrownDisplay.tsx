import * as React from 'react';
import { Crown } from '../../../../model/charge';
import { Tincture } from '../../../../model/tincture';
import { cannotHappen } from '../../../../../utils/cannot-happen';
import SvgCrownDovetailed from './SvgCrownDovetailed';
import SvgCrownDucal from './SvgCrownDucal';
import SvgCrownEmbattled from './SvgCrownEmbattled';
import { Dimension } from '../../../../model/dimension';
import { getStrokeColor } from '../../../blason.helpers';

type Props = {
  charge: Crown;
  dimension: Dimension;
  fillFromTincture: (tincture: Tincture) => string;
  onClick: () => void;
};
export const UnitCrownDisplay = ({ charge, dimension, fillFromTincture, onClick }: Props) => {
  const stroke = getStrokeColor(charge.tincture);
  const mainFill = fillFromTincture(charge.tincture);

  if (charge.type === 'dovetailed') {
    return <SvgCrownDovetailed dimension={dimension} stroke={stroke} mainFill={mainFill} onClick={onClick} />;
  } else if (charge.type === 'ducal') {
    return <SvgCrownDucal dimension={dimension} stroke={stroke} mainFill={mainFill} onClick={onClick} />;
  } else if (charge.type === 'embattled') {
    return <SvgCrownEmbattled dimension={dimension} stroke={stroke} mainFill={mainFill} onClick={onClick} />;
  } else {
    return cannotHappen(charge.type);
  }
};
