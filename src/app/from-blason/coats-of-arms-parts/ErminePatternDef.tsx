import * as React from 'react';
import { Ermines } from '../../model/tincture';
import { ErmineDisplay } from './ErmineDisplay';
import { Dimension } from '../../model/dimension';

type Props = { ermine: Ermines; patternId: string; dimension: Dimension };
export const ErminePatternDef = ({ ermine, patternId, dimension: { width, height } }: Props) => {
  return (
    <>
      <symbol viewBox="0 0 200 240" id={ermine.name}>
        <ErmineDisplay width={200} height={240} fill={ermine.field.color} spot={ermine.spot.color} />
      </symbol>

      <pattern
        id={patternId}
        width={width / 5.5}
        height={height / 4.1}
        patternUnits="userSpaceOnUse"
        viewBox="0 0 70 125"
      >
        <rect width="100%" height="100%" fill={ermine.field.color} />
        <use href={'#' + ermine.name} x="0" y="0" width={35} height={60} />
        <use href={'#' + ermine.name} x="35" y="65" width={35} height={60} />
      </pattern>
    </>
  );
};
