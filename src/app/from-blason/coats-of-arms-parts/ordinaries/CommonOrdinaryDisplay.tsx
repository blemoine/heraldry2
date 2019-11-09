import { FurPatternDefinition } from '../FurPatternDefinition';
import { FocusablePathFromBuilder } from '../../../common/PathFromBuilder';
import * as React from 'react';
import { Tincture } from '../../../model/tincture';
import { buildFurTransformProperty, FurTransformPropertyConfiguration, getFill } from '../FurPattern.model';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { allDeclaredTincturesOfOrdinary } from '../../blason.helpers';
import { Dimension } from '../../../model/dimension';
import { Ordinary } from '../../../model/ordinary';

type Props<T extends Ordinary> = {
  ordinary: T;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
  dimension: Dimension;
  baseStrokeWith?: number;
  ordinaryConfiguration: (
    dimension: Dimension,
    ordinary: T
  ) => {
    pathBuilderAndTincture: ReadonlyArray<{ pathBuilder: SvgPathBuilder; tincture: Tincture }>;
    transformPropertiesConfiguration: FurTransformPropertyConfiguration;
  };
};
export const CommonOrdinaryDisplay = <T extends Ordinary>({
  ordinary,
  ordinaryConfiguration,
  dimension,
  fillFromTincture,
  onClick,
  baseStrokeWith,
}: Props<T>) => {
  const stroke = ordinary.fimbriated;
  const strokeWidth = baseStrokeWith || (stroke ? 3 : 1);
  const postfixId = ordinary.name;

  const { pathBuilderAndTincture, transformPropertiesConfiguration } = ordinaryConfiguration(dimension, ordinary);
  const transformProperties = buildFurTransformProperty(
    fillFromTincture,
    allDeclaredTincturesOfOrdinary(ordinary),
    transformPropertiesConfiguration
  );
  const tinctures = pathBuilderAndTincture.map(({ tincture }) => tincture);

  return (
    <>
      <FurPatternDefinition tinctures={tinctures} postfixId={postfixId} transformProperties={transformProperties} />
      {pathBuilderAndTincture.map(({ pathBuilder, tincture }, i) => {
        const strokeColor = stroke
          ? getFill(fillFromTincture, stroke, postfixId)
          : tincture.name === 'sable'
          ? '#777'
          : '#333';

        const fill = getFill(fillFromTincture, tincture, postfixId);
        return (
          <FocusablePathFromBuilder
            key={i}
            pathBuilder={pathBuilder}
            fill={fill}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            onClick={onClick}
          />
        );
      })}
    </>
  );
};
