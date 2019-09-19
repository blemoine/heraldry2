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
import { getChargeDimension } from './charge-dimension.helper';
import { SimpleBlasonPath } from '../../model/blason-path';

type Props = {
  blason: SimpleBlason;
  dimension: Dimension;
  fillFromTincture: (tincture: Tincture) => string;
  clipPathId: string;
  shape: SimpleBlasonShape;
  shieldShape: ShieldShape;
  selectBlasonPart: (path: SimpleBlasonPath) => void;
};
export const SimpleBlasonDisplay = ({
  blason,
  dimension,
  fillFromTincture,
  clipPathId,
  shape,
  shieldShape,
  selectBlasonPart,
}: Props) => {
  const { width, height } = dimension;
  const ordinary = blason.ordinary;

  const baseVerticalOffset = ordinary ? getFieldVerticalOffset(ordinary) : 0;
  const fieldHeightScale = 1 - baseVerticalOffset;
  const fieldDimension = { width, height: height * fieldHeightScale };

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
        <GWrapper translate={[0, baseVerticalOffset * height]}>
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
            onClick={() => selectBlasonPart('ordinary')}
          />
        </g>
      )}

      {blason.charge && (
        <g clipPath={clipPathUrl} className="blason-charge">
          <GWrapper translate={[horizontalOffset * width, (baseVerticalOffset + verticalOffset) * height]}>
            <ChargeDisplay
              dimension={{
                width: horizontalScale * fieldDimension.width,
                height: verticalScale * fieldDimension.height,
              }}
              charge={blason.charge}
              shape={shape}
              fillFromTincture={fillFromTincture}
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
      return 10 / 100;
    }
  } else {
    return 0;
  }
}
