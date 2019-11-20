import { Field } from '../../model/field';
import { cannotHappen } from '../../../utils/cannot-happen';
import { PlainDisplay } from './fields/Plain';
import * as React from 'react';
import { useContext } from 'react';
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
import { FillFromTincture } from '../fillFromTincture.helper';
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
import { getPatternId, WithFurPatternDef } from './FurPatternDef';
import { ConfigurationContext, fillFromConfiguration } from '../configuration/ConfigurationContext';
import { getFurConfiguration } from './field.helper';
import { GironnyArrondiDisplay } from './fields/GironnyArrondiDisplay';

type Props = {
  dimension: Dimension;
  field: Field;
  shape: SimpleBlasonShape;
  fillFromTincture: FillFromTincture;
};

export const FieldDisplay = ({ field, dimension, fillFromTincture, shape }: Props) => {
  const furConfiguration = getFurConfiguration(field, dimension);
  return (
    <WithFurPatternDef field={field} furConfiguration={furConfiguration}>
      <FieldDisplayDispatch dimension={dimension} field={field} shape={shape} fillFromTincture={fillFromTincture} />
    </WithFurPatternDef>
  );
};

const FieldDisplayDispatch = ({ field, dimension, fillFromTincture, shape }: Props) => {
  const { tinctureConfiguration } = useContext(ConfigurationContext);

  const patternId = getPatternId(field);
  function fillFromConfigurationPair(tinctures: [Tincture, Tincture], patternId?: string): [string, string] {
    return [
      fillFromConfiguration(tinctureConfiguration, tinctures[0], patternId || null),
      fillFromConfiguration(tinctureConfiguration, tinctures[1], patternId || null),
    ];
  }
  function fillFromConfigurationTriplet(
    tinctures: [Tincture, Tincture, Tincture],
    patternId?: string
  ): [string, string, string] {
    return [
      fillFromConfiguration(tinctureConfiguration, tinctures[0], patternId || null),
      fillFromConfiguration(tinctureConfiguration, tinctures[1], patternId || null),
      fillFromConfiguration(tinctureConfiguration, tinctures[2], patternId || null),
    ];
  }

  const width = dimension.width;
  const height = dimension.height;
  if (field.kind === 'plain') {
    const fill = fillFromConfiguration(tinctureConfiguration, field.tincture, patternId);
    return <PlainDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'party') {
    const line = field.per.line;
    if (field.per.name === 'pall') {
      const fill: [string, string, string] = fillFromConfigurationTriplet(field.per.tinctures);
      return <PallFieldDisplay fill={fill} dimension={dimension} line={line} />;
    } else {
      const partyName = field.per.name;
      const fill = fillFromConfigurationPair(field.per.tinctures, patternId);
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
          updatedDimension = { width: width, height: height * 0.75 };
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
          updatedDimension = { width: width, height: height * 0.75 };
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
    const fill: [string, string, string] = fillFromConfigurationTriplet(field.per.tinctures, patternId);
    const line = field.per.line;
    if (partyName === 'fess') {
      return <FessTiercedDisplay fill={fill} dimension={dimension} line={line} />;
    } else if (partyName === 'pale') {
      return <PaleTiercedDisplay fill={fill} dimension={dimension} line={line} />;
    } else {
      return cannotHappen(partyName);
    }
  } else if (field.kind === 'bendy' || field.kind === 'bendySinister') {
    let updatedDimension: Dimension;
    if (shape === 'default') {
      updatedDimension = dimension;
    } else if (shape === 'square') {
      updatedDimension = { width, height: height * 1.1 };
    } else if (shape === 'rightCut') {
      if (field.kind === 'bendy') {
        updatedDimension = { width, height: height * 1.1 };
      } else if (field.kind === 'bendySinister') {
        updatedDimension = { width, height: height * 0.9 };
      } else {
        cannotHappen(field);
      }
    } else if (shape === 'leftCut') {
      if (field.kind === 'bendy') {
        updatedDimension = { width, height: height * 0.9 };
      } else if (field.kind === 'bendySinister') {
        updatedDimension = { width, height: height * 1.1 };
      } else {
        cannotHappen(field);
      }
    } else {
      return cannotHappen(shape);
    }

    const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
    const transform = field.kind === 'bendySinister' ? `scale(-1,1) translate(-${updatedDimension.width} 0)` : '';
    return (
      <g transform={`${transform}`}>
        <BendyDisplay
          fills={fill}
          line={field.line}
          fillFromTincture={fillFromTincture}
          dimension={updatedDimension}
          number={field.number}
        />
      </g>
    );
  } else if (field.kind === 'paly') {
    const fill = fillFromConfigurationPair(field.tinctures, patternId);
    return <PalyDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'barry') {
    const fill = fillFromConfigurationPair(field.tinctures, patternId);

    return <BarryDisplay fill={fill} line={field.line} number={field.number} dimension={dimension} />;
  } else if (field.kind === 'barry-and-per-pale' || field.kind === 'chequy' || field.kind === 'quarterly-of-nine') {
    const fill = fillFromConfigurationPair(field.tinctures, patternId);

    let rows: number;
    let columns: number;
    if (field.kind === 'barry-and-per-pale') {
      columns = 2;
      rows = 6;
    } else if (field.kind === 'chequy') {
      columns = 6;
      rows = 6;
    } else if (field.kind === 'quarterly-of-nine') {
      columns = 3;
      rows = 3;
    } else {
      cannotHappen(field);
    }
    return <AlternatingSquareDisplay fill={fill} dimension={dimension} columns={columns} rows={rows} />;
  } else if (field.kind === 'barry-and-per-chevron-throughout') {
    const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
    return <BarryAndPerChevronThrougoutDisplay fill={fill} dimension={dimension} rows={6} />;
  } else if (field.kind === 'bendy-and-per-bend-sinister' || field.kind === 'bendy-sinister-and-per-bend') {
    const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
    const transform: string = field.kind === 'bendy-sinister-and-per-bend' ? `scale(-1,1) translate(-${width} 0)` : '';

    return (
      <g transform={transform}>
        <BendyAndPerBendSinisterDisplay fill={fill} dimension={dimension} rows={10} />
      </g>
    );
  } else if (field.kind === 'bendy-and-per-pale') {
    const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
    return <BendyAndPerPaleDisplay fill={fill} dimension={dimension} rows={10} />;
  } else if (field.kind === 'lozengy') {
    const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);

    return <LozengyDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'lozengy-bendwise') {
    const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);

    return <LozengyBendwiseDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'paly-pily') {
    const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
    return <PalyPilyDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'barry-pily') {
    const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
    return <BarryPilyDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'bendy-pily') {
    const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
    return <BendyPilyDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'bendy-pily-sinister') {
    const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
    return <BendyPilySinisterDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'chevronny' || field.kind === 'chevronny-reversed') {
    const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
    let updatedDimension: Dimension;
    if (shape === 'square' || shape === 'default') {
      updatedDimension = dimension;
    } else if (shape === 'leftCut' || shape === 'rightCut') {
      updatedDimension = { width: width, height: height * 0.8 };
    } else {
      return cannotHappen(shape);
    }
    if (field.kind === 'chevronny-reversed') {
      return <ChevronnyReversedDisplay fill={fill} dimension={updatedDimension} />;
    } else if (field.kind === 'chevronny') {
      return <ChevronnyDisplay fill={fill} dimension={updatedDimension} />;
    } else {
      cannotHappen(field);
    }
  } else if (field.kind === 'embrassee-a-dexter') {
    const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
    return <EmbrasseeDexterDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'embrassee-a-sinister') {
    const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
    return <EmbrasseeSinisterDisplay fill={fill} dimension={dimension} />;
  } else if (field.kind === 'lozenge-throughout' || field.kind === 'lozenge-throughout-arched') {
    const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
    let updatedDimension: Dimension;
    if (shape === 'square' || shape === 'default') {
      updatedDimension = dimension;
    } else if (shape === 'leftCut' || shape === 'rightCut') {
      updatedDimension = { width: width, height: height * 0.75 };
    } else {
      return cannotHappen(shape);
    }
    if (field.kind === 'lozenge-throughout') {
      return <LozengeThroughoutDisplay fill={fill} dimension={updatedDimension} />;
    } else if (field.kind === 'lozenge-throughout-arched') {
      return <LozengeThroughoutArchedDisplay fill={fill} dimension={updatedDimension} />;
    } else {
      cannotHappen(field);
    }
  } else if (field.kind === 'gironny') {
    const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
    return <GironnyDisplay fill={fill} dimension={dimension} number={field.number} />;
  } else if (field.kind === 'gironny-arrondi') {
    const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
    return <GironnyArrondiDisplay fill={fill} dimension={dimension} number={field.number} />;
  } else {
    return cannotHappen(field);
  }
};
