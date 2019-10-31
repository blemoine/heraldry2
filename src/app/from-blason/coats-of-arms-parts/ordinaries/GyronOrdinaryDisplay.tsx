import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Gyron } from '../../../model/ordinary';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { CommonOrdinaryDisplay } from './CommonOrdinaryDisplay';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { buildFurTransformProperty } from '../FurPattern.model';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';

const postfixId = 'gyron';
const ermineScale = 0.3;
const vairScale = 0.23;
const potentScale = 0.16;

type Props = {
  dimension: Dimension;
  ordinary: Gyron;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
};
export const GyronOrdinaryDisplay = ({ dimension, ordinary, fillFromTincture, onClick }: Props) => {
  const { width, height } = dimension;
  const scaleRatio = height / 480;

  const transformProperties = buildFurTransformProperty(fillFromTincture, {
    ermine: [{ kind: 'scale', value: [ermineScale * scaleRatio, ermineScale * 0.75 * scaleRatio] }],
    vair: [{ kind: 'scale', value: [vairScale * scaleRatio, vairScale * 0.6785 * scaleRatio] }],
    potent: [{ kind: 'scale', value: [potentScale * scaleRatio, potentScale * 1.35 * scaleRatio] }],
  });

  const lineOptions: LineOptions | null =
    ordinary.line === 'dancetty'
      ? { line: 'indented', height: height / 10, width: width / 5, verticalOffset: 75 }
      : computeLineOptions(ordinary.line, dimension);
  const invertedLineOptions = invertLineOptionNullable(lineOptions);
  const pathBuilder = SvgPathBuilder.start([0, 0])
    .goToWithPartFlat([width / 2, height / 2], invertedLineOptions, 10, 'end')
    .goToWithPartFlat([0, height / 2], invertedLineOptions, 10, 'start')
    .close();
  const pathBuilderAndTincture = [{ pathBuilder, tincture: ordinary.tincture }];

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
