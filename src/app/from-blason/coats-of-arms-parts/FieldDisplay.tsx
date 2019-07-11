import { Field } from '../../model/blason';
import { cannotHappen } from '../../../utils/cannot-happen';
import { Plain } from './fields/Plain';
import * as React from 'react';
import { Tincture } from '../../model/tincture';
import { PaleDisplay } from './fields/PaleDisplay';

type Props = { height: number; width: number; field: Field; fillFromTincture: (tincture: Tincture) => string };
export const FieldDisplay = ({ field, height, width, fillFromTincture }: Props) => {
  if (field.kind === 'plain') {
    return <Plain fill={fillFromTincture(field.tincture)} height={height} width={width} />;
  } else if (field.kind === 'party') {
    const partyName = field.per.name;
    const tinctures = field.per.tinctures;
    const fill: [string, string] = [fillFromTincture(tinctures[0]), fillFromTincture(tinctures[1])];
    if (partyName === 'bend') {
      return <Plain fill={'pink'} height={height} width={width} />;
    } else if (partyName === 'chevron') {
      return <Plain fill={'pink'} height={height} width={width} />;
    } else if (partyName === 'fess') {
      return <Plain fill={'pink'} height={height} width={width} />;
    } else if (partyName === 'pale') {
      return <PaleDisplay fill={fill} height={height} width={width} />;
    } else {
      return cannotHappen(partyName);
    }
  } else {
    return cannotHappen(field);
  }
};
