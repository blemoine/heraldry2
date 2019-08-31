import * as React from 'react';
import { SimpleBlason } from '../../model/blason';
import { Dimension } from '../../model/dimension';
import { FieldDisplay } from './FieldDisplay';
import { OrdinaryDisplay } from './ordinaries/OrdinaryDisplay';
import { ChargeDisplay } from './ChargeDisplay';
import { Tincture } from '../../model/tincture';
import { SimpleBlasonShape } from './blasonDisplay.helper';
import { ShieldShape } from '../../model/configuration';

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

  const [verticalOffset, heightScale] =
    ordinary && ordinary.name === 'chief'
      ? [1 / 5, 4 / 5]
      : ordinary && ordinary.name === 'bordure'
      ? [1 / 10, 9 / 10]
      : [0, 1];

  const computedDimension = { width, height: height * heightScale };
  const chargeWidthOffset = shape === 'rightCut' || shape === 'leftCut' ? 0.1 : 0.05;
  const chargeHeightOffset = shape === 'rightCut' || shape === 'leftCut' ? 0.11 : 0.05;
  const chargeDimension = {
    width: computedDimension.width * (1 - 2 * chargeWidthOffset),
    height: computedDimension.height * (1 - 2 * chargeHeightOffset),
  };
  if (shape === 'rightCut' || shape === 'leftCut') {
    chargeDimension.width = chargeDimension.width * 0.9;
    chargeDimension.height = chargeDimension.height * 0.82;
  }
  const clipPathUrl = `url(#${clipPathId})`;
  return (
    <>
      <g clipPath={clipPathUrl}>
        <GWrapper translate={[0, verticalOffset * height]}>
          <FieldDisplay
            dimension={computedDimension}
            field={blason.field}
            fillFromTincture={fillFromTincture}
            shape={shape}
          />
        </GWrapper>
      </g>

      {ordinary && (
        <g clipPath={clipPathUrl}>
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
        <g clipPath={clipPathUrl}>
          <GWrapper
            translate={[chargeWidthOffset * width + (shape === 'leftCut' ? 0.1 * width : 0), verticalOffset * height]}
          >
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
