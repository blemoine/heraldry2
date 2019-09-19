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
import { Dimension } from '../../model/dimension';
import { LozengyDisplay } from './fields/LozengyDisplay';
import { PalyPilyDisplay } from './fields/PalyPilyDisplay';
import { BarryPilyDisplay } from './fields/BarryPilyDisplay';
import { ChevronnyDisplay } from './fields/ChevronnyDisplay';
import { SimpleBlasonShape } from './blasonDisplay.helper';
import { BendyPilyDisplay } from './fields/BendyPilyDisplay';
import { BendyPilySinisterDisplay } from './fields/BendyPilySinisterDisplay';

type Props = {
  dimension: Dimension;
  field: Field;
  shape: SimpleBlasonShape;
  fillFromTincture: (tincture: Tincture) => string;
};
export const FieldDisplay = ({ field, dimension, fillFromTincture, shape }: Props) => {
  function fillFromTincturePair(arr: [Tincture, Tincture]): [string, string] {
    return [fillFromTincture(arr[0]), fillFromTincture(arr[1])];
  }

  if (field.kind === 'plain') {
    return <Plain fill={fillFromTincture(field.tincture)} dimension={dimension} />;
  } else if (field.kind === 'party') {
    const partyName = field.per.name;
    const fill: [string, string] = fillFromTincturePair(field.per.tinctures);
    if (partyName === 'bend') {
      return <BendDisplay fill={fill} dimension={dimension} line={field.per.line} />;
    } else if (partyName === 'bendSinister') {
      return <BendSinisterDisplay fill={fill} dimension={dimension} line={field.per.line} />;
    } else if (partyName === 'chevron') {
      return <ChevronDisplay fill={fill} dimension={dimension} line={field.per.line} />;
    } else if (partyName === 'fess') {
      return <FessDisplay fill={fill} dimension={dimension} line={field.per.line} />;
    } else if (partyName === 'pale') {
      return <PaleDisplay fill={fill} dimension={dimension} line={field.per.line} />;
    } else if (partyName === 'cross') {
      return <CrossDisplay fill={fill} dimension={dimension} line={field.per.line} />;
    } else if (partyName === 'saltire') {
      return <SaltireDisplay fill={fill} dimension={dimension} line={field.per.line} />;
    } else {
      return cannotHappen(partyName);
    }
  } else if (field.kind === 'bendy') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);

    let updatedDimension: Dimension;
    if (shape === 'default') {
      updatedDimension = dimension;
    } else if (shape === 'square' || shape === 'rightCut') {
      updatedDimension = { width: dimension.width, height: dimension.height * 1.2 };
    } else if (shape === 'leftCut') {
      updatedDimension = { width: dimension.width, height: dimension.height * 0.87 };
    } else {
      return cannotHappen(shape);
    }

    return <BendyDisplay fill={fill} dimension={updatedDimension} number={field.number} />;
  } else if (field.kind === 'bendySinister') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);

    let updatedDimension: Dimension;
    if (shape === 'default') {
      updatedDimension = dimension;
    } else if (shape === 'square' || shape === 'leftCut') {
      updatedDimension = { width: dimension.width, height: dimension.height * 1.2 };
    } else if (shape === 'rightCut') {
      updatedDimension = { width: dimension.width, height: dimension.height * 0.8 };
    } else {
      return cannotHappen(shape);
    }

    return <BendySinisterDisplay fill={fill} dimension={updatedDimension} number={field.number} />;
  } else if (field.kind === 'paly') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);
    return <PalyDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'barry') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);
    return <BarryDisplay fill={fill} number={field.number} dimension={dimension} />;
  } else if (field.kind === 'chequy') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);
    return <ChequyDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'lozengy') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);
    return <LozengyDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'paly-pily') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);
    return <PalyPilyDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'barry-pily') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);
    return <BarryPilyDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'bendy-pily') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);
    return <BendyPilyDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'bendy-pily-sinister') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);
    return <BendyPilySinisterDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'chevronny') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);
    return <ChevronnyDisplay fill={fill} dimension={dimension} />;
  } else {
    return cannotHappen(field);
  }
};
