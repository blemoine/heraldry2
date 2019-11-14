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
import { FurConfiguration, getPatternId, WithFurPatternDef } from './FurPatternDef';
import { ConfigurationContext, fillFromConfiguration } from '../configuration/ConfigurationContext';

type Props = {
  dimension: Dimension;
  field: Field;
  shape: SimpleBlasonShape;
  fillFromTincture: FillFromTincture;
};

export const FieldDisplay = ({ field, dimension, fillFromTincture, shape }: Props) => {
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
  const defaultFurConfiguration: FurConfiguration = {
    ermine: { spotWidth: width / 9, heightMarginScale: 0.45, widthMarginScale: 0 },
    vair: { bellWidth: width / 5, bellHeightRatio: 2 },
    potent: { bellWidth: width / 2.75, bellHeightRatio: 1 },
  };
  const smallFurConfiguration: FurConfiguration = {
    ermine: { spotWidth: width / 19, heightMarginScale: 0, widthMarginScale: 0 },
    vair: { bellWidth: width / 12, bellHeightRatio: 2 },
    potent: { bellWidth: width / 9, bellHeightRatio: 1 },
  };
  if (field.kind === 'plain') {
    const fill = fillFromConfiguration(tinctureConfiguration, field.tincture, patternId);
    return (
      <WithFurPatternDef field={field} furConfiguration={defaultFurConfiguration}>
        <PlainDisplay fill={fill} dimension={dimension} />
      </WithFurPatternDef>
    );
  } else {
    if (field.kind === 'party') {
      const line = field.per.line;
      if (field.per.name === 'pall') {
        const fill: [string, string, string] = fillFromConfigurationTriplet(field.per.tinctures);
        return <PallFieldDisplay fill={fill} dimension={dimension} line={line} />;
      } else {
        const partyName = field.per.name;
        const fill = fillFromConfigurationPair(field.per.tinctures);
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
      const fill: [string, string, string] = fillFromConfigurationTriplet(field.per.tinctures);
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

      let furConfiguration: FurConfiguration;
      if (field.number === 10) {
        furConfiguration = {
          ermine: { spotWidth: width / 25, heightMarginScale: 0, widthMarginScale: 6 },
          vair: { bellWidth: width / 12, bellHeightRatio: 2 },
          potent: { bellWidth: width / 10, bellHeightRatio: 1 },
        };
      } else if (field.number === 8) {
        furConfiguration = {
          ermine: { spotWidth: width / 20, heightMarginScale: 0, widthMarginScale: 4 },
          vair: { bellWidth: width / 10, bellHeightRatio: 2 },
          potent: { bellWidth: width / 8, bellHeightRatio: 1 },
        };
      } else if (field.number === 6) {
        furConfiguration = {
          ermine: { spotWidth: width / 18, heightMarginScale: 0, widthMarginScale: 2.5 },
          vair: { bellWidth: width / 10, bellHeightRatio: 2 },
          potent: { bellWidth: width / 8, bellHeightRatio: 1 },
        };
      } else {
        return cannotHappen(field.number);
      }
      const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
      const transform = field.kind === 'bendySinister' ? `scale(-1,1) translate(-${updatedDimension.width} 0)` : '';
      return (
        <WithFurPatternDef field={field} furConfiguration={furConfiguration}>
          <g transform={`${transform}`}>
            <BendyDisplay
              fills={fill}
              line={field.line}
              fillFromTincture={fillFromTincture}
              dimension={updatedDimension}
              number={field.number}
            />
          </g>
        </WithFurPatternDef>
      );
    } else if (field.kind === 'paly') {
      const furConfiguration: FurConfiguration = {
        ermine: { spotWidth: width / 18, heightMarginScale: 0.45, widthMarginScale: 0 },
        vair: { bellWidth: width / 12, bellHeightRatio: 2 },
        potent: { bellWidth: width / 10.5, bellHeightRatio: 1 },
      };

      const fill = fillFromConfigurationPair(field.tinctures, patternId);
      return (
        <WithFurPatternDef field={field} furConfiguration={furConfiguration}>
          <PalyDisplay fill={fill} dimension={dimension} />
        </WithFurPatternDef>
      );
    } else if (field.kind === 'barry') {
      return (
        <BarryDisplay field={field} fillFromTincture={fillFromTincture} number={field.number} dimension={dimension} />
      );
    } else if (field.kind === 'barry-and-per-pale' || field.kind === 'chequy' || field.kind === 'quarterly-of-nine') {
      const fill = fillFromConfigurationPair(field.tinctures, patternId);

      const furConfiguration: FurConfiguration = {
        ermine: { spotWidth: width / 18, heightMarginScale: 0.23, widthMarginScale: 0 },
        vair: { bellWidth: width / 12, bellHeightRatio: 1.78 },
        potent: { bellWidth: width / 10.5, bellHeightRatio: 0.93 },
      };
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
      return (
        <WithFurPatternDef field={field} furConfiguration={furConfiguration}>
          <AlternatingSquareDisplay fill={fill} dimension={dimension} columns={columns} rows={rows} />
        </WithFurPatternDef>
      );
    } else if (field.kind === 'barry-and-per-chevron-throughout') {
      const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
      return (
        <WithFurPatternDef field={field} furConfiguration={smallFurConfiguration}>
          <BarryAndPerChevronThrougoutDisplay fill={fill} dimension={dimension} rows={6} />
        </WithFurPatternDef>
      );
    } else if (field.kind === 'bendy-and-per-bend-sinister' || field.kind === 'bendy-sinister-and-per-bend') {
      const transform: string =
        field.kind === 'bendy-sinister-and-per-bend' ? `scale(-1,1) translate(-${width} 0)` : '';
      return (
        <g transform={transform}>
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
      const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
      const furConfiguration: FurConfiguration = {
        ermine: { spotWidth: width / 29, heightMarginScale: 0, widthMarginScale: 0 },
        vair: { bellWidth: width / 20, bellHeightRatio: 2 },
        potent: { bellWidth: width / 15, bellHeightRatio: 1 },
      };

      return (
        <WithFurPatternDef field={field} furConfiguration={furConfiguration}>
          <LozengyDisplay fill={fill} dimension={dimension} />
        </WithFurPatternDef>
      );
    } else if (field.kind === 'lozengy-bendwise') {
      const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
      const furConfiguration: FurConfiguration = {
        ermine: { spotWidth: width / 29, heightMarginScale: 0, widthMarginScale: 0 },
        vair: { bellWidth: width / 20, bellHeightRatio: 2 },
        potent: { bellWidth: width / 15, bellHeightRatio: 1 },
      };

      return (
        <WithFurPatternDef field={field} furConfiguration={furConfiguration}>
          <LozengyBendwiseDisplay fill={fill} dimension={dimension} />
        </WithFurPatternDef>
      );
    } else if (field.kind === 'paly-pily') {
      const fill: [string, string] = fillFromConfigurationPair(field.tinctures);
      return <PalyPilyDisplay fill={fill} dimension={dimension} />;
    } else if (field.kind === 'barry-pily') {
      const fill: [string, string] = fillFromConfigurationPair(field.tinctures);
      return <BarryPilyDisplay fill={fill} dimension={dimension} />;
    } else if (field.kind === 'bendy-pily') {
      const fill: [string, string] = fillFromConfigurationPair(field.tinctures);
      return <BendyPilyDisplay fill={fill} dimension={dimension} />;
    } else if (field.kind === 'bendy-pily-sinister') {
      const fill: [string, string] = fillFromConfigurationPair(field.tinctures);
      return <BendyPilySinisterDisplay fill={fill} dimension={dimension} />;
    } else if (field.kind === 'chevronny') {
      const fill: [string, string] = fillFromConfigurationPair(field.tinctures);
      let updatedDimension: Dimension;
      if (shape === 'square' || shape === 'default') {
        updatedDimension = dimension;
      } else if (shape === 'leftCut' || shape === 'rightCut') {
        updatedDimension = { width: width, height: height * 0.8 };
      } else {
        return cannotHappen(shape);
      }

      return <ChevronnyDisplay fill={fill} dimension={updatedDimension} />;
    } else if (field.kind === 'chevronny-reversed') {
      const fill: [string, string] = fillFromConfigurationPair(field.tinctures);
      let updatedDimension: Dimension;
      if (shape === 'square' || shape === 'default') {
        updatedDimension = dimension;
      } else if (shape === 'leftCut' || shape === 'rightCut') {
        updatedDimension = { width: width, height: height * 0.8 };
      } else {
        return cannotHappen(shape);
      }
      return <ChevronnyReversedDisplay fill={fill} dimension={updatedDimension} />;
    } else if (field.kind === 'embrassee-a-dexter') {
      const fill: [string, string] = fillFromConfigurationPair(field.tinctures);
      return <EmbrasseeDexterDisplay fill={fill} dimension={dimension} />;
    } else if (field.kind === 'embrassee-a-sinister') {
      const fill: [string, string] = fillFromConfigurationPair(field.tinctures);
      return <EmbrasseeSinisterDisplay fill={fill} dimension={dimension} />;
    } else if (field.kind === 'lozenge-throughout') {
      const fill: [string, string] = fillFromConfigurationPair(field.tinctures);
      let updatedDimension: Dimension;
      if (shape === 'square' || shape === 'default') {
        updatedDimension = dimension;
      } else if (shape === 'leftCut' || shape === 'rightCut') {
        updatedDimension = { width: width, height: height * 0.75 };
      } else {
        return cannotHappen(shape);
      }

      return <LozengeThroughoutDisplay fill={fill} dimension={updatedDimension} />;
    } else if (field.kind === 'lozenge-throughout-arched') {
      const fill: [string, string] = fillFromConfigurationPair(field.tinctures);

      let updatedDimension: Dimension;
      if (shape === 'square' || shape === 'default') {
        updatedDimension = dimension;
      } else if (shape === 'leftCut' || shape === 'rightCut') {
        updatedDimension = { width: width, height: height * 0.75 };
      } else {
        return cannotHappen(shape);
      }

      return <LozengeThroughoutArchedDisplay fill={fill} dimension={updatedDimension} />;
    } else if (field.kind === 'gironny') {
      const fill: [string, string] = fillFromConfigurationPair(field.tinctures, patternId);
      return (
        <WithFurPatternDef field={field} furConfiguration={smallFurConfiguration}>
          <GironnyDisplay fill={fill} dimension={dimension} number={field.number} />
        </WithFurPatternDef>
      );
    } else {
      return cannotHappen(field);
    }
  }
};
