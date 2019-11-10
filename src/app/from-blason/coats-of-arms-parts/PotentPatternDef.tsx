import { Potents } from '../../model/tincture';
import * as React from 'react';
import { PotentDisplay } from './PotentDisplay';
import { TinctureConfiguration } from '../../model/tincture-configuration';

type Props = {
  patternId: string;
  bellWidth: number;
  bellHeightRatio: number;
  potent: Potents;
  tinctureConfiguration: TinctureConfiguration;
};
export const PotentPatternDef = ({ potent, patternId, bellWidth, bellHeightRatio, tinctureConfiguration }: Props) => {
  const fieldColor = tinctureConfiguration[potent.field.name];
  const baseWidth = 200;

  return (
    <>
      <symbol viewBox="0 0 300 200" id={potent.name}>
        <PotentDisplay
          dimension={{ width: 300, height: 200 }}
          fill={fieldColor}
          potent={tinctureConfiguration[potent.bell.name]}
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
        <g transform={`scale(1 ${bellHeightRatio})`}>
          <use href={'#' + potent.name} x="0" y="0" width={150} height={100} />
          {potent.name === 'potent' && (
            <>
              <use href={'#' + potent.name} x="-100" y="100" width={150} height={100} />
              <use href={'#' + potent.name} x="100" y="100" width={150} height={100} />
            </>
          )}
          {potent.name === 'counter-potent' && (
            <>
              <g transform="scale(1,-1) translate(0 -300)">
                <use href={'#' + potent.name} x="0" y="100" width={150} height={100} />
              </g>
            </>
          )}
          {potent.name === 'potent-en-pale' && <use href={'#' + potent.name} x="0" y="100" width={150} height={100} />}

          {potent.name === 'potent-en-point' && (
            <>
              <g transform="scale(1,-1) translate(0 -300)">
                <use href={'#' + potent.name} x="100" y="100" width={150} height={100} />
                <use href={'#' + potent.name} x="-100" y="100" width={150} height={100} />
              </g>
            </>
          )}
        </g>
      </pattern>
    </>
  );
};
