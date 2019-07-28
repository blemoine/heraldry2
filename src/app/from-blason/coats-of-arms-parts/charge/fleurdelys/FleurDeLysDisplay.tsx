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
  const sizeFactor = 0.8;
  const computedDimension = scale(dimension, sizeFactor / charge.count);

  const heightOffset = dimension.height / 12;
  const widthOffset = (computedDimension.width - (1 / 5) * dimension.width) / 2;

  if (charge.count === 3) {
    return (
      <>
        <g transform={`translate(${(1 / 5) * dimension.width - widthOffset} ${heightOffset})`}>
          <SvgFleurDeLys dimension={computedDimension} stroke={stroke} mainFill={mainFill} />
        </g>
        <g transform={`translate(${(3 / 5) * dimension.width - widthOffset} ${heightOffset})`}>
          <SvgFleurDeLys dimension={computedDimension} stroke={stroke} mainFill={mainFill} />
        </g>
        <g
          transform={`translate(${(2 / 5) * dimension.width - widthOffset} ${heightOffset +
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
