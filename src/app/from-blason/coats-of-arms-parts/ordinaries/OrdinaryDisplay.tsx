import * as React from 'react';
import { Ordinary } from '../../../model/ordinary';
import { cannotHappen } from '../../../../utils/cannot-happen';
import { Dimension } from '../../../model/dimension';
import { SimpleBlasonShape } from '../blasonDisplay.helper';
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
import { PallOrdinaryDisplay } from './PallOrdinaryDisplay';
import { ChapePloyeOrdinaryDisplay } from './ChapePloyeOrdinaryDisplay';
import { PallInvertedOrdinaryDisplay } from './PallInvertedOrdinaryDisplay';
import { ShakeforkOrdinaryDisplay } from './ShakeforkOrdinaryDisplay';
import { GyronOrdinaryDisplay } from './GyronOrdinaryDisplay';
import { ChausseOrdinaryDisplay } from './ChausseOrdinaryDisplay';

type Props = {
  ordinary: Ordinary;
  fillFromTincture: FillFromTincture;
  dimension: Dimension;
  shape: SimpleBlasonShape;
  shieldShape: ShieldShape;
  onClick: () => void;
};

export const OrdinaryDisplay = ({ ordinary, fillFromTincture, dimension, shape, shieldShape, onClick }: Props) => {
  if (ordinary.name === 'chape-ploye') {
    return (
      <ChapePloyeOrdinaryDisplay
        ordinary={ordinary}
        dimension={dimension}
        onClick={onClick}
        fillFromTincture={fillFromTincture}
      />
    );
  } else {
    const strokeColor = ordinary.tincture.name === 'sable' ? '#777' : '#333';
    const fill = convertToOlfFillFronTincture(fillFromTincture)(ordinary.tincture);
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
      return (
        <PallOrdinaryDisplay
          dimension={dimension}
          ordinary={ordinary}
          fillFromTincture={fillFromTincture}
          onClick={onClick}
        />
      );
    } else if (ordinary.name === 'pall-inverted') {
      return (
        <PallInvertedOrdinaryDisplay
          dimension={dimension}
          ordinary={ordinary}
          fillFromTincture={fillFromTincture}
          onClick={onClick}
        />
      );
    } else if (ordinary.name === 'shakefork') {
      return (
        <ShakeforkOrdinaryDisplay
          dimension={dimension}
          ordinary={ordinary}
          fillFromTincture={fillFromTincture}
          onClick={onClick}
        />
      );
    } else if (ordinary.name === 'gyron') {
      return (
        <GyronOrdinaryDisplay
          dimension={dimension}
          ordinary={ordinary}
          fillFromTincture={fillFromTincture}
          onClick={onClick}
        />
      );
    } else if (ordinary.name === 'quarter') {
      return (
        <QuarterOrdinaryDisplay
          onClick={onClick}
          fillFromTincture={fillFromTincture}
          dimension={dimension}
          ordinary={ordinary}
        />
      );
    } else if (ordinary.name === 'canton') {
      return (
        <CantonOrdinaryDisplay
          onClick={onClick}
          fillFromTincture={fillFromTincture}
          dimension={dimension}
          ordinary={ordinary}
        />
      );
    } else if (ordinary.name === 'chausse') {
      return (
        <ChausseOrdinaryDisplay
          onClick={onClick}
          fillFromTincture={fillFromTincture}
          dimension={dimension}
          ordinary={ordinary}
        />
      );
    } else {
      return cannotHappen(ordinary);
    }
  }
};
