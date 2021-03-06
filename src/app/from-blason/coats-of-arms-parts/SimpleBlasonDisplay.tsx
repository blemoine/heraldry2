import * as React from 'react';
import { SimpleBlason } from '../../model/blason';
import { Dimension } from '../../model/dimension';
import { FieldDisplay } from './FieldDisplay';
import { OrdinaryDisplay } from './ordinaries/OrdinaryDisplay';
import { ChargeDisplay } from './ChargeDisplay';
import { SimpleBlasonShape } from './blasonDisplay.helper';
import { Ordinary } from '../../model/ordinary';
import { cannotHappen } from '../../../utils/cannot-happen';
import { getChargeDimension } from './charge-dimension.helper';
import { SimpleBlasonPath } from '../../model/blason-path';
import { convertToOlfFillFronTincture, FillFromTincture } from '../fillFromTincture.helper';

function getFieldHorizontalOffset(ordinary: Ordinary): number {
  if (ordinary.name === 'bordure') {
    if (ordinary.line === 'engrailed' || ordinary.line === 'wavy' || ordinary.line === 'dancetty') {
      return 5 / 100;
    } else if (ordinary.line === 'urdy') {
      return 4 / 100;
    } else {
      return 10 / 100;
    }
  } else {
    return 0;
  }
}

function getFieldVerticalOffsetAndScale(ordinary: Ordinary): { verticalOffset: number; verticalScale: number } {
  if (ordinary.name === 'chief') {
    if (ordinary.line === 'straight') {
      return { verticalOffset: 1 / 5, verticalScale: 4 / 5 };
    } else if (ordinary.line === 'engrailed' || ordinary.line === 'indented') {
      return { verticalOffset: 11 / 50, verticalScale: 39 / 50 };
    } else if (ordinary.line === 'invected') {
      return { verticalOffset: 13 / 50, verticalScale: 37 / 50 };
    } else if (
      ordinary.line === 'wavy' ||
      ordinary.line === 'bretessed' ||
      ordinary.line === 'embattled' ||
      ordinary.line === 'embattled-counter-embattled' ||
      ordinary.line === 'dovetailed' ||
      ordinary.line === 'potenty' ||
      ordinary.line === 'raguly' ||
      ordinary.line === 'dancetty'
    ) {
      return { verticalOffset: 9 / 50, verticalScale: 41 / 50 };
    } else if (ordinary.line === 'urdy') {
      return { verticalOffset: 9 / 50, verticalScale: 41 / 50 };
    } else {
      return cannotHappen(ordinary.line);
    }
  } else if (ordinary.name === 'bordure') {
    if (ordinary.line === 'engrailed' || ordinary.line === 'urdy') {
      return { verticalOffset: 3 / 100, verticalScale: 93 / 100 };
    } else if (ordinary.line === 'wavy' || ordinary.line === 'dancetty' || ordinary.line === 'potenty') {
      return { verticalOffset: 6 / 100, verticalScale: 88 / 100 };
    } else {
      return { verticalOffset: 7 / 100, verticalScale: 85 / 100 };
    }
  } else if (ordinary.name === 'base') {
    if (ordinary.line === 'invected') {
      return { verticalOffset: 0, verticalScale: 38 / 50 };
    } else if (ordinary.line === 'dancetty') {
      return { verticalOffset: 0, verticalScale: 42 / 50 };
    } else {
      return { verticalOffset: 0, verticalScale: 4 / 5 };
    }
  } else {
    return { verticalOffset: 0, verticalScale: 1 };
  }
}

type Props = {
  blason: SimpleBlason;
  dimension: Dimension;
  fillFromTincture: FillFromTincture;
  clipPathId: string;
  shape: SimpleBlasonShape;
  selectBlasonPart: (path: SimpleBlasonPath) => void;
};
export const SimpleBlasonDisplay = ({
  blason,
  dimension,
  fillFromTincture,
  clipPathId,
  shape,
  selectBlasonPart,
}: Props) => {
  const { width, height } = dimension;
  const ordinary = blason.ordinary;

  const baseVerticalOffsetAndScale = ordinary
    ? getFieldVerticalOffsetAndScale(ordinary)
    : { verticalScale: 1, verticalOffset: 0 };
  const fieldHeightScale = baseVerticalOffsetAndScale.verticalScale;
  const baseVerticalOffset = baseVerticalOffsetAndScale.verticalOffset;

  const baseHorizontalOffset = ordinary ? getFieldHorizontalOffset(ordinary) : 0;
  const fieldWidthScale = 1 - 2 * baseHorizontalOffset;
  const fieldDimension = { width: width * fieldWidthScale, height: height * fieldHeightScale };

  const { horizontalScale, verticalScale, horizontalOffset, verticalOffset } = getChargeDimension(blason, shape);

  const clipPathUrl = `url(#${clipPathId})`;

  return (
    <>
      <g
        clipPath={clipPathUrl}
        className="blason-field"
        style={{ cursor: 'pointer' }}
        onClick={() => selectBlasonPart('field')}
      >
        <GWrapper translate={[baseHorizontalOffset * width, baseVerticalOffset * height]}>
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
            fillFromTincture={fillFromTincture}
            shape={shape}
            onClick={() => selectBlasonPart('ordinary')}
          />
        </g>
      )}

      {blason.charge && (
        <g clipPath={clipPathUrl} className="blason-charge">
          <GWrapper translate={[horizontalOffset * width, (baseVerticalOffset + verticalOffset) * height]}>
            <ChargeDisplay
              dimension={{
                width: horizontalScale * width,
                height: verticalScale * fieldDimension.height,
              }}
              charge={blason.charge}
              shape={shape}
              fillFromTincture={convertToOlfFillFronTincture(fillFromTincture)}
              onClick={() => selectBlasonPart('charge')}
            />
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
