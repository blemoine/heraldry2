import { Dimension } from '../../model/dimension';
import { Potents } from '../../model/tincture';
import * as React from 'react';
import { PotentDisplay } from './PotentDisplay';
import { TinctureConfiguration } from '../../model/tincture-configuration';

type Props = { patternId: string; dimension: Dimension; potent: Potents; tinctureConfiguration: TinctureConfiguration };
export const PotentPatternDef = ({ potent, patternId, dimension: { width }, tinctureConfiguration }: Props) => {
  const fieldColor = tinctureConfiguration[potent.field.name];
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
        width={width / 2.75}
        height={width / 2.75}
        patternUnits="userSpaceOnUse"
        viewBox="0 0 200 200"
      >
        <rect width="100%" height="100%" fill={fieldColor} />
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
      </pattern>
    </>
  );
};
