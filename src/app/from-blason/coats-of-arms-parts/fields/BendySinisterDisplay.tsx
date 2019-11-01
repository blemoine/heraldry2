import * as React from 'react';
import { BendyDisplay } from './BendyDisplay';
import { Dimension } from '../../../model/dimension';
import { BendySinisterField } from '../../../model/field';
import { FillFromTincture } from '../../fillFromTincture.helper';

type Props = {
  field: BendySinisterField;
  fillFromTincture: FillFromTincture;
  dimension: Dimension;
  number: 6 | 8 | 10;
};
export const BendySinisterDisplay: React.FunctionComponent<Props> = ({
  field,
  fillFromTincture,
  dimension,
  number,
}) => {
  return (
    <g transform={`scale(-1,1) translate(-${dimension.width} 0)`}>
      <BendyDisplay field={field} fillFromTincture={fillFromTincture} dimension={dimension} number={number} />
    </g>
  );
};
