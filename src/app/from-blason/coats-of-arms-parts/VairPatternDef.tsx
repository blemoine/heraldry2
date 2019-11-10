import { VairDisplay } from './VairDisplay';
import * as React from 'react';
import { Vairs } from '../../model/tincture';
import { TinctureConfiguration } from '../../model/tincture-configuration';

type Props = {
  patternId: string;
  bellWidth: number;
  bellHeightRatio: number;
  vair: Vairs;
  tinctureConfiguration: TinctureConfiguration;
};
export const VairPatternDef = ({ vair, patternId, bellWidth, bellHeightRatio, tinctureConfiguration }: Props) => {
  const fieldColor = tinctureConfiguration[vair.field.name];
  const baseWidth = 100;
  const baseHeight = 200;

  const baseBellWidth = 200;
  const baseBellHeight = 200;

  return (
    <>
      <symbol viewBox={`0 0 ${baseBellWidth} ${baseBellHeight}`} id={vair.name}>
        <VairDisplay
          dimension={{ width: baseBellWidth, height: baseBellHeight }}
          bell={tinctureConfiguration[vair.bell.name]}
          fill={fieldColor}
        />
      </symbol>
      <pattern
        id={patternId}
        width={bellWidth}
        height={bellWidth * bellHeightRatio}
        patternUnits="userSpaceOnUse"
        viewBox={`0 0 ${baseWidth} ${baseWidth * bellHeightRatio}`}
      >
        <rect width="100%" height="100%" fill={fieldColor} />
        <g transform={`scale(1 ${bellHeightRatio / 2})`}>
          <use href={'#' + vair.name} x="0" y="0" width={baseWidth} height={baseHeight / 2} />

          {vair.name === 'vair' && (
            <>
              <use
                href={'#' + vair.name}
                x={-baseWidth / 2}
                y={baseHeight / 2}
                width={baseWidth}
                height={baseHeight / 2}
              />
              <use
                href={'#' + vair.name}
                x={baseWidth / 2}
                y={baseHeight / 2}
                width={baseWidth}
                height={baseHeight / 2}
              />
            </>
          )}
          {vair.name === 'counter-vair' && (
            <g transform={`scale(1,-1) translate(0 ${(-baseHeight * 3) / 2})`}>
              <use href={'#' + vair.name} x="0" y={baseHeight / 2} width={baseWidth} height={baseHeight / 2} />
            </g>
          )}
          {vair.name === 'vair-en-pale' && (
            <use href={'#' + vair.name} x="0" y={baseHeight / 2} width={baseWidth} height={baseHeight / 2} />
          )}
          {vair.name === 'vair-en-point' && (
            <g transform={`scale(1,-1) translate(0 ${(-baseHeight * 3) / 2})`}>
              <use
                href={'#' + vair.name}
                x={baseWidth / 2}
                y={baseHeight / 2}
                width={baseWidth}
                height={baseHeight / 2}
              />
              <use
                href={'#' + vair.name}
                x={-baseWidth / 2}
                y={baseHeight / 2}
                width={baseWidth}
                height={baseHeight / 2}
              />
            </g>
          )}
        </g>
      </pattern>
    </>
  );
};
