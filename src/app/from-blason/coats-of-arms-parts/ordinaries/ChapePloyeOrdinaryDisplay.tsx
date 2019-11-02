import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import * as React from 'react';
import { ChapePloye } from '../../../model/ordinary';
import { Dimension } from '../../../model/dimension';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { buildFurTransformProperty, FurTransformProperty } from '../FurPattern.model';
import { CommonOrdinaryDisplay } from './CommonOrdinaryDisplay';
import { allDeclaredTincturesOfOrdinary } from '../../blason.helpers';

const postfixId = 'chape-ploye';

type Props = {
  dimension: Dimension;
  ordinary: ChapePloye;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
};
export const ChapePloyeOrdinaryDisplay = ({ dimension, ordinary, fillFromTincture, onClick }: Props) => {
  const { width, height } = dimension;
  const lineOptions: LineOptions | null =
    ordinary.line === 'dancetty'
      ? { line: 'indented', height: height / 10, width: width / 5, verticalOffset: 50 }
      : computeLineOptions(ordinary.line, dimension);
  const invertedLineOptions: LineOptions | null =
    ordinary.line === 'dancetty'
      ? { line: 'indented', height: height / 10, width: width / 5, verticalOffset: 100 }
      : invertLineOptionNullable(lineOptions);

  const pathBuilderAndTincture =
    ordinary.tinctures.kind === 'party'
      ? [
          {
            pathBuilder: SvgPathBuilder.start([width / 2, 0])
              .arcTo([0, (5 * height) / 6], { radius: height * 1.6, sweep: 1 }, lineOptions)
              .goTo([0, height])
              .goTo([width / 2, height])
              .close(),
            tincture: ordinary.tinctures.tinctures[0],
          },
          {
            pathBuilder: SvgPathBuilder.start([width / 2, 0])
              .arcTo([width, (5 * height) / 6], { radius: height * 1.6, sweep: 0 }, invertedLineOptions)
              .goTo([width, height])
              .goTo([width / 2, height])
              .close(),
            tincture: ordinary.tinctures.tinctures[1],
          },
        ]
      : [
          {
            pathBuilder: SvgPathBuilder.start([width / 2, 0])
              .arcTo([0, (5 * height) / 6], { radius: height * 1.6, sweep: 1 }, lineOptions)
              .goTo([0, height])
              .goTo([width, height])
              .goTo([width, (5 * height) / 6])
              .arcTo([width / 2, 0], { radius: height * 1.6, sweep: 1 }, invertedLineOptions),
            tincture: ordinary.tinctures.tincture,
          },
        ];

  const scaleRatio = height / 480;
  const transformProperties: FurTransformProperty = buildFurTransformProperty(
    fillFromTincture,
    allDeclaredTincturesOfOrdinary(ordinary),
    {
      ermine: { kind: 'scale', value: 0.275 * scaleRatio },
      vair: { kind: 'scale', value: 0.33 * scaleRatio },
      potent: { kind: 'scale', value: 0.4 * scaleRatio },
    }
  );

  return (
    <CommonOrdinaryDisplay
      fillFromTincture={fillFromTincture}
      onClick={onClick}
      transformProperties={transformProperties}
      pathBuilderAndTincture={pathBuilderAndTincture}
      postfixId={postfixId}
      stroke={ordinary.fimbriated}
    />
  );
};
