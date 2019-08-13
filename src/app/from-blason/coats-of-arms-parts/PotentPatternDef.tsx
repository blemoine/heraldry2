import { Dimension } from '../../model/dimension';
import { Potents } from '../../model/tincture';
import * as React from 'react';
import { PotentDisplay } from './PotentDisplay';

type Props = { patternId: string; dimension: Dimension; potent: Potents };
export const PotentPatternDef = ({ potent, patternId, dimension: { width } }: Props) => {
  return (
    <>
      <symbol viewBox="0 0 300 200" id={potent.name}>
        <PotentDisplay dimension={{ width: 300, height: 200 }} fill={potent.field.color} potent={potent.bell.color} />
      </symbol>

      <pattern
        id={patternId}
        width={width / 2.75}
        height={width / 2.75}
        patternUnits="userSpaceOnUse"
        viewBox="0 0 200 200"
      >
        <rect width="100%" height="100%" fill={potent.field.color} />
        <use href={'#' + potent.name} x="0" y="0" width={150} height={100} />
        <use href={'#' + potent.name} x="-100" y="100" width={150} height={100} />
        <use href={'#' + potent.name} x="100" y="100" width={150} height={100} />
      </pattern>
    </>
  );
};
