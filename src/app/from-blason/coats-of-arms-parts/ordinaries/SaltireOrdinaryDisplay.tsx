import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Saltire } from '../../../model/ordinary';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { computeLineOptions, oneSideLineOption } from '../blasonDisplay.helper';
import { CommonOrdinaryDisplay } from './CommonOrdinaryDisplay';
import { buildFurTransformProperty } from '../FurPattern.model';

const postfixId = 'cross';
const ermineScale = 0.3;
const vairScale = 0.23;
const potentScale = 0.16;

type Props = {
  dimension: Dimension;
  ordinary: Saltire;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
};
export const SaltireOrdinaryDisplay = ({ dimension, ordinary, fillFromTincture, onClick }: Props) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const oneSideOnly = oneSideLineOption(lineOptions);

  const basePointW = width / (10 * Math.sqrt(2));
  const basePointH = height / (10 * Math.sqrt(2));

  const w = width / 2;
  const h = height / 2;

  const pathBuilder = SvgPathBuilder.start([w, h - basePointH])
    .goToWithPartFlat([(h * basePointW) / basePointH - w, -basePointH], lineOptions, 5)
    .goTo([-basePointW, h - (w * basePointH) / basePointW])
    .goToWithPartFlat([w - basePointW, h], oneSideOnly, 5)
    .goToWithPartFlat([-basePointW, h + (w * basePointH) / basePointW], lineOptions, 5)
    .goTo([(h * basePointW) / basePointH - w, 2 * h + basePointH])
    .goToWithPartFlat([w, h + basePointH], oneSideOnly, 5)
    .goToWithPartFlat([2 * w, 2 * h + basePointH], oneSideOnly, 5)
    .goTo([2 * w + basePointW, h + (w * basePointH) / basePointW])
    .goToWithPartFlat([w + basePointW, h], lineOptions, 5)
    .goToWithPartFlat([2 * w + basePointW, h - (w * basePointH) / basePointW], oneSideOnly, 5)
    .goTo([2 * w, -basePointH])
    .goToWithPartFlat([w, h - basePointH], lineOptions, 5);

  const scaleRatio = height / 480;
  const transformProperties = buildFurTransformProperty(fillFromTincture, {
    ermine: [{ kind: 'scale', value: [ermineScale * scaleRatio, ermineScale * 0.75 * scaleRatio] }],
    vair: [{ kind: 'scale', value: [vairScale * scaleRatio, vairScale * 0.6785 * scaleRatio] }],
    potent: [{ kind: 'scale', value: [potentScale * scaleRatio, potentScale * 1.35 * scaleRatio] }],
  });

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
