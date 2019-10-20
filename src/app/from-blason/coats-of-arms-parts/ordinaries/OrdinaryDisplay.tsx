import * as React from 'react';
import { Ordinary } from '../../../model/ordinary';
import { cannotHappen } from '../../../../utils/cannot-happen';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { FocusablePathFromBuilder } from '../../../common/PathFromBuilder';
import { computeLineOptions, oneSideLineOption, SimpleBlasonShape } from '../blasonDisplay.helper';
import { ShieldShape } from '../../../model/configuration';
import { BordureDisplay } from './BordureDisplay';
import { convertToOlfFillFronTincture, FillFromTincture } from '../../fillFromTincture.helper';
import { QuarterOrdinaryDisplay } from './QuarterOrdinaryDisplay';
import { CantonOrdinaryDisplay } from './CantonOrdinaryDisplay';
import { ChiefOrdinaryDisplay } from './ChiefOrdinaryDisplay';
import { BaseOrdinaryDisplay } from './BaseOrdinaryDisplay';
import { FessOrdinaryDisplay } from './FessOrdinaryDisplay';
import { BendOrdinaryDisplay } from './BendOrdinaryDisplay';
import { PaleOrdinaryDisplay } from './PaleOrdinaryDisplay';
import { CrossOrdinaryDisplay } from './CrossOrdinaryDisplay';
import { SaltireOrdinaryDisplay } from './SaltireOrdinaryDisplay';
import { ChevronOrdinaryDisplay } from './ChevronOrdinaryDisplay';

type Props = {
  ordinary: Ordinary;
  fillFromTincture: FillFromTincture;
  dimension: Dimension;
  shape: SimpleBlasonShape;
  shieldShape: ShieldShape;
  onClick: () => void;
};

export const OrdinaryDisplay = ({ ordinary, fillFromTincture, dimension, shape, shieldShape, onClick }: Props) => {
  const strokeColor = ordinary.tincture.name === 'sable' ? '#777' : '#333';

  const fill = convertToOlfFillFronTincture(fillFromTincture)(ordinary.tincture);
  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const oneSideOnly = oneSideLineOption(lineOptions);

  const { width, height } = dimension;
  if (ordinary.name === 'chief') {
    return (
      <ChiefOrdinaryDisplay
        ordinary={ordinary}
        dimension={dimension}
        onClick={onClick}
        fillFromTincture={fillFromTincture}
      />
    );
  } else if (ordinary.name === 'base') {
    return (
      <BaseOrdinaryDisplay
        ordinary={ordinary}
        dimension={dimension}
        onClick={onClick}
        fillFromTincture={fillFromTincture}
      />
    );
  } else if (ordinary.name === 'fess') {
    return (
      <FessOrdinaryDisplay
        ordinary={ordinary}
        dimension={dimension}
        onClick={onClick}
        fillFromTincture={fillFromTincture}
      />
    );
  } else if (ordinary.name === 'bend') {
    return (
      <BendOrdinaryDisplay
        ordinary={ordinary}
        dimension={dimension}
        onClick={onClick}
        fillFromTincture={fillFromTincture}
        direction="dexter"
      />
    );
  } else if (ordinary.name === 'bendSinister') {
    return (
      <BendOrdinaryDisplay
        ordinary={ordinary}
        dimension={dimension}
        onClick={onClick}
        fillFromTincture={fillFromTincture}
        direction="sinister"
      />
    );
  } else if (ordinary.name === 'pale') {
    return (
      <PaleOrdinaryDisplay
        ordinary={ordinary}
        dimension={dimension}
        onClick={onClick}
        fillFromTincture={fillFromTincture}
      />
    );
  } else if (ordinary.name === 'cross') {
    return (
      <CrossOrdinaryDisplay
        ordinary={ordinary}
        dimension={dimension}
        onClick={onClick}
        fillFromTincture={fillFromTincture}
      />
    );
  } else if (ordinary.name === 'saltire') {
    return (
      <SaltireOrdinaryDisplay
        ordinary={ordinary}
        dimension={dimension}
        onClick={onClick}
        fillFromTincture={fillFromTincture}
      />
    );
  } else if (ordinary.name === 'chevron' || ordinary.name === 'chevronel') {
    return (
      <ChevronOrdinaryDisplay
        dimension={dimension}
        ordinary={ordinary}
        fillFromTincture={fillFromTincture}
        onClick={onClick}
      />
    );
  } else if (ordinary.name === 'bordure') {
    return (
      <BordureDisplay
        shieldShape={shieldShape}
        shape={shape}
        dimension={dimension}
        fill={fill}
        stroke={strokeColor}
        line={ordinary.line}
        onClick={onClick}
      />
    );
  } else if (ordinary.name === 'pall') {
    const pallWidth = width / 5.5;
    const projectedPallWidth = pallWidth / Math.sqrt(2);
    const lineOptions = computeLineOptions(ordinary.line, { width: width / 1.5, height });

    const pathBuilder = SvgPathBuilder.start([0, 0])
      .goTo([0, projectedPallWidth])
      .goTo([width / 2 - pallWidth / 2, height / 2], oneSideOnly)
      .goTo([width / 2 - pallWidth / 2, height], oneSideOnly)
      .goTo([width / 2 + pallWidth / 2, height])
      .goTo([width / 2 + pallWidth / 2, height / 2], oneSideOnly)
      .goTo([width, projectedPallWidth], oneSideOnly)
      .goTo([width, 0])
      .goTo([width - projectedPallWidth, 0])
      .goTo([width / 2, height / 2 - (height / width) * projectedPallWidth], lineOptions)
      .goTo([projectedPallWidth, 0], lineOptions)
      .goTo([0, 0]);

    return (
      <FocusablePathFromBuilder
        pathBuilder={pathBuilder}
        fill={fill}
        stroke={strokeColor}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      />
    );
  } else if (ordinary.name === 'quarter') {
    return (
      <QuarterOrdinaryDisplay
        onClick={onClick}
        stroke={strokeColor}
        fill={fill}
        dimension={dimension}
        ordinary={ordinary}
      />
    );
  } else if (ordinary.name === 'canton') {
    return (
      <CantonOrdinaryDisplay
        onClick={onClick}
        stroke={strokeColor}
        fill={fill}
        dimension={dimension}
        ordinary={ordinary}
      />
    );
  } else {
    return cannotHappen(ordinary);
  }
};
