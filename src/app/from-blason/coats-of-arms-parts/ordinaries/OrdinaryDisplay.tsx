import * as React from 'react';
import { Ordinary } from '../../../model/ordinary';
import { cannotHappen } from '../../../../utils/cannot-happen';
import { Dimension } from '../../../model/dimension';
import { SimpleBlasonShape } from '../blasonDisplay.helper';
import { BordureDisplay } from './BordureDisplay';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { ChaussePloyeOrdinaryDisplay } from './ChaussePloyeOrdinaryDisplay';
import { baseOrdinaryConfiguration } from './baseOrdinaryConfiguration';
import { CommonOrdinaryDisplay } from './CommonOrdinaryDisplay';
import { bendOrdinaryConfiguration } from './bendOrdinaryConfiguration';
import { cantonOrdinaryConfiguration } from './cantonOrdinaryConfiguration';
import { chapePloyeOrdinaryConfiguration } from './chapePloyeOrdinaryConfiguration';
import { chausseOrdinaryConfiguration } from './chausseOrdinaryConfiguration';
import { chevronOrdinaryConfiguration } from './chevronOrdinaryConfiguration';
import { chiefOrdinaryConfiguration } from './chiefOrdinaryConfiguration';
import { fessOrdinaryConfiguration } from './fessOrdinaryConfiguration';
import { paleOrdinaryConfiguration } from './paleOrdinaryConfiguration';
import { crossOrdinaryConfiguration } from './crossOrdinaryConfiguration';
import { saltireOrdinaryConfiguration } from './saltireOrdinaryConfiguration';
import { pallOrdinaryConfiguration } from './pallOrdinaryConfiguration';
import { pallInvertedOrdinaryConfiguration } from './pallInvertedOrdinaryConfiguration';
import { shakeforkOrdinaryConfiguration } from './shakeforkOrdinaryConfiguration';
import { gyronOrdinaryConfiguration } from './gyronOrdinaryConfiguration';
import { quarterOrdinaryConfiguration } from './quarterOrdinaryConfiguration';
import { goreOrdinaryConfiguration } from './goreOrdinaryConfiguration';
import { flaunchesOrdinaryConfiguration } from './flaunchesOrdinaryConfiguration';

type Props = {
  ordinary: Ordinary;
  fillFromTincture: FillFromTincture;
  dimension: Dimension;
  shape: SimpleBlasonShape;
  onClick: () => void;
};

export const OrdinaryDisplay = ({ ordinary, fillFromTincture, dimension, shape, onClick }: Props) => {
  if (ordinary.name === 'chape-ploye') {
    return (
      <CommonOrdinaryDisplay
        fillFromTincture={fillFromTincture}
        onClick={onClick}
        dimension={dimension}
        ordinary={ordinary}
        ordinaryConfiguration={chapePloyeOrdinaryConfiguration}
      />
    );
  } else {
    if (ordinary.name === 'chief') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={chiefOrdinaryConfiguration}
        />
      );
    } else if (ordinary.name === 'base') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={baseOrdinaryConfiguration}
        />
      );
    } else if (ordinary.name === 'fess') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={fessOrdinaryConfiguration}
        />
      );
    } else if (ordinary.name === 'bend') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={bendOrdinaryConfiguration('dexter')}
        />
      );
    } else if (ordinary.name === 'bendSinister') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={bendOrdinaryConfiguration('sinister')}
        />
      );
    } else if (ordinary.name === 'pale') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={paleOrdinaryConfiguration}
        />
      );
    } else if (ordinary.name === 'cross') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={crossOrdinaryConfiguration}
        />
      );
    } else if (ordinary.name === 'saltire') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={saltireOrdinaryConfiguration}
        />
      );
    } else if (ordinary.name === 'chevron' || ordinary.name === 'chevronel') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={chevronOrdinaryConfiguration}
        />
      );
    } else if (ordinary.name === 'bordure') {
      return (
        <BordureDisplay
          shape={shape}
          dimension={dimension}
          line={ordinary.line}
          fillFromTincture={fillFromTincture}
          stroke={ordinary.fimbriated}
          tincture={ordinary.tincture}
          onClick={onClick}
          lineDimension={{ width: dimension.width / 10, height: dimension.width / 10 }}
          styleOnlyInner={true}
        />
      );
    } else if (ordinary.name === 'orle') {
      const scale = 0.03;
      return (
        <g transform={`scale(${1 - scale * 2}) translate(${scale * dimension.width} ${scale * dimension.height})`}>
          <BordureDisplay
            shape={shape}
            dimension={dimension}
            line={ordinary.line}
            fillFromTincture={fillFromTincture}
            stroke={ordinary.fimbriated}
            tincture={ordinary.tincture}
            onClick={onClick}
            lineDimension={{ width: dimension.width / 13, height: dimension.width / 13 }}
            styleOnlyInner={false}
          />
        </g>
      );
    } else if (ordinary.name === 'pall') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={pallOrdinaryConfiguration}
        />
      );
    } else if (ordinary.name === 'pall-inverted') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={pallInvertedOrdinaryConfiguration}
        />
      );
    } else if (ordinary.name === 'shakefork') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={shakeforkOrdinaryConfiguration}
        />
      );
    } else if (ordinary.name === 'gyron') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={gyronOrdinaryConfiguration}
        />
      );
    } else if (ordinary.name === 'quarter') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={quarterOrdinaryConfiguration}
        />
      );
    } else if (ordinary.name === 'canton') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={cantonOrdinaryConfiguration}
        />
      );
    } else if (ordinary.name === 'chausse') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={chausseOrdinaryConfiguration}
        />
      );
    } else if (ordinary.name === 'chausse-ploye') {
      return (
        <ChaussePloyeOrdinaryDisplay
          onClick={onClick}
          fillFromTincture={fillFromTincture}
          dimension={dimension}
          ordinary={ordinary}
        />
      );
    } else if (ordinary.name === 'gore') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={goreOrdinaryConfiguration}
        />
      );
    } else if (ordinary.name === 'flaunches') {
      return (
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          dimension={dimension}
          ordinary={ordinary}
          ordinaryConfiguration={flaunchesOrdinaryConfiguration}
        />
      );
    } else {
      return cannotHappen(ordinary);
    }
  }
};
