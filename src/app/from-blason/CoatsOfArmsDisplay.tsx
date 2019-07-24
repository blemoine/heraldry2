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
  const { width, height } = props.dimension;

  const erminePatternId = 'field-pattern-' + uuid();
  const vairPatternId = 'field-pattern-' + uuid();

  function fillFromTincture(tincture: Tincture): string {
    return tincture.name === 'vair'
      ? 'url(#' + vairPatternId + ')'
      : tincture.name === 'ermine'
      ? 'url(#' + erminePatternId + ')'
      : tincture.color;
  }
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        {isThereFur(props.blason, 'ermine') && (
          <>
            <symbol viewBox="0 0 200 240" id="ermine">
              <ErmineDisplay width={200} height={240} />
            </symbol>

            <pattern
              id={erminePatternId}
              width={36.36}
              height={64.9}
              patternUnits="userSpaceOnUse"
              viewBox="0 0 70 125"
            >
              <rect width="100%" height="100%" fill="white" />
              <use href="#ermine" x="0" y="0" width={35} height={60} />
              <use href="#ermine" x="35" y="65" width={35} height={60} />
            </pattern>
          </>
        )}
        {isThereFur(props.blason, 'vair') && (
          <>
            <symbol viewBox="0 0 200 200" id="vair">
              <VairDisplay width={200} height={200} />
            </symbol>
            <pattern id={vairPatternId} width={40} height={80} patternUnits="userSpaceOnUse" viewBox="0 0 100 200">
              <rect width="100%" height="100%" fill="white" />
              <use href="#vair" x="0" y="0" width={100} height={100} />
              <use href="#vair" x="-50" y="100" width={100} height={100} />
              <use href="#vair" x="50" y="100" width={100} height={100} />
            </pattern>
          </>
        )}

        <clipPath id="plain-field-clip-path">
          <HeaterDisplay dimension={props.dimension} />
        </clipPath>
      </defs>

      <g clipPath="url(#plain-field-clip-path)">
        <FieldDisplay dimension={props.dimension} field={props.blason.field} fillFromTincture={fillFromTincture} />
      </g>

      {props.blason.ordinary && (
        <g clipPath="url(#plain-field-clip-path)">
          <OrdinaryDisplay
            dimension={props.dimension}
            ordinary={props.blason.ordinary.name}
            fill={fillFromTincture(props.blason.ordinary.tincture)}
          />
        </g>
      )}

      {props.blason.charge && (
        <g clipPath="url(#plain-field-clip-path)">
          <ChargeDisplay dimension={props.dimension} charge={props.blason.charge} fillFromTincture={fillFromTincture} />
        </g>
      )}

      <HeaterDisplay dimension={props.dimension} />
    </svg>
  );
};
