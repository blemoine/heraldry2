import * as React from 'react';
import { Ermines } from '../../model/tincture';
import { ErmineDisplay } from './ErmineDisplay';
import { Dimension } from '../../model/dimension';
import { TinctureConfiguration } from '../../model/tincture-configuration';

type Props = { ermine: Ermines; patternId: string; dimension: Dimension; tinctureConfiguration: TinctureConfiguration };
export const ErminePatternDef = ({ ermine, patternId, dimension: { width, height }, tinctureConfiguration }: Props) => {
  const fieldColor = tinctureConfiguration[ermine.field.name];
  return (
    <>
      <symbol viewBox="0 0 200 240" id={ermine.name}>
        <ErmineDisplay width={200} height={240} fill={fieldColor} spot={tinctureConfiguration[ermine.spot.name]} />
      </symbol>

      <pattern
        id={patternId}
        width={width / 5.5}
        height={height / 4.1}
        patternUnits="userSpaceOnUse"
        viewBox="0 0 70 125"
      >
        <rect width="100%" height="100%" fill={fieldColor} />
        <use href={'#' + ermine.name} x="0" y="0" width={35} height={60} />
        <use href={'#' + ermine.name} x="35" y="65" width={35} height={60} />
      </pattern>
    </>
  );
};
