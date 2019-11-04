import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Flaunches } from '../../../model/ordinary';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { CommonOrdinaryDisplay } from './CommonOrdinaryDisplay';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { buildFurTransformProperty } from '../FurPattern.model';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { allDeclaredTincturesOfOrdinary } from '../../blason.helpers';

const postfixId = 'gyron';
const ermineScale = 0.3;
const vairScale = 0.23;
const potentScale = 0.16;

type Props = {
  dimension: Dimension;
  ordinary: Flaunches;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
};
export const FlaunchesOrdinaryDisplay = ({ dimension, ordinary, fillFromTincture, onClick }: Props) => {
  const { width, height } = dimension;
  const scaleRatio = height / 480;

  const transformProperties = buildFurTransformProperty(fillFromTincture, allDeclaredTincturesOfOrdinary(ordinary), {
    ermine: [{ kind: 'scale', value: [ermineScale * scaleRatio, ermineScale * 0.75 * scaleRatio] }],
    vair: [{ kind: 'scale', value: [vairScale * scaleRatio, vairScale * 0.6785 * scaleRatio] }],
    potent: [{ kind: 'scale', value: [potentScale * scaleRatio, potentScale * 1.35 * scaleRatio] }],
  });

  const lineOptions: LineOptions | null =
    ordinary.line === 'dancetty'
      ? { line: 'indented', height: height / 10, width: width / 5, verticalOffset: 75 }
      : computeLineOptions(ordinary.line, dimension);
  const invertedLineOptions = invertLineOptionNullable(lineOptions);

  const pathBuilderLeft = SvgPathBuilder.start([0, 0])
    .arcTo([0, height], { radius: width * 0.9, sweep: 1 }, invertedLineOptions)
    .close();
  const pathBuilderRight = SvgPathBuilder.start([width, 0])
    .arcTo([width, height], { radius: width * 0.9 }, lineOptions)
    .close();
  const pathBuilderAndTincture = [
    { pathBuilder: pathBuilderLeft, tincture: ordinary.tincture },
    { pathBuilder: pathBuilderRight, tincture: ordinary.tincture },
  ];

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
