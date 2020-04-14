import * as React from 'react';
import { Charge } from '../../model/charge';
import { Tincture } from '../../model/tincture';
import { Dimension } from '../../model/dimension';
import { SimpleBlasonShape } from './blasonDisplay.helper';

export type ChargeDisplayParameters<T extends Charge> = {
  charge: T;
  dimension: Dimension;
  shape: SimpleBlasonShape;
  fillFromTincture: (tincture: Tincture) => string;
  onClick: () => void;
};

export type ChargeUnitDisplayParameters<T extends Charge> = {
  charge: T;
  dimension: Dimension;
  fillFromTincture: (tincture: Tincture) => string;
  onClick: () => void;
};

export const ChargeDisplay = ({
  charge,
  dimension,
  fillFromTincture,
  shape,
  onClick,
}: ChargeDisplayParameters<Charge>) => {
  const Display = charge.getDisplay();
  return (
    <Display
      charge={charge}
      dimension={dimension}
      fillFromTincture={fillFromTincture}
      shape={shape}
      onClick={onClick}
    />
  );
};
