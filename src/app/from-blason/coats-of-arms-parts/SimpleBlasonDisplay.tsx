import * as React from 'react';
import { SimpleBlason } from '../../model/blason';
import { Dimension } from '../../model/dimension';
import { FieldDisplay } from './FieldDisplay';
import { OrdinaryDisplay } from './ordinaries/OrdinaryDisplay';
import { ChargeDisplay } from './ChargeDisplay';
import { Tincture } from '../../model/tincture';

type Props = {
  blason: SimpleBlason;
  dimension: Dimension;
  fillFromTincture: (tincture: Tincture) => string;
  clipPathId: string;
};
export const SimpleBlasonDisplay = ({ blason, dimension, fillFromTincture, clipPathId }: Props) => {
  const { width, height } = dimension;
  const ordinary = blason.ordinary;

  const [verticalOffset, heightScale] = ordinary && ordinary.name === 'chief' ? [1 / 5, 4 / 5] : [0, 1];

  const computedDimension = { width, height: height * heightScale };

  const clipPathUrl = `url(#${clipPathId})`;
  return (
    <>
      <g clipPath={clipPathUrl}>
        <GWrapper translate={[0, verticalOffset * height]}>
          <FieldDisplay dimension={computedDimension} field={blason.field} fillFromTincture={fillFromTincture} />
        </GWrapper>
      </g>

      {ordinary && (
        <g clipPath={clipPathUrl}>
          <OrdinaryDisplay dimension={dimension} ordinary={ordinary} fill={fillFromTincture(ordinary.tincture)} />
        </g>
      )}

      {blason.charge && (
        <g clipPath={clipPathUrl}>
          <GWrapper translate={[0, verticalOffset * height]}>
            <ChargeDisplay dimension={computedDimension} charge={blason.charge} fillFromTincture={fillFromTincture} />
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
