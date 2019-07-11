import * as React from 'react';
import { Blason } from '../model/blason';
import { isThereFur, stringifyBlason } from './blason.helpers';
import { OrdinaryDisplay } from './coats-of-arms-parts/ordinaries/OrdinaryDisplay';
import { ErmineDisplay } from './coats-of-arms-parts/ErmineDisplay';
import { VairDisplay } from './coats-of-arms-parts/VairDisplay';
import { uuid } from '../../utils/uuid';
import { Tincture } from '../model/tincture';
import { FieldDisplay } from './coats-of-arms-parts/FieldDisplay';
import { HeaterDisplay } from './coats-of-arms-parts/escutcheon/HeaterDisplay';

type Props = { blason: Blason };
export const CoatsOfArmsDisplay = (props: Props) => {
  const width = 400;
  const height = (width * 6) / 5;

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
    <div>
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
            <HeaterDisplay height={height} width={width} />
          </clipPath>
        </defs>

        <g clipPath="url(#plain-field-clip-path)">
          <FieldDisplay height={height} width={width} field={props.blason.field} fillFromTincture={fillFromTincture} />
        </g>

        {props.blason.ordinary && (
          <g clipPath="url(#plain-field-clip-path)">
            <OrdinaryDisplay
              height={height}
              width={width}
              ordinary={props.blason.ordinary.name}
              fill={fillFromTincture(props.blason.ordinary.tincture)}
            />
          </g>
        )}
        <HeaterDisplay height={height} width={width} />
      </svg>

      <p style={{ border: '1px solid #CCC', padding: '5px 10px', marginTop: '10px' }}>
        <em>{stringifyBlason(props.blason)}</em>
      </p>
    </div>
  );
};
