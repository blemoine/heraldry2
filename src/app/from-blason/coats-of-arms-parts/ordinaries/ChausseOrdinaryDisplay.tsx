import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Chausse } from '../../../model/ordinary';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { CommonOrdinaryDisplay } from './CommonOrdinaryDisplay';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { buildFurTransformProperty } from '../FurPattern.model';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { allDeclaredTincturesOfOrdinary } from '../../blason.helpers';

const postfixId = 'canton';
const ermineScale = 0.3;
const vairScale = 0.23;
const potentScale = 0.16;

type Props = {
  dimension: Dimension;
  ordinary: Chausse;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
};
export const ChausseOrdinaryDisplay = ({ dimension, ordinary, fillFromTincture, onClick }: Props) => {
  const { width, height } = dimension;
  const scaleRatio = height / 480;

  const transformProperties = buildFurTransformProperty(fillFromTincture, allDeclaredTincturesOfOrdinary(ordinary), {
    ermine: [{ kind: 'scale', value: [ermineScale * scaleRatio, ermineScale * 0.75 * scaleRatio] }],
    vair: [{ kind: 'scale', value: [vairScale * scaleRatio, vairScale * 0.6785 * scaleRatio] }],
    potent: [{ kind: 'scale', value: [potentScale * scaleRatio, potentScale * 1.35 * scaleRatio] }],
  });

  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const invertedLineOptions = invertLineOptionNullable(lineOptions);
  const pathBuilderLeft = SvgPathBuilder.start([0, 0])
    .goTo([width / 2, height], invertedLineOptions)
    .goTo([0, height])
    .close();
  const pathBuilderRight = SvgPathBuilder.start([width, 0])
    .goTo([width / 2, height], lineOptions)
    .goTo([width, height])
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
