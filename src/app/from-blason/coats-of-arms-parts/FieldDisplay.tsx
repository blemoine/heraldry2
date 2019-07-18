import { Field } from '../../model/field';
import { cannotHappen } from '../../../utils/cannot-happen';
import { Plain } from './fields/Plain';
import * as React from 'react';
import { Tincture } from '../../model/tincture';
import { PaleDisplay } from './fields/PaleDisplay';
import { FessDisplay } from './fields/FessDisplay';
import { BendDisplay } from './fields/BendDisplay';
import { ChevronDisplay } from './fields/ChevronDisplay';
import { BendSinisterDisplay } from './fields/BendSinisterDisplay';
import { CrossDisplay } from './fields/CrossDisplay';
import { SaltireDisplay } from './fields/SaltireDisplay';

type Props = { height: number; width: number; field: Field; fillFromTincture: (tincture: Tincture) => string };
export const FieldDisplay = ({ field, height, width, fillFromTincture }: Props) => {
  if (field.kind === 'plain') {
    return <Plain fill={fillFromTincture(field.tincture)} height={height} width={width} />;
  } else if (field.kind === 'party') {
    const partyName = field.per.name;
    const tinctures = field.per.tinctures;
    const fill: [string, string] = [fillFromTincture(tinctures[0]), fillFromTincture(tinctures[1])];
    if (partyName === 'bend') {
      return <BendDisplay fill={fill} height={height} width={width} />;
    } else if (partyName === 'bendSinister') {
      return <BendSinisterDisplay fill={fill} height={height} width={width} />;
    } else if (partyName === 'chevron') {
      return <ChevronDisplay fill={fill} height={height} width={width} />;
    } else if (partyName === 'fess') {
      return <FessDisplay fill={fill} height={height} width={width} />;
    } else if (partyName === 'pale') {
      return <PaleDisplay fill={fill} height={height} width={width} />;
    } else if (partyName === 'cross') {
      return <CrossDisplay fill={fill} height={height} width={width} />;
    } else if (partyName === 'saltire') {
      return <SaltireDisplay fill={fill} height={height} width={width} />;
    } else {
      return cannotHappen(partyName);
    }
  } else {
    return cannotHappen(field);
  }
};
