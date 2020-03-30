import { FocusablePathFromBuilder } from '../../../common/PathFromBuilder';
import * as React from 'react';
import { Tincture } from '../../../model/tincture';
import { getFill } from '../FurPattern.model';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { Dimension } from '../../../model/dimension';
import { Ordinary } from '../../../model/ordinary';
import { FurConfiguration, getPatternIdOfOrdinary, WithFurPatternForOrdinaryDef } from '../FurPatternDef';
import { ChargeDisplay } from '../ChargeDisplay';
import { getStrokeColor } from '../../blason.helpers';

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
    furConfiguration: FurConfiguration;
    chargeConfiguration?: { dimension: Dimension };
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
  const postfixId = getPatternIdOfOrdinary(ordinary);

  const { pathBuilderAndTincture, furConfiguration, chargeConfiguration } = ordinaryConfiguration(dimension, ordinary);

  const genericOrdinary: Ordinary = ordinary;
  return (
    <WithFurPatternForOrdinaryDef ordinary={ordinary} furConfiguration={furConfiguration}>
      {pathBuilderAndTincture.map(({ pathBuilder, tincture }, i) => {
        const strokeColor = stroke ? getFill(fillFromTincture, stroke, postfixId) : getStrokeColor(tincture);

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
      {'charge' in genericOrdinary && !!genericOrdinary.charge && (
        <ChargeDisplay
          charge={genericOrdinary.charge}
          dimension={chargeConfiguration ? chargeConfiguration.dimension : dimension}
          shape={'default'}
          fillFromTincture={(tincture: Tincture) => getFill(fillFromTincture, tincture, postfixId)}
          onClick={onClick}
        />
      )}
    </WithFurPatternForOrdinaryDef>
  );
};
