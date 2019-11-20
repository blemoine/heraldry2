import { Field } from '../../model/field';
import { FurConfiguration } from './FurPatternDef';
import { Dimension } from '../../model/dimension';
import { cannotHappen } from '../../../utils/cannot-happen';

export function getFurConfiguration(field: Field, { width }: Dimension): FurConfiguration {
  if (field.kind === 'plain' || field.kind === 'party') {
    return {
      ermine: { spotWidth: width / 9, heightMarginScale: 0.45, widthMarginScale: 0 },
      vair: { bellWidth: width / 5, bellHeightRatio: 2 },
      potent: { bellWidth: width / 2.75, bellHeightRatio: 1 },
    };
  } else if (field.kind === 'bendy' || field.kind === 'bendySinister') {
    if (field.number === 10) {
      return {
        ermine: { spotWidth: width / 25, heightMarginScale: 0, widthMarginScale: 6 },
        vair: { bellWidth: width / 12, bellHeightRatio: 2 },
        potent: { bellWidth: width / 10, bellHeightRatio: 1 },
      };
    } else if (field.number === 8) {
      return {
        ermine: { spotWidth: width / 20, heightMarginScale: 0, widthMarginScale: 4 },
        vair: { bellWidth: width / 10, bellHeightRatio: 2 },
        potent: { bellWidth: width / 8, bellHeightRatio: 1 },
      };
    } else if (field.number === 6) {
      return {
        ermine: { spotWidth: width / 18, heightMarginScale: 0, widthMarginScale: 2.5 },
        vair: { bellWidth: width / 10, bellHeightRatio: 2 },
        potent: { bellWidth: width / 8, bellHeightRatio: 1 },
      };
    } else {
      return cannotHappen(field.number);
    }
  } else if (field.kind === 'paly') {
    return {
      ermine: { spotWidth: width / 18, heightMarginScale: 0.45, widthMarginScale: 0 },
      vair: { bellWidth: width / 12, bellHeightRatio: 2 },
      potent: { bellWidth: width / 10.5, bellHeightRatio: 1 },
    };
  } else if (field.kind === 'barry') {
    let furConfiguration: FurConfiguration;
    if (field.number === 6) {
      furConfiguration = {
        potent: { bellHeightRatio: 0.82, bellWidth: width / 5.5 },
        vair: { bellHeightRatio: 1, bellWidth: width / 9 },
        ermine: { spotWidth: width / 13, widthMarginScale: 0, heightMarginScale: 0.4 },
      };
    } else if (field.number === 8) {
      furConfiguration = {
        potent: { bellHeightRatio: 0.92, bellWidth: width / 5.5 },
        vair: { bellHeightRatio: 1.666, bellWidth: width / 10 },
        ermine: { spotWidth: width / 17, widthMarginScale: 0, heightMarginScale: 0.37 },
      };
    } else if (field.number === 10) {
      furConfiguration = {
        potent: { bellHeightRatio: 0.735, bellWidth: width / 5.5 },
        vair: { bellHeightRatio: 1.33, bellWidth: width / 10 },
        ermine: { spotWidth: width / 18, widthMarginScale: 0, heightMarginScale: 0 },
      };
    } else {
      cannotHappen(field.number);
    }
    return furConfiguration;
  } else if (field.kind === 'barry-and-per-pale' || field.kind === 'chequy' || field.kind === 'quarterly-of-nine') {
    return {
      ermine: { spotWidth: width / 18, heightMarginScale: 0.23, widthMarginScale: 0 },
      vair: { bellWidth: width / 12, bellHeightRatio: 1.78 },
      potent: { bellWidth: width / 10.5, bellHeightRatio: 0.93 },
    };
  } else if (
    field.kind === 'bendy-and-per-bend-sinister' ||
    field.kind === 'bendy-sinister-and-per-bend' ||
    field.kind === 'bendy-and-per-pale' ||
    field.kind === 'lozengy' ||
    field.kind === 'lozengy-bendwise'
  ) {
    return {
      ermine: { spotWidth: width / 29, heightMarginScale: 0, widthMarginScale: 0 },
      vair: { bellWidth: width / 20, bellHeightRatio: 2 },
      potent: { bellWidth: width / 15, bellHeightRatio: 1 },
    };
  } else if (
    field.kind === 'paly-pily' ||
    field.kind === 'barry-pily' ||
    field.kind === 'bendy-pily' ||
    field.kind === 'bendy-pily-sinister' ||
    field.kind === 'chevronny' ||
    field.kind === 'chevronny-reversed' ||
    field.kind === 'embrassee-a-dexter' ||
    field.kind === 'embrassee-a-sinister' ||
    field.kind === 'lozenge-throughout' ||
    field.kind === 'lozenge-throughout-arched' ||
    field.kind === 'barry-and-per-chevron-throughout' ||
    field.kind === 'gironny' ||
    field.kind === 'gironny-arrondi' ||
    field.kind === 'tierced'
  ) {
    return {
      ermine: { spotWidth: width / 19, heightMarginScale: 0, widthMarginScale: 0 },
      vair: { bellWidth: width / 12, bellHeightRatio: 2 },
      potent: { bellWidth: width / 9, bellHeightRatio: 1 },
    };
  } else {
    return cannotHappen(field);
  }
}
