import * as React from 'react';
import { FleurDeLys } from '../../../../model/charge';
import { Tincture } from '../../../../model/tincture';
import { Dimension, scale } from '../../../../model/dimension';
import SvgFleurDeLys from './SvgFleurDeLys';
import { cannotHappen } from '../../../../../utils/cannot-happen';

type Props = { charge: FleurDeLys; dimension: Dimension; fillFromTincture: (tincture: Tincture) => string };
export const FleurDeLysDisplay = (props: Props) => {
  const charge = props.charge;
  const stroke = charge.tincture.name === 'sable' ? '#777' : '#000';

  const mainFill = props.fillFromTincture(charge.tincture);
  const dimension = props.dimension;

  if (charge.count === 1) {
    const computedDimension = scale(dimension, 0.5);
    const translateX = dimension.width / 2 - computedDimension.width / 2;
    const heightOffset = dimension.height / 2 - computedDimension.height / 2;

    return (
      <g transform={`translate(${translateX} ${heightOffset})`}>
        <SvgFleurDeLys dimension={computedDimension} stroke={stroke} mainFill={mainFill} />
      </g>
    );
  } else if (charge.count === 2) {
    const computedDimension = scale(dimension, 0.3);
    const baseTranslate = dimension.width / 5;
    const heightOffset = dimension.height / 2 - computedDimension.height / 2;

    return (
      <>
        <g transform={`translate(${(3 / 2) * baseTranslate - computedDimension.width / 2} ${heightOffset})`}>
          <SvgFleurDeLys dimension={computedDimension} stroke={stroke} mainFill={mainFill} />
        </g>
        <g transform={`translate(${(7 / 2) * baseTranslate - computedDimension.width / 2} ${heightOffset})`}>
          <SvgFleurDeLys dimension={computedDimension} stroke={stroke} mainFill={mainFill} />
        </g>
      </>
    );
  } else if (charge.count === 3) {
    const computedDimension = scale(dimension, 0.3);
    const baseTranslate = dimension.width / 5;
    const heightOffset = dimension.height / 12;

    return (
      <>
        <g transform={`translate(${(3 / 2) * baseTranslate - computedDimension.width / 2} ${heightOffset})`}>
          <SvgFleurDeLys dimension={computedDimension} stroke={stroke} mainFill={mainFill} />
        </g>
        <g transform={`translate(${(7 / 2) * baseTranslate - computedDimension.width / 2} ${heightOffset})`}>
          <SvgFleurDeLys dimension={computedDimension} stroke={stroke} mainFill={mainFill} />
        </g>
        <g
          transform={`translate(${(5 / 2) * baseTranslate - computedDimension.width / 2} ${heightOffset +
            (1 / 2) * dimension.height})`}
        >
          <SvgFleurDeLys dimension={computedDimension} stroke={stroke} mainFill={mainFill} />
        </g>
      </>
    );
  } else {
    return cannotHappen(charge.count);
  }
};
