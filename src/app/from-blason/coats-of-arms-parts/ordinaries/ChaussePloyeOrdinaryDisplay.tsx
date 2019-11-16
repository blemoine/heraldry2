import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { ChaussePloye } from '../../../model/ordinary';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { CommonOrdinaryDisplay } from './CommonOrdinaryDisplay';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { computeLineOptions } from '../blasonDisplay.helper';
import { FurConfiguration } from '../FurPatternDef';

type Props = {
  dimension: Dimension;
  ordinary: ChaussePloye;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
};
export const ChaussePloyeOrdinaryDisplay = ({ dimension, ordinary, fillFromTincture, onClick }: Props) => {
  const { width, height } = dimension;

  const furConfiguration: FurConfiguration = {
    ermine: { spotWidth: width / 19, heightMarginScale: 0, widthMarginScale: 0 },
    vair: { bellWidth: width / 12, bellHeightRatio: 2 },
    potent: { bellWidth: width / 9, bellHeightRatio: 1 },
  };

  const lineOptions = computeLineOptions(ordinary.line, dimension);

  const pathBuilder = SvgPathBuilder.start([0, 0])
    .arcTo([width / 2, height], { radius: height * 2.5, sweep: 1 }, lineOptions)
    .arcTo([width, 0], { radius: height * 2.5, sweep: 1 }, lineOptions)
    .close();
  if (ordinary.tinctures.kind === 'simple') {
    const basePathBuilderAndTincture = [{ pathBuilder, tincture: ordinary.tinctures.tincture }];
    return (
      <CommonOrdinaryDisplay
        fillFromTincture={fillFromTincture}
        onClick={onClick}
        ordinaryConfiguration={() => ({
          pathBuilderAndTincture: basePathBuilderAndTincture,
          furConfiguration,
        })}
        ordinary={ordinary}
        dimension={dimension}
      />
    );
  } else {
    const pathBuilderLeft = SvgPathBuilder.start([0, 0])
      .arcTo([width / 2, height], { radius: height * 2.5, sweep: 1 }, lineOptions)
      .goTo([width / 2, 0])
      .close();
    const pathBuilderRight = SvgPathBuilder.start([width / 2, 0])
      .goTo([width / 2, height])
      .arcTo([width, 0], { radius: height * 2.5, sweep: 1 }, lineOptions)
      .close();
    const pathBuilderAndTincture = [
      {
        pathBuilder: pathBuilderLeft,
        tincture: ordinary.tinctures.tinctures[0],
      },
      {
        pathBuilder: pathBuilderRight,
        tincture: ordinary.tinctures.tinctures[1],
      },
    ];
    const basePathBuilderAndTincture = [{ pathBuilder, tincture: ordinary.tinctures.tinctures[0] }];
    return (
      <>
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          ordinaryConfiguration={() => ({
            pathBuilderAndTincture: basePathBuilderAndTincture,
            furConfiguration,
          })}
          ordinary={ordinary}
          dimension={dimension}
          baseStrokeWith={6}
        />
        <CommonOrdinaryDisplay
          fillFromTincture={fillFromTincture}
          onClick={onClick}
          ordinaryConfiguration={() => ({
            pathBuilderAndTincture,
            furConfiguration,
          })}
          ordinary={{ ...ordinary, fimbriated: null }}
          dimension={dimension}
        />
      </>
    );
  }
};
