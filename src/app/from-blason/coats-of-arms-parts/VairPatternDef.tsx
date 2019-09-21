import { VairDisplay } from './VairDisplay';
import * as React from 'react';
import { Dimension } from '../../model/dimension';
import { Vairs } from '../../model/tincture';
import { TinctureConfiguration } from '../../model/tincture-configuration';

type Props = { patternId: string; dimension: Dimension; vair: Vairs; tinctureConfiguration: TinctureConfiguration };
export const VairPatternDef = ({ vair, patternId, dimension: { width }, tinctureConfiguration }: Props) => {
  const fieldColor = tinctureConfiguration[vair.field.name];
  return (
    <>
      <symbol viewBox="0 0 200 200" id={vair.name}>
        <VairDisplay
          dimension={{ width: 200, height: 200 }}
          bell={tinctureConfiguration[vair.bell.name]}
          fill={fieldColor}
        />
      </symbol>
      <pattern
        id={patternId}
        width={width / 5}
        height={width / 2.5}
        patternUnits="userSpaceOnUse"
        viewBox="0 0 100 200"
      >
        <rect width="100px" height="200px" fill={fieldColor} />
        <use href={'#' + vair.name} x="0" y="0" width={100} height={100} />
        {vair.name === 'vair' && (
          <>
            <use href={'#' + vair.name} x="-50" y="100" width={100} height={100} />
            <use href={'#' + vair.name} x="50" y="100" width={100} height={100} />
          </>
        )}
        {vair.name === 'counter-vair' && (
          <g transform="scale(1,-1) translate(0 -300)">
            <use href={'#' + vair.name} x="0" y="100" width={100} height={100} />
          </g>
        )}
        {vair.name === 'vair-en-pale' && <use href={'#' + vair.name} x="0" y="100" width={100} height={100} />}
        {vair.name === 'vair-en-point' && (
          <g transform="scale(1,-1) translate(0 -300)">
            <use href={'#' + vair.name} x="50" y="100" width={100} height={100} />
            <use href={'#' + vair.name} x="-50" y="100" width={100} height={100} />
          </g>
        )}
      </pattern>
    </>
  );
};
