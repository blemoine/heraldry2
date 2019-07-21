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
import { BendyDisplay } from './fields/BendyDisplay';
import { PalyDisplay } from './fields/PalyDisplay';
import { BarryDisplay } from './fields/BarryDisplay';
import { BendySinisterDisplay } from './fields/BendySinisterDisplay';
import { ChequyDisplay } from './fields/ChequyDisplay';

type Props = { height: number; width: number; field: Field; fillFromTincture: (tincture: Tincture) => string };
export const FieldDisplay = ({ field, height, width, fillFromTincture }: Props) => {
  function fillFromTincturePair(arr: [Tincture, Tincture]): [string, string] {
    return [fillFromTincture(arr[0]), fillFromTincture(arr[1])];
  }

  if (field.kind === 'plain') {
    return <Plain fill={fillFromTincture(field.tincture)} height={height} width={width} />;
  } else if (field.kind === 'party') {
    const partyName = field.per.name;
    const fill: [string, string] = fillFromTincturePair(field.per.tinctures);
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
  } else if (field.kind === 'bendy') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);
    return <BendyDisplay fill={fill} width={width} height={height} />;
  } else if (field.kind === 'bendySinister') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);
    return <BendySinisterDisplay fill={fill} width={width} height={height} />;
  } else if (field.kind === 'paly') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);
    return <PalyDisplay fill={fill} width={width} height={height} />;
  } else if (field.kind === 'barry') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);
    return <BarryDisplay fill={fill} number={field.number} width={width} height={height} />;
  } else if (field.kind === 'chequy') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);
    return <ChequyDisplay fill={fill} width={width} height={height} />;
  } else {
    return cannotHappen(field);
  }
};
