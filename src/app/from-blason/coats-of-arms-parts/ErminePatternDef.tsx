import * as React from 'react';
import { Ermines } from '../../model/tincture';
import { ErmineDisplay } from './ErmineDisplay';
import { Dimension } from '../../model/dimension';
import { TinctureConfiguration } from '../../model/tincture-configuration';

type Props = { ermine: Ermines; patternId: string; dimension: Dimension; tinctureConfiguration: TinctureConfiguration };
export const ErminePatternDef = ({ ermine, patternId, dimension: { width }, tinctureConfiguration }: Props) => {
  const fieldColor = tinctureConfiguration[ermine.field.name];
  const patternWidth = width / 5.5;
  const patternHeight = (patternWidth * 125) / 70;
  return (
    <>
      <symbol viewBox="0 0 200 240" id={ermine.name}>
        <ErmineDisplay width={200} height={240} fill={fieldColor} spot={tinctureConfiguration[ermine.spot.name]} />
      </symbol>

      <pattern
        id={patternId}
        width={patternWidth}
        height={patternHeight}
        patternUnits="userSpaceOnUse"
        viewBox="0 0 70 125"
      >
        <rect width="70px" height="125px" fill={fieldColor} />
        <use href={'#' + ermine.name} x="0" y="0" width={35} height={60} />
        <use href={'#' + ermine.name} x="35" y="65" width={35} height={60} />
      </pattern>
    </>
  );
};
