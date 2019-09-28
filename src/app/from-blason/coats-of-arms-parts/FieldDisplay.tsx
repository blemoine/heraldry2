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
import { GironnyDisplay } from './fields/GironnyDisplay';
import { PallFieldDisplay } from './fields/PallFieldDisplay';
import { convertToOlfFillFronTincture, FillFromTincture } from '../fillFromTincture.helper';

type Props = {
  dimension: Dimension;
  field: Field;
  shape: SimpleBlasonShape;
  fillFromTincture: FillFromTincture;
};
export const FieldDisplay = ({ field, dimension, fillFromTincture, shape }: Props) => {
  const oldFillFronTincture = convertToOlfFillFronTincture(fillFromTincture);
  function fillFromTincturePair(arr: [Tincture, Tincture]): [string, string] {
    return [oldFillFronTincture(arr[0]), oldFillFronTincture(arr[1])];
  }
  function fillFromTinctureTriplet(arr: [Tincture, Tincture, Tincture]): [string, string, string] {
    return [oldFillFronTincture(arr[0]), oldFillFronTincture(arr[1]), oldFillFronTincture(arr[2])];
  }

  if (field.kind === 'plain') {
    return <Plain fill={oldFillFronTincture(field.tincture)} dimension={dimension} />;
  } else if (field.kind === 'party') {
    if (field.per.name === 'pall') {
      const fill: [string, string, string] = fillFromTinctureTriplet(field.per.tinctures);
      return <PallFieldDisplay fill={fill} dimension={dimension} line={field.per.line} />;
    } else {
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
    }
  } else if (field.kind === 'bendy') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);

    let updatedDimension: Dimension;
    if (shape === 'default') {
      updatedDimension = dimension;
    } else if (shape === 'square' || shape === 'rightCut') {
      updatedDimension = { width: dimension.width, height: dimension.height * 1.4 };
    } else if (shape === 'leftCut') {
      updatedDimension = { width: dimension.width, height: dimension.height * 0.68 };
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
      updatedDimension = { width: dimension.width, height: dimension.height * 1.4 };
    } else if (shape === 'rightCut') {
      updatedDimension = { width: dimension.width, height: dimension.height * 0.68 };
    } else {
      return cannotHappen(shape);
    }

    return <BendySinisterDisplay fill={fill} dimension={updatedDimension} number={field.number} />;
  } else if (field.kind === 'paly') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);
    return <PalyDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'barry') {
    return (
      <BarryDisplay field={field} fillFromTincture={fillFromTincture} number={field.number} dimension={dimension} />
    );
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
  } else if (field.kind === 'gironny') {
    const fill: [string, string] = fillFromTincturePair(field.tinctures);
    return <GironnyDisplay fill={fill} dimension={dimension} number={field.number} />;
  } else {
    return cannotHappen(field);
  }
};
