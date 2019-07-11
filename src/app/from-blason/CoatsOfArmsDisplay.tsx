import * as React from 'react';
import { Blason } from '../model/blason';
import { Plain } from './coats-of-arms-parts/fields/Plain';
import { isThereFur, stringifyBlason } from './blason.helpers';
import { OrdinaryDisplay } from './coats-of-arms-parts/ordinaries/OrdinaryDisplay';
import { Ermine } from './coats-of-arms-parts/ermine';
import { Vair } from './coats-of-arms-parts/vair';
import { uuid } from '../../utils/uuid';
import { Tincture } from '../model/tincture';
import { FieldDisplay } from './coats-of-arms-parts/FieldDisplay';

type Props = { blason: Blason };
export const CoatsOfArmsDisplay = (props: Props) => {
  const width = 200;
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
      <svg width={width} height={height} viewBox="0 0 200 240">
        <defs>
          {isThereFur(props.blason, 'ermine') && (
            <>
              <symbol viewBox="0 0 200 240" id="ermine">
                <Ermine width={200} height={240} />
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
                <Vair width={200} height={200} />
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
            <Plain fill="transparent" height={height} width={width} />
          </clipPath>
        </defs>

        <FieldDisplay height={height} width={width} field={props.blason.field} fillFromTincture={fillFromTincture} />

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
      </svg>

      <p style={{ border: '1px solid #CCC', padding: '5px 10px', marginTop: '10px' }}>
        <em>{stringifyBlason(props.blason)}</em>
      </p>
    </div>
  );
};
