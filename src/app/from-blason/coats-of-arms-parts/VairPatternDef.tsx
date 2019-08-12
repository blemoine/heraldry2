import { VairDisplay } from './VairDisplay';
import * as React from 'react';
import { Dimension } from '../../model/dimension';
import { Vairs } from '../../model/tincture';

type Props = { patternId: string; dimension: Dimension; vair: Vairs };
export const VairPatternDef = ({ vair, patternId, dimension: { width } }: Props) => {
  return (
    <>
      <symbol viewBox="0 0 200 200" id={vair.name}>
        <VairDisplay width={200} height={200} />
      </symbol>
      <pattern
        id={patternId}
        width={width / 5}
        height={width / 2.5}
        patternUnits="userSpaceOnUse"
        viewBox="0 0 100 200"
      >
        <rect width="100%" height="100%" fill="white" />
        <use href={'#' + vair.name} x="0" y="0" width={100} height={100} />
        <use href={'#' + vair.name} x="-50" y="100" width={100} height={100} />
        <use href={'#' + vair.name} x="50" y="100" width={100} height={100} />
      </pattern>
    </>
  );
};
