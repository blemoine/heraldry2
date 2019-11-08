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
import { QuarterlyOfNineDisplay } from './fields/QuarterlyOfNineDisplay';
import { LozengyBendwiseDisplay } from './fields/LozengyBendwiseDisplay';
import { FessTiercedDisplay } from './fields/FessTiercedDisplay';
import { PaleTiercedDisplay } from './fields/PaleTiercedDisplay';
import { EmbrasseeDexterDisplay } from './fields/EmbrasseeDexterDisplay';
import { EmbrasseeSinisterDisplay } from './fields/EmbrasseeSinisterDisplay';
import { ChevronReversedDisplay } from './fields/ChevronReversedDisplay';
import { LozengeThroughoutDisplay } from './fields/LozengeThroughoutDisplay';
import { LozengeThroughoutArchedDisplay } from './fields/LozengeThroughoutArchedDisplay';
import { ChevronnyReversedDisplay } from './fields/ChevronnyReversedDisplay';
import { PileDisplay } from './fields/PileDisplay';
import { PileArchedDisplay } from './fields/PileArchedDisplay';
import { PileReversedDisplay } from './fields/PileReversedDisplay';
import { PileReversedArchedDisplay } from './fields/PileReversedArchedDisplay';
import { PileBendwiseDisplay } from './fields/PileBendwiseDisplay';
import { PileBendwiseSinisterDisplay } from './fields/PileSinisterBendwiseDisplay';
import { AlternatingSquareDisplay } from './fields/AlternatingSquareDisplay';
import { BarryAndPerChevronThrougoutDisplay } from './fields/BarryAndPerChevronThrougoutDisplay';
import { BendyAndPerBendSinisterDisplay } from './fields/BendyAndPerBendSinisterDisplay';
import { BendyAndPerPaleDisplay } from './fields/BendyAndPerPaleDisplay';

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
  } else {
    if (field.kind === 'party') {
      const line = field.per.line;
      if (field.per.name === 'pall') {
        const fill: [string, string, string] = fillFromTinctureTriplet(field.per.tinctures);
        return <PallFieldDisplay fill={fill} dimension={dimension} line={line} />;
      } else {
        const partyName = field.per.name;
        const fill: [string, string] = fillFromTincturePair(field.per.tinctures);
        if (partyName === 'bend') {
          return <BendDisplay fill={fill} dimension={dimension} line={line} />;
        } else if (partyName === 'bendSinister') {
          return <BendSinisterDisplay fill={fill} dimension={dimension} line={line} />;
        } else if (partyName === 'chevron') {
          return <ChevronDisplay fill={fill} dimension={dimension} line={line} />;
        } else if (partyName === 'chevron-reversed') {
          return <ChevronReversedDisplay fill={fill} dimension={dimension} line={line} />;
        } else if (partyName === 'fess') {
          return <FessDisplay fill={fill} dimension={dimension} line={line} />;
        } else if (partyName === 'pale') {
          return <PaleDisplay fill={fill} dimension={dimension} line={line} />;
        } else if (partyName === 'cross') {
          return <CrossDisplay fill={fill} dimension={dimension} line={line} />;
        } else if (partyName === 'saltire') {
          return <SaltireDisplay fill={fill} dimension={dimension} line={line} />;
        } else if (partyName === 'pile') {
          let updatedDimension: Dimension;
          if (shape === 'square' || shape === 'default') {
            updatedDimension = dimension;
          } else if (shape === 'leftCut' || shape === 'rightCut') {
            updatedDimension = { width: dimension.width, height: dimension.height * 0.75 };
          } else {
            return cannotHappen(shape);
          }
          return <PileDisplay fill={fill} dimension={updatedDimension} line={line} />;
        } else if (partyName === 'pile-reversed') {
          return <PileReversedDisplay fill={fill} dimension={dimension} line={line} />;
        } else if (partyName === 'pile-reversed-arched') {
          return <PileReversedArchedDisplay fill={fill} dimension={dimension} line={line} />;
        } else if (partyName === 'pile-bendwise') {
          return <PileBendwiseDisplay fill={fill} dimension={dimension} line={line} />;
        } else if (partyName === 'pile-bendwise-sinister') {
          return <PileBendwiseSinisterDisplay fill={fill} dimension={dimension} line={line} />;
        } else if (partyName === 'pile-arched') {
          let updatedDimension: Dimension;
          if (shape === 'square' || shape === 'default') {
            updatedDimension = dimension;
          } else if (shape === 'leftCut' || shape === 'rightCut') {
            updatedDimension = { width: dimension.width, height: dimension.height * 0.75 };
          } else {
            return cannotHappen(shape);
          }
          return <PileArchedDisplay fill={fill} dimension={updatedDimension} line={line} />;
        } else {
          return cannotHappen(partyName);
        }
      }
    } else if (field.kind === 'tierced') {
      const partyName = field.per.name;
      const fill: [string, string, string] = fillFromTinctureTriplet(field.per.tinctures);
      const line = field.per.line;
      if (partyName === 'fess') {
        return <FessTiercedDisplay fill={fill} dimension={dimension} line={line} />;
      } else if (partyName === 'pale') {
        return <PaleTiercedDisplay fill={fill} dimension={dimension} line={line} />;
      } else {
        return cannotHappen(partyName);
      }
    } else if (field.kind === 'bendy') {
      let updatedDimension: Dimension;
      if (shape === 'default') {
        updatedDimension = dimension;
      } else if (shape === 'square' || shape === 'rightCut') {
        updatedDimension = { width: dimension.width, height: dimension.height * 1.1 };
      } else if (shape === 'leftCut') {
        updatedDimension = { width: dimension.width, height: dimension.height * 0.9 };
      } else {
        return cannotHappen(shape);
      }

      return (
        <BendyDisplay
          field={field}
          fillFromTincture={fillFromTincture}
          dimension={updatedDimension}
          number={field.number}
        />
      );
    } else if (field.kind === 'bendySinister') {
      let updatedDimension: Dimension;
      if (shape === 'default') {
        updatedDimension = dimension;
      } else if (shape === 'square' || shape === 'leftCut') {
        updatedDimension = { width: dimension.width, height: dimension.height * 1.1 };
      } else if (shape === 'rightCut') {
        updatedDimension = { width: dimension.width, height: dimension.height * 0.9 };
      } else {
        return cannotHappen(shape);
      }
      return (
        <BendySinisterDisplay
          field={field}
          fillFromTincture={fillFromTincture}
          dimension={updatedDimension}
          number={field.number}
        />
      );
    } else if (field.kind === 'paly') {
      const fill: [string, string] = fillFromTincturePair(field.tinctures);
      return <PalyDisplay fill={fill} dimension={dimension} />;
    } else if (field.kind === 'barry') {
      return (
        <BarryDisplay field={field} fillFromTincture={fillFromTincture} number={field.number} dimension={dimension} />
      );
    } else if (field.kind === 'barry-and-per-pale') {
      const fill: [string, string] = fillFromTincturePair(field.tinctures);
      return <AlternatingSquareDisplay fill={fill} dimension={dimension} columns={2} rows={6} />;
    } else if (field.kind === 'chequy') {
      const fill: [string, string] = fillFromTincturePair(field.tinctures);
      return <AlternatingSquareDisplay fill={fill} dimension={dimension} rows={6} columns={6} />;
    } else if (field.kind === 'barry-and-per-chevron-throughout') {
      const fill: [string, string] = fillFromTincturePair(field.tinctures);
      return <BarryAndPerChevronThrougoutDisplay fill={fill} dimension={dimension} rows={6} />;
    } else if (field.kind === 'bendy-and-per-bend-sinister') {
      return (
        <BendyAndPerBendSinisterDisplay
          field={field}
          dimension={dimension}
          rows={10}
          fillFromTincture={fillFromTincture}
        />
      );
    } else if (field.kind === 'bendy-sinister-and-per-bend') {
      return (
        <g transform={`scale(-1,1) translate(-${dimension.width} 0)`}>
          <BendyAndPerBendSinisterDisplay
            field={field}
            dimension={dimension}
            rows={10}
            fillFromTincture={fillFromTincture}
          />
        </g>
      );
    } else if (field.kind === 'bendy-and-per-pale') {
      return (
        <BendyAndPerPaleDisplay field={field} dimension={dimension} rows={10} fillFromTincture={fillFromTincture} />
      );
    } else if (field.kind === 'lozengy') {
      const fill: [string, string] = fillFromTincturePair(field.tinctures);
      return <LozengyDisplay fill={fill} dimension={dimension} />;
    } else if (field.kind === 'lozengy-bendwise') {
      const fill: [string, string] = fillFromTincturePair(field.tinctures);
      return <LozengyBendwiseDisplay fill={fill} dimension={dimension} />;
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
      let updatedDimension: Dimension;
      if (shape === 'square' || shape === 'default') {
        updatedDimension = dimension;
      } else if (shape === 'leftCut' || shape === 'rightCut') {
        updatedDimension = { width: dimension.width, height: dimension.height * 0.8 };
      } else {
        return cannotHappen(shape);
      }

      return <ChevronnyDisplay fill={fill} dimension={updatedDimension} />;
    } else if (field.kind === 'chevronny-reversed') {
      const fill: [string, string] = fillFromTincturePair(field.tinctures);
      let updatedDimension: Dimension;
      if (shape === 'square' || shape === 'default') {
        updatedDimension = dimension;
      } else if (shape === 'leftCut' || shape === 'rightCut') {
        updatedDimension = { width: dimension.width, height: dimension.height * 0.8 };
      } else {
        return cannotHappen(shape);
      }
      return <ChevronnyReversedDisplay fill={fill} dimension={updatedDimension} />;
    } else if (field.kind === 'embrassee-a-dexter') {
      const fill: [string, string] = fillFromTincturePair(field.tinctures);
      return <EmbrasseeDexterDisplay fill={fill} dimension={dimension} />;
    } else if (field.kind === 'embrassee-a-sinister') {
      const fill: [string, string] = fillFromTincturePair(field.tinctures);
      return <EmbrasseeSinisterDisplay fill={fill} dimension={dimension} />;
    } else if (field.kind === 'lozenge-throughout') {
      const fill: [string, string] = fillFromTincturePair(field.tinctures);
      let updatedDimension: Dimension;
      if (shape === 'square' || shape === 'default') {
        updatedDimension = dimension;
      } else if (shape === 'leftCut' || shape === 'rightCut') {
        updatedDimension = { width: dimension.width, height: dimension.height * 0.75 };
      } else {
        return cannotHappen(shape);
      }

      return <LozengeThroughoutDisplay fill={fill} dimension={updatedDimension} />;
    } else if (field.kind === 'lozenge-throughout-arched') {
      const fill: [string, string] = fillFromTincturePair(field.tinctures);

      let updatedDimension: Dimension;
      if (shape === 'square' || shape === 'default') {
        updatedDimension = dimension;
      } else if (shape === 'leftCut' || shape === 'rightCut') {
        updatedDimension = { width: dimension.width, height: dimension.height * 0.75 };
      } else {
        return cannotHappen(shape);
      }

      return <LozengeThroughoutArchedDisplay fill={fill} dimension={updatedDimension} />;
    } else if (field.kind === 'gironny') {
      const fill: [string, string] = fillFromTincturePair(field.tinctures);
      return <GironnyDisplay fill={fill} dimension={dimension} number={field.number} />;
    } else if (field.kind === 'quarterly-of-nine') {
      const fill: [string, string] = fillFromTincturePair(field.tinctures);
      let updatedDimension: Dimension;
      if (shape === 'square' || shape === 'default') {
        updatedDimension = dimension;
      } else if (shape === 'leftCut' || shape === 'rightCut') {
        updatedDimension = { width: dimension.width, height: dimension.height * 0.8 };
      } else {
        return cannotHappen(shape);
      }
      return <QuarterlyOfNineDisplay fill={fill} dimension={updatedDimension} />;
    } else {
      return cannotHappen(field);
    }
  }
};
