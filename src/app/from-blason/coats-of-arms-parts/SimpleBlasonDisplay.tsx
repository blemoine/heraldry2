import * as React from 'react';
import { SimpleBlason } from '../../model/blason';
import { Dimension } from '../../model/dimension';
import { FieldDisplay } from './FieldDisplay';
import { OrdinaryDisplay } from './ordinaries/OrdinaryDisplay';
import { ChargeDisplay } from './ChargeDisplay';
import { Tincture } from '../../model/tincture';
import { SimpleBlasonShape } from './blasonDisplay.helper';
import { ShieldShape } from '../../model/configuration';
import { Ordinary } from '../../model/ordinary';
import { cannotHappen } from '../../../utils/cannot-happen';

type Props = {
  blason: SimpleBlason;
  dimension: Dimension;
  fillFromTincture: (tincture: Tincture) => string;
  clipPathId: string;
  shape: SimpleBlasonShape;
  shieldShape: ShieldShape;
};
export const SimpleBlasonDisplay = ({ blason, dimension, fillFromTincture, clipPathId, shape, shieldShape }: Props) => {
  const { width, height } = dimension;
  const ordinary = blason.ordinary;

  const verticalOffset = ordinary ? getFieldVerticalOffset(ordinary) : 0;
  const fieldHeightScale = 1 - verticalOffset;
  const fieldDimension = { width, height: height * fieldHeightScale };

  const { chargeDimension, chargeHorizontalOffset, chargeVerticalOffset } = getChargeDimension(
    fieldDimension,
    blason,
    shape
  );

  const clipPathUrl = `url(#${clipPathId})`;
  return (
    <>
      <g clipPath={clipPathUrl} className="blason-field">
        <GWrapper translate={[0, verticalOffset * height]}>
          <FieldDisplay
            dimension={fieldDimension}
            field={blason.field}
            fillFromTincture={fillFromTincture}
            shape={shape}
          />
        </GWrapper>
      </g>

      {ordinary && (
        <g clipPath={clipPathUrl} className="blason-ordinary">
          <OrdinaryDisplay
            dimension={dimension}
            ordinary={ordinary}
            fill={fillFromTincture(ordinary.tincture)}
            shape={shape}
            shieldShape={shieldShape}
          />
        </g>
      )}

      {blason.charge && (
        <g clipPath={clipPathUrl} className="blason-charge">
          <GWrapper translate={[chargeHorizontalOffset * width, chargeVerticalOffset * verticalOffset * height]}>
            <ChargeDisplay dimension={chargeDimension} charge={blason.charge} fillFromTincture={fillFromTincture} />
          </GWrapper>
        </g>
      )}
    </>
  );
};

type GWrapperProps = { translate: [number, number] };
const GWrapper: React.FunctionComponent<GWrapperProps> = (props) => {
  const translate = props.translate;
  if (translate[0] !== 0 || translate[1] !== 0) {
    return <g transform={`translate(${translate[0]} ${translate[1]})`}>{props.children}</g>;
  } else {
    return <>{props.children}</>;
  }
};

function getChargeDimension(
  baseDimension: Dimension,
  blason: SimpleBlason,
  shape: SimpleBlasonShape
): { chargeDimension: Dimension; chargeHorizontalOffset: number; chargeVerticalOffset: number } {
  const ordinary = blason.ordinary;
  const charge = blason.charge;

  if (shape === 'default') {
    const chargeHorizontalOffset = ordinary && ordinary.name === 'bordure' ? 0.05 : 0.015;
    const chargeCount = charge ? charge.countAndDisposition.count : 0;
    const chargeDisposition = charge ? charge.countAndDisposition.disposition : null;
    const defaultChargeHeightOffset =
      chargeDisposition === 'pale'
        ? 0.035
        : chargeCount === 7 || chargeCount === 13
        ? 0.08
        : chargeCount === 8
        ? 0.06
        : chargeCount === 12
        ? 0.05
        : 0.04;
    0;
    let chargeHeightOffset: number;
    if (ordinary) {
      if (ordinary.name === 'chief') {
        chargeHeightOffset = 0.09;
      } else if (ordinary.name === 'base') {
        chargeHeightOffset = 0.12;
      } else if (ordinary.name === 'bordure') {
        if (ordinary.line === 'straight') {
          chargeHeightOffset = 0.12;
        } else {
          chargeHeightOffset = 0.14;
        }
      } else {
        chargeHeightOffset = defaultChargeHeightOffset;
      }
    } else {
      chargeHeightOffset = defaultChargeHeightOffset;
    }

    return {
      chargeDimension: {
        width: baseDimension.width * (1 - 2 * chargeHorizontalOffset),
        height: baseDimension.height * (1 - 2 * chargeHeightOffset),
      },
      chargeHorizontalOffset,
      chargeVerticalOffset: 0,
    };
  } else if (shape === 'square') {
    const chargeHorizontalOffset = ordinary && ordinary.name === 'bordure' ? 0.05 : 0;

    const defaultChargeHeightOffset = 0;

    let chargeHeightOffset: number;
    if (ordinary) {
      if (ordinary.name === 'base') {
        chargeHeightOffset = 0.12;
      } else if (ordinary.name === 'bordure') {
        if (ordinary.line === 'straight') {
          chargeHeightOffset = 0.04;
        } else {
          chargeHeightOffset = 0.06;
        }
      } else {
        chargeHeightOffset = defaultChargeHeightOffset;
      }
    } else {
      chargeHeightOffset = defaultChargeHeightOffset;
    }

    return {
      chargeDimension: {
        width: baseDimension.width * (1 - 2 * chargeHorizontalOffset),
        height: baseDimension.height * (1 - 2 * chargeHeightOffset),
      },
      chargeHorizontalOffset,
      chargeVerticalOffset: 0,
    };
  } else if (shape === 'rightCut' || shape === 'leftCut') {
    const chargeWidthOffset = 0.1;
    const defaultChargeHeightOffset = 0.09;

    let chargeHeightOffset: number;
    if (ordinary) {
      if (ordinary.name === 'chief') {
        chargeHeightOffset = 0.12;
      } else if (ordinary.name === 'base') {
        chargeHeightOffset = 0.12;
      } else if (ordinary.name === 'bordure') {
        if (ordinary.line === 'straight') {
          chargeHeightOffset = 0.12;
        } else {
          chargeHeightOffset = 0.14;
        }
      } else {
        chargeHeightOffset = defaultChargeHeightOffset;
      }
    } else {
      chargeHeightOffset = defaultChargeHeightOffset;
    }

    const chargeDimension = {
      width: baseDimension.width * (1 - 2 * chargeWidthOffset),
      height: baseDimension.height * (1 - 2 * chargeHeightOffset),
    };

    chargeDimension.width = chargeDimension.width * 0.9;
    chargeDimension.height = chargeDimension.height * 0.82;

    return {
      chargeDimension,
      chargeHorizontalOffset: chargeWidthOffset + (shape === 'leftCut' ? 0.1 : 0),
      chargeVerticalOffset: 0,
    };
  } else {
    return cannotHappen(shape);
  }
}

function getFieldVerticalOffset(ordinary: Ordinary): number {
  if (ordinary.name === 'chief') {
    if (ordinary.line === 'straight') {
      return 1 / 5;
    } else if (ordinary.line === 'engrailed') {
      return 11 / 50;
    } else if (ordinary.line === 'invected') {
      return 13 / 50;
    } else if (ordinary.line === 'indented') {
      return 11 / 50;
    } else {
      return cannotHappen(ordinary.line);
    }
  } else if (ordinary.name === 'bordure') {
    if (ordinary.line === 'engrailed') {
      return 6 / 100;
    } else {
      return 8 / 100;
    }
  } else {
    return 0;
  }
}
