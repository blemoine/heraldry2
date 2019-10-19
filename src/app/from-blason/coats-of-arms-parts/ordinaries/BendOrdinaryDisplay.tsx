import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Bend, BendSinister } from '../../../model/ordinary';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { CommonOrdinaryDisplay } from './CommonOrdinaryDisplay';
import { computeBendTransformProperty } from './bendPath.helper';
import { computeLineOptions, oneSideLineOption } from '../blasonDisplay.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { toDegree } from '../../../svg-path-builder/geometrical.helper';

const postfixId = 'fess';

type Props = {
  dimension: Dimension;
  ordinary: Bend | BendSinister;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
  direction: 'dexter' | 'sinister';
};
export const BendOrdinaryDisplay = ({ dimension, ordinary, fillFromTincture, onClick, direction }: Props) => {
  const transformProperties = computeBendTransformProperty(dimension, fillFromTincture);

  const { width, height } = dimension;
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
