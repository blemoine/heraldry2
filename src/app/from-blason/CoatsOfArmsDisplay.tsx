import * as React from 'react';
import { Blason } from '../model/blason';
import { isThereFur } from './blason.helpers';
import { OrdinaryDisplay } from './coats-of-arms-parts/ordinaries/OrdinaryDisplay';
import { ErmineDisplay } from './coats-of-arms-parts/ErmineDisplay';
import { VairDisplay } from './coats-of-arms-parts/VairDisplay';
import { uuid } from '../../utils/uuid';
import { Tincture } from '../model/tincture';
import { FieldDisplay } from './coats-of-arms-parts/FieldDisplay';
import { HeaterDisplay } from './coats-of-arms-parts/escutcheon/HeaterDisplay';
import { ChargeDisplay } from './coats-of-arms-parts/ChargeDisplay';
import { Dimension } from '../model/dimension';

type Props = { blason: Blason; dimension: Dimension };
export const CoatsOfArmsDisplay = (props: Props) => {
  const dimension = props.dimension;
  const { width, height } = dimension;

  const erminePatternId = 'field-pattern-' + uuid();
  const vairPatternId = 'field-pattern-' + uuid();

  function fillFromTincture(tincture: Tincture): string {
    return tincture.name === 'vair'
      ? 'url(#' + vairPatternId + ')'
      : tincture.name === 'ermine'
      ? 'url(#' + erminePatternId + ')'
      : tincture.color;
  }

  const blason = props.blason;
  const ordinary = blason.ordinary;

  const [verticalOffset, heightScale] = ordinary && ordinary.name === 'chief' ? [1 / 5, 4 / 5] : [0, 1];

  const computedDimension = { width, height: height * heightScale };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        {isThereFur(blason, 'ermine') && (
          <>
            <symbol viewBox="0 0 200 240" id="ermine">
              <ErmineDisplay width={200} height={240} />
            </symbol>

            <pattern
              id={erminePatternId}
              width={width / 5.5}
              height={height / 4.1}
              patternUnits="userSpaceOnUse"
              viewBox="0 0 70 125"
            >
              <rect width="100%" height="100%" fill="white" />
              <use href="#ermine" x="0" y="0" width={35} height={60} />
              <use href="#ermine" x="35" y="65" width={35} height={60} />
            </pattern>
          </>
        )}
        {isThereFur(blason, 'vair') && (
          <>
            <symbol viewBox="0 0 200 200" id="vair">
              <VairDisplay width={200} height={200} />
            </symbol>
            <pattern
              id={vairPatternId}
              width={width / 5}
              height={width / 2.5}
              patternUnits="userSpaceOnUse"
              viewBox="0 0 100 200"
            >
              <rect width="100%" height="100%" fill="white" />
              <use href="#vair" x="0" y="0" width={100} height={100} />
              <use href="#vair" x="-50" y="100" width={100} height={100} />
              <use href="#vair" x="50" y="100" width={100} height={100} />
            </pattern>
          </>
        )}

        <clipPath id="plain-field-clip-path">
          <HeaterDisplay dimension={dimension} />
        </clipPath>
      </defs>

      <g clipPath="url(#plain-field-clip-path)">
        <GWrapper translate={[0, verticalOffset * height]}>
          <FieldDisplay dimension={computedDimension} field={blason.field} fillFromTincture={fillFromTincture} />
        </GWrapper>
      </g>

      {ordinary && (
        <g clipPath="url(#plain-field-clip-path)">
          <OrdinaryDisplay dimension={dimension} ordinary={ordinary} fill={fillFromTincture(ordinary.tincture)} />
        </g>
      )}

      {blason.charge && (
        <g clipPath="url(#plain-field-clip-path)">
          <GWrapper translate={[0, verticalOffset * height]}>
            <ChargeDisplay dimension={computedDimension} charge={blason.charge} fillFromTincture={fillFromTincture} />
          </GWrapper>
        </g>
      )}

      <HeaterDisplay dimension={dimension} />
    </svg>
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
