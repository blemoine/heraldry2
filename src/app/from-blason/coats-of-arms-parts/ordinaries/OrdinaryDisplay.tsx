import * as React from 'react';
import { Ordinary } from '../../../model/ordinary';
import { cannotHappen } from '../../../../utils/cannot-happen';
import { Dimension } from '../../../model/dimension';
import { range } from '../../../../utils/range';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { FocusablePathFromBuilder } from '../../../common/PathFromBuilder';
import { chiefHeightRatio, computeLineOptions, SimpleBlasonShape } from '../blasonDisplay.helper';
import { ShieldShape } from '../../../model/configuration';
import { BordureDisplay } from './BordureDisplay';
import { toDegree } from '../../../svg-path-builder/geometrical.helper';
import { convertToOlfFillFronTincture, FillFromTincture } from '../../fillFromTincture.helper';
import { QuarterOrdinaryDisplay } from './QuarterOrdinaryDisplay';
import { CantonOrdinaryDisplay } from './CantonOrdinaryDisplay';

type Props = {
  ordinary: Ordinary;
  fillFromTincture: FillFromTincture;
  dimension: Dimension;
  shape: SimpleBlasonShape;
  shieldShape: ShieldShape;
  onClick: () => void;
};

function oneSideLineOption(lineOptions: LineOptions | null): LineOptions | null {
  if (!lineOptions) {
    return null;
  }
  if ('oneSideOnly' in lineOptions && lineOptions.oneSideOnly) {
    return null;
  } else if ('halfOffset' in lineOptions && lineOptions.halfOffset !== null) {
    return { ...lineOptions, halfOffset: true };
  } else if (lineOptions.line === 'urdy') {
    return { ...lineOptions, height: -lineOptions.height };
  } else if (lineOptions.line === 'raguly') {
    return { ...lineOptions, direction: lineOptions.direction === 'left' ? 'right' : 'left' };
  } else {
    return lineOptions;
  }
}

export const OrdinaryDisplay = ({ ordinary, fillFromTincture, dimension, shape, shieldShape, onClick }: Props) => {
  const strokeColor = ordinary.tincture.name === 'sable' ? '#777' : '#333';

  const fill = convertToOlfFillFronTincture(fillFromTincture)(ordinary.tincture);
  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const oneSideOnly = oneSideLineOption(lineOptions);

  const { width, height } = dimension;
  if (ordinary.name === 'chief') {
    const chiefHeight = height * chiefHeightRatio;

    const computedHeight =
      chiefHeight +
      (lineOptions && lineOptions.line === 'with-arc'
        ? lineOptions.radius
        : lineOptions && lineOptions.line === 'indented'
        ? lineOptions.height
        : 0);
    const pathBuilder = SvgPathBuilder.start([0, 0])
      .goTo([0, computedHeight])
      .goTo([width, computedHeight], lineOptions)
      .goTo([width, 0])
      .close();

    return (
      <FocusablePathFromBuilder
        pathBuilder={pathBuilder}
        fill={fill}
        stroke={strokeColor}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      />
    );
  } else if (ordinary.name === 'base') {
    const baseHeight = height / 4;

    const pathBuilder = SvgPathBuilder.start([0, height])
      .goTo([width, height])
      .goTo([width, height - baseHeight])
      .goTo([0, height - baseHeight], lineOptions)
      .close();

    return (
      <FocusablePathFromBuilder
        pathBuilder={pathBuilder}
        fill={fill}
        stroke={strokeColor}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      />
    );
  } else if (ordinary.name === 'fess') {
    const pathBuilder = SvgPathBuilder.start([0, height / 3])
      .goTo([0, (2 * height) / 3])
      .goTo([width, (2 * height) / 3], oneSideOnly)
      .goTo([width, height / 3])
      .goTo([0, height / 3], lineOptions);

    return (
      <FocusablePathFromBuilder
        pathBuilder={pathBuilder}
        fill={fill}
        stroke={strokeColor}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      />
    );
  } else if (ordinary.name === 'bend') {
    const length = Math.sqrt(width ** 2 + height ** 2);
    const bendHeight = height / 4;

    const pathBuilder2 = SvgPathBuilder.start([0, 0])
      .goTo([0, bendHeight])
      .goTo([length, bendHeight], oneSideOnly)
      .goTo([length, 0])
      .goTo([0, 0], lineOptions)
      .translate([(width - length) / 2, height / 2 - bendHeight / 2])
      .rotate([width / 2, height / 2], toDegree(Math.atan2(height, width)));

    return (
      <FocusablePathFromBuilder
        pathBuilder={pathBuilder2}
        fill={fill}
        stroke={strokeColor}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      />
    );
  } else if (ordinary.name === 'bendSinister') {
    const length = Math.sqrt(width ** 2 + height ** 2);
    const bendHeight = height / 4;

    const pathBuilder2 = SvgPathBuilder.start([0, 0])
      .goTo([0, bendHeight])
      .goTo([length, bendHeight], oneSideOnly)
      .goTo([length, 0])
      .goTo([0, 0], lineOptions)
      .translate([(width - length) / 2, height / 2 - bendHeight / 2])
      .rotate([width / 2, height / 2], -toDegree(Math.atan2(height, width)));

    return (
      <FocusablePathFromBuilder
        pathBuilder={pathBuilder2}
        fill={fill}
        stroke={strokeColor}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      />
    );
  } else if (ordinary.name === 'pale') {
    return (
      <>
        {range(0, ordinary.count).map((i) => {
          const startX = ((i * 2 + 1) * width) / (2 * ordinary.count + 1);
          const paleWidth = width / (2 * ordinary.count + 1);
          const pathBuilder = SvgPathBuilder.start([startX, 0])
            .goTo([startX, height], oneSideOnly)
            .goTo([startX + paleWidth, height])
            .goTo([startX + paleWidth, 0], lineOptions);

          return (
            <FocusablePathFromBuilder
              key={i}
              pathBuilder={pathBuilder}
              fill={fill}
              stroke={strokeColor}
              style={{ cursor: 'pointer' }}
              onClick={onClick}
            />
          );
        })}
      </>
    );
  } else if (ordinary.name === 'cross') {
    const pathBuilder = SvgPathBuilder.start([(2 * width) / 5, 0])
      .goToWithPartFlat([(2 * width) / 5, (2 * height) / 5], oneSideOnly, 5, 'end')
      .goToWithPartFlat([0, (2 * height) / 5], lineOptions, 5, 'start')
      .goTo([0, (3 * height) / 5])
      .goToWithPartFlat([(2 * width) / 5, (3 * height) / 5], oneSideOnly, 5, 'end')
      .goToWithPartFlat([(2 * width) / 5, height], oneSideOnly, 5, 'start')
      .goTo([(3 * width) / 5, height])
      .goToWithPartFlat([(3 * width) / 5, (3 * height) / 5], oneSideOnly, 5, 'end')
      .goToWithPartFlat([width, (3 * height) / 5], oneSideOnly, 5, 'start')
      .goTo([width, (2 * height) / 5])
      .goToWithPartFlat([(3 * width) / 5, (2 * height) / 5], lineOptions, 5, 'end')
      .goToWithPartFlat([(3 * width) / 5, 0], oneSideOnly, 5, 'start')
      .goTo([(2 * width) / 5, 0]);

    return (
      <FocusablePathFromBuilder
        pathBuilder={pathBuilder}
        fill={fill}
        stroke={strokeColor}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      />
    );
  } else if (ordinary.name === 'saltire') {
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

    return (
      <FocusablePathFromBuilder
        pathBuilder={pathBuilder}
        fill={fill}
        stroke={strokeColor}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      />
    );
  } else if (ordinary.name === 'chevron' || ordinary.name === 'chevronel') {
    const chevronHeight =
      ordinary.name === 'chevron' ? height / 6 : ordinary.name === 'chevronel' ? height / 12 : cannotHappen(ordinary);
    return (
      <>
        {range(0, ordinary.count).map((i) => {
          const topPoint = ((i * 2 + 1) * height) / (ordinary.count * 2 + 1);
          const bottomPoint = (((i + 1) * 2 + 1) * height) / (ordinary.count * 2 + 1);

          const topFlatPart = ordinary.count === 1 ? 3.8 : ordinary.count === 3 ? 12 : -1;

          const pathBuilder = SvgPathBuilder.start([width / 2, topPoint])
            .goToWithPartFlat([0, bottomPoint - chevronHeight], lineOptions, topFlatPart, 'start')
            .goTo([0, bottomPoint])
            .goToWithPartFlat([width / 2, topPoint + chevronHeight], oneSideOnly, 5)
            .goToWithPartFlat([width, bottomPoint], oneSideOnly, 5)
            .goTo([width, bottomPoint - chevronHeight])
            .goToWithPartFlat([width / 2, topPoint], lineOptions, topFlatPart, 'end');

          return (
            <FocusablePathFromBuilder
              key={i}
              pathBuilder={pathBuilder}
              fill={fill}
              stroke={strokeColor}
              style={{ cursor: 'pointer' }}
              onClick={onClick}
            />
          );
        })}
      </>
    );
  } else if (ordinary.name === 'bordure') {
    return (
      <BordureDisplay
        shieldShape={shieldShape}
        shape={shape}
        dimension={dimension}
        fill={fill}
        stroke={strokeColor}
        line={ordinary.line}
        onClick={onClick}
      />
    );
  } else if (ordinary.name === 'pall') {
    const pallWidth = width / 5.5;
    const projectedPallWidth = pallWidth / Math.sqrt(2);
    const lineOptions = computeLineOptions(ordinary.line, { width: width / 1.5, height });

    const pathBuilder = SvgPathBuilder.start([0, 0])
      .goTo([0, projectedPallWidth])
      .goTo([width / 2 - pallWidth / 2, height / 2], oneSideOnly)
      .goTo([width / 2 - pallWidth / 2, height], oneSideOnly)
      .goTo([width / 2 + pallWidth / 2, height])
      .goTo([width / 2 + pallWidth / 2, height / 2], oneSideOnly)
      .goTo([width, projectedPallWidth], oneSideOnly)
      .goTo([width, 0])
      .goTo([width - projectedPallWidth, 0])
      .goTo([width / 2, height / 2 - (height / width) * projectedPallWidth], lineOptions)
      .goTo([projectedPallWidth, 0], lineOptions)
      .goTo([0, 0]);

    return (
      <FocusablePathFromBuilder
        pathBuilder={pathBuilder}
        fill={fill}
        stroke={strokeColor}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      />
    );
  } else if (ordinary.name === 'quarter') {
    return (
      <QuarterOrdinaryDisplay
        onClick={onClick}
        stroke={strokeColor}
        fill={fill}
        dimension={dimension}
        ordinary={ordinary}
      />
    );
  } else if (ordinary.name === 'canton') {
    return (
      <CantonOrdinaryDisplay
        onClick={onClick}
        stroke={strokeColor}
        fill={fill}
        dimension={dimension}
        ordinary={ordinary}
      />
    );
  } else {
    return cannotHappen(ordinary);
  }
};
