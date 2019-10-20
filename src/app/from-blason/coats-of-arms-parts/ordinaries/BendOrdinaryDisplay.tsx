import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Bend, BendSinister } from '../../../model/ordinary';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { CommonOrdinaryDisplay } from './CommonOrdinaryDisplay';
import { computeLineOptions, oneSideLineOption } from '../blasonDisplay.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { toDegree } from '../../../svg-path-builder/geometrical.helper';
import { buildFurTransformProperty } from '../FurPattern.model';

const postfixId = 'fess';
const ermineScale = 0.66;
const vairScale = 0.56;
const potentScale = 0.35;

type Props = {
  dimension: Dimension;
  ordinary: Bend | BendSinister;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
  direction: 'dexter' | 'sinister';
};
export const BendOrdinaryDisplay = ({ dimension, ordinary, fillFromTincture, onClick, direction }: Props) => {
  const { width, height } = dimension;
  const scaleRatio = height / 480;

  const transformProperties = buildFurTransformProperty(fillFromTincture, {
    ermine: [{ kind: 'scale', value: [ermineScale * scaleRatio, ermineScale * 0.75 * scaleRatio] }],
    vair: [{ kind: 'scale', value: [vairScale * scaleRatio, vairScale * 0.6785 * scaleRatio] }],
    potent: [{ kind: 'scale', value: [potentScale * scaleRatio, potentScale * 1.35 * scaleRatio] }],
  });

  const bendHeight = height / 4;
  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const oneSideOnly = oneSideLineOption(lineOptions);
  const length = Math.sqrt(width ** 2 + height ** 2);

  const rotationDirection = direction === 'dexter' ? 1 : -1;
  const pathBuilder = SvgPathBuilder.start([0, 0])
    .goTo([0, bendHeight])
    .goTo([length, bendHeight], oneSideOnly)
    .goTo([length, 0])
    .goTo([0, 0], lineOptions)
    .translate([(width - length) / 2, height / 2 - bendHeight / 2])
    .rotate([width / 2, height / 2], rotationDirection * toDegree(Math.atan2(height, width)));

  return (
    <CommonOrdinaryDisplay
      tincture={ordinary.tincture}
      fillFromTincture={fillFromTincture}
      onClick={onClick}
      transformProperties={transformProperties}
      pathBuilder={pathBuilder}
      postfixId={postfixId}
    />
  );
};
