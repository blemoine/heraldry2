import * as React from 'react';
import { Ordinary } from '../../../model/blason';
import { cannotHappen } from '../../../../utils/cannot-happen';

type Props = { ordinary: Ordinary };

export const OrdinaryDisplay = ({ ordinary }: Props) => {
  if (ordinary.name === 'chief') {
    //TODO fill of tincture must be dynamic
    return <rect x={0} y={0} width="100%" height="20%" fill={ordinary.tincture.color} />
  } else if (ordinary.name === 'bend') {
    return <></>
  } else if (ordinary.name === 'pale') {
    return <></>
  } else if (ordinary.name === 'fess') {
    return <></>
  } else if (ordinary.name === 'cross') {
    return <></>
  } else if (ordinary.name === 'chevron') {
    return <></>
  } else if (ordinary.name === 'saltire') {
    return <></>
  } else {
    return cannotHappen(ordinary);
  }
};
