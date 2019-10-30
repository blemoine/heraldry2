import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Chevron, Chevronel } from '../../../model/ordinary';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { CommonOrdinaryDisplay } from './CommonOrdinaryDisplay';
import { computeLineOptions, oneSideLineOption } from '../blasonDisplay.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { buildFurTransformProperty } from '../FurPattern.model';
import { cannotHappen } from '../../../../utils/cannot-happen';
import { range } from '../../../../utils/range';

const postfixId = 'chevron';
const ermineScale = 0.3;
const vairScale = 0.23;
const potentScale = 0.16;

type Props = {
  dimension: Dimension;
  ordinary: Chevron | Chevronel;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
};
export const ChevronOrdinaryDisplay = ({ dimension, ordinary, fillFromTincture, onClick }: Props) => {
  const { width, height } = dimension;
  const scaleRatio = height / 480;

  const transformProperties = buildFurTransformProperty(fillFromTincture, {
    ermine: [{ kind: 'scale', value: [ermineScale * scaleRatio, ermineScale * 0.75 * scaleRatio] }],
    vair: [{ kind: 'scale', value: [vairScale * scaleRatio, vairScale * 0.6785 * scaleRatio] }],
    potent: [{ kind: 'scale', value: [potentScale * scaleRatio, potentScale * 1.35 * scaleRatio] }],
  });

  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const oneSideOnly = oneSideLineOption(lineOptions);

  const chevronHeight =
    ordinary.name === 'chevron' ? height / 6 : ordinary.name === 'chevronel' ? height / 12 : cannotHappen(ordinary);
  const pathBuilderAndTincture = range(0, ordinary.count).map((i) => {
    const topPoint = ((i * 2 + 1) * height) / (ordinary.count * 2 + 1);
    const bottomPoint = (((i + 1) * 2 + 1) * height) / (ordinary.count * 2 + 1);

    let pathBuilder: SvgPathBuilder;
    if (ordinary.line === 'dancetty' && lineOptions && lineOptions.line === 'indented') {
      let topFlatPartLeft: number;
      let topFlatPartRight: number;
      let bottomFlatPart: number;
      let bottomFactor: number;

      if (ordinary.count === 1) {
        topFlatPartLeft = 11;
        topFlatPartRight = 11;
        bottomFlatPart = 11;
        bottomFactor = -0.06;
      } else if (ordinary.count === 3) {
        topFlatPartLeft = 7;
        topFlatPartRight = 7;
        bottomFlatPart = 5;
        bottomFactor = -0;
      } else {
        topFlatPartLeft = 0;
        topFlatPartRight = 0;
        bottomFlatPart = 5;
        bottomFactor = 0.02;
      }
      const topLineOption =
        ordinary.name === 'chevronel' ? { ...lineOptions, height: lineOptions.height * 0.4 } : lineOptions;
      const bottomLineOptions = { ...topLineOption, verticalOffset: 75 };

      pathBuilder = SvgPathBuilder.start([width / 2, topPoint])
        .goToWithPartFlat(
          [0, bottomPoint - chevronHeight + height * bottomFactor],
          topLineOption,
          topFlatPartLeft,
          'start'
        )
        .goTo([0, bottomPoint])
        .goToWithPartFlat([width / 2, topPoint + chevronHeight], bottomLineOptions, bottomFlatPart)
        .goToWithPartFlat([width, bottomPoint], bottomLineOptions, bottomFlatPart)
        .goTo([width, bottomPoint - chevronHeight + height * bottomFactor])
        .goToWithPartFlat([width / 2, topPoint], topLineOption, topFlatPartRight, 'end');
    } else {
      let topFlatPart: number;
      let bottomFlatPart: number;
      if (ordinary.count === 1) {
        bottomFlatPart = 5;
        topFlatPart = 3.8;
      } else if (ordinary.count === 3) {
        bottomFlatPart = 5;
        topFlatPart = 12;
      } else {
        bottomFlatPart = 5;
        topFlatPart = -1;
      }

      pathBuilder = SvgPathBuilder.start([width / 2, topPoint])
        .goToWithPartFlat([0, bottomPoint - chevronHeight], lineOptions, topFlatPart, 'start')
        .goTo([0, bottomPoint])
        .goToWithPartFlat([width / 2, topPoint + chevronHeight], oneSideOnly, bottomFlatPart)
        .goToWithPartFlat([width, bottomPoint], oneSideOnly, bottomFlatPart)
        .goTo([width, bottomPoint - chevronHeight])
        .goToWithPartFlat([width / 2, topPoint], lineOptions, topFlatPart, 'end');
    }

    return {
      pathBuilder,
      tincture: ordinary.tincture,
    };
  });

  return (
    <CommonOrdinaryDisplay
      fillFromTincture={fillFromTincture}
      onClick={onClick}
      transformProperties={transformProperties}
      pathBuilderAndTincture={pathBuilderAndTincture}
      postfixId={postfixId}
    />
  );
};
