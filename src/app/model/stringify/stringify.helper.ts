import { gules, or, Tincture } from '../tincture';
import { stringifyNumber, SupportedNumber } from '../countAndDisposition';
import { Ordinary } from '../ordinary';
import { cannotHappen } from '../../../utils/cannot-happen';
import { Party } from '../party';
import { Field } from '../field';
import { capitalizeFirstLetter } from '../../../utils/strings';
import { Charge } from '../charge';
import { Blason, SimpleBlason } from '../blason';
import { isNotNull } from '../../../utils/isNotNull';
import { isEqual } from 'lodash';

export function stringifyTincture(tincture: Tincture): string {
  if (tincture.name === 'counter-ermine') {
    return 'counter ermine';
  } else if (tincture.name === 'counter-vair') {
    return 'counter vair';
  } else if (tincture.name === 'vair-en-pale') {
    return 'vair en pale';
  } else if (tincture.name === 'vair-en-point') {
    return 'vair en point';
  } else if (tincture.name === 'counter-potent') {
    return 'counter potent';
  } else if (tincture.name === 'potent-en-pale') {
    return 'potent en pale';
  } else if (tincture.name === 'potent-en-point') {
    return 'potent en point';
  } else if (tincture.name === 'tenne') {
    return 'tenné';
  } else {
    return tincture.name;
  }
}

function stringifyOrdinal(i: number) {
  if (i === 1) {
    return '1st';
  } else if (i === 2) {
    return '2nd';
  } else if (i === 3) {
    return '3rd';
  } else if (i === 4) {
    return '4th';
  } else {
    throw new Error(`Number ${i} ordinal stringification is unsupported yet`);
  }
}

function pluralize(str: string, count: SupportedNumber): string {
  if (count === 1) {
    return str;
  } else {
    if (str === 'fleur de lys') {
      return 'fleurs de lys';
    } else if (str === 'cross') {
      return 'crosses';
    } else {
      return str + 's';
    }
  }
}

export function stringifyOrdinaryName(name: Ordinary['name']): string {
  if (name === 'bendSinister') {
    return 'bend sinister';
  } else {
    return name;
  }
}

function stringifyOrdinary(ordinary: Ordinary): string {
  if (ordinary.name === 'pale' || ordinary.name === 'chevron' || ordinary.name === 'chevronel') {
    let result = ordinary.count === 1 ? 'a' : stringifyNumber(ordinary.count);
    if (ordinary.count === 1) {
      result += ' ' + stringifyOrdinaryName(ordinary.name) + ' ';
    } else {
      if (ordinary.name === 'pale') {
        result += ' pallets ';
      } else if (ordinary.name === 'chevron') {
        result += ' chevrons ';
      } else if (ordinary.name === 'chevronel') {
        result += ' chevronels ';
      } else {
        return cannotHappen(ordinary);
      }
    }
    if (ordinary.line !== 'straight') {
      result += ordinary.line + ' ';
    }
    result += stringifyTincture(ordinary.tincture);
    return result;
  } else {
    let result = 'a ' + stringifyOrdinaryName(ordinary.name) + ' ';
    if (ordinary.line !== 'straight') {
      result += ordinary.line + ' ';
    }
    result += stringifyTincture(ordinary.tincture);
    return result;
  }
}

export function stringifyParty(partyName: Party['name']): string {
  if (partyName === 'bendSinister') {
    return 'bend sinister';
  } else if (
    partyName === 'bend' ||
    partyName === 'fess' ||
    partyName === 'pale' ||
    partyName === 'chevron' ||
    partyName === 'cross' ||
    partyName === 'saltire' ||
    partyName === 'pall'
  ) {
    return partyName;
  } else {
    return cannotHappen(partyName);
  }
}

export function stringifyFieldKind(field: Field['kind']): string {
  if (field === 'plain') {
    return 'plain';
  } else if (field === 'bendy') {
    return 'bendy';
  } else if (field === 'bendySinister') {
    return 'bendy sinister';
  } else if (field === 'paly') {
    return 'paly';
  } else if (field === 'barry') {
    return 'barry';
  } else if (field === 'party') {
    return 'party per';
  } else if (field === 'tierced') {
    return 'tierced per';
  } else if (field === 'chequy') {
    return 'chequy';
  } else if (field === 'lozengy') {
    return 'lozengy';
  } else if (field === 'paly-pily') {
    return 'paly pily';
  } else if (field === 'barry-pily') {
    return 'barry pily';
  } else if (field === 'bendy-pily') {
    return 'bendy pily';
  } else if (field === 'bendy-pily-sinister') {
    return 'bendy pily sinister';
  } else if (field === 'chevronny') {
    return 'chevronny';
  } else if (field === 'gironny') {
    return 'gironny';
  } else if (field === 'quarterly-of-nine') {
    return 'quarterly of nine';
  } else if (field === 'lozengy-bendwise') {
    return 'lozengy bendwise';
  } else if (field === 'embrassee-a-dexter') {
    return 'embrassee a dexter';
  } else if (field === 'embrassee-a-sinister') {
    return 'embrassee a sinister';
  } else {
    return cannotHappen(field);
  }
}

function stringifyField(field: Field, shouldCapitalize: boolean): string {
  if (field.kind === 'party') {
    const perName = stringifyParty(field.per.name);
    const stringifiedTinctures = field.per.tinctures.map((t) => stringifyTincture(t));

    const tinctures =
      stringifiedTinctures.slice(0, stringifiedTinctures.length - 1).join(', ') +
      ' and ' +
      stringifiedTinctures[stringifiedTinctures.length - 1];
    let result = 'Per ' + perName + ' ';
    if (field.per.line !== 'straight') {
      result += field.per.line + ' ';
    }
    result += tinctures;
    return result;
  } else if (field.kind === 'tierced') {
    const perName = stringifyParty(field.per.name);
    const stringifiedTinctures = field.per.tinctures.map((t) => stringifyTincture(t));

    const tinctures =
      stringifiedTinctures.slice(0, stringifiedTinctures.length - 1).join(', ') +
      ' and ' +
      stringifiedTinctures[stringifiedTinctures.length - 1];
    let result = 'Tierced per ' + perName + ' ';
    if (field.per.line !== 'straight') {
      result += field.per.line + ' ';
    }
    result += tinctures;
    return result;
  } else {
    const rawFieldStr = stringifyFieldKind(field.kind);
    const fieldStr = shouldCapitalize ? capitalizeFirstLetter(rawFieldStr) : rawFieldStr;
    if (field.kind === 'plain') {
      const tincturesStr = stringifyTincture(field.tincture);
      return shouldCapitalize ? capitalizeFirstLetter(tincturesStr) : tincturesStr;
    } else if (
      field.kind === 'paly' ||
      field.kind === 'lozengy' ||
      field.kind === 'paly-pily' ||
      field.kind === 'barry-pily' ||
      field.kind === 'bendy-pily' ||
      field.kind === 'bendy-pily-sinister' ||
      field.kind === 'chequy' ||
      field.kind === 'chevronny' ||
      field.kind === 'quarterly-of-nine' ||
      field.kind === 'lozengy-bendwise' ||
      field.kind === 'embrassee-a-dexter' ||
      field.kind === 'embrassee-a-sinister'
    ) {
      return fieldStr + ` ${stringifyTincture(field.tinctures[0])} and ${stringifyTincture(field.tinctures[1])}`;
    } else if (field.kind === 'barry' || field.kind === 'bendy' || field.kind === 'bendySinister') {
      return (
        fieldStr +
        (field.number !== 6 ? ` of ${stringifyNumber(field.number)}` : '') +
        ` ${stringifyTincture(field.tinctures[0])} and ${stringifyTincture(field.tinctures[1])}`
      );
    } else if (field.kind === 'gironny') {
      return (
        fieldStr +
        (field.number !== 8 ? ` of ${stringifyNumber(field.number)}` : '') +
        ` ${stringifyTincture(field.tinctures[0])} and ${stringifyTincture(field.tinctures[1])}`
      );
    } else {
      return cannotHappen(field);
    }
  }
}

function stringifyCharge(charge: Charge): string {
  const count = charge.countAndDisposition.count;
  const counterStr = count === 1 ? (charge.name === 'eagle' ? 'an' : 'a') : stringifyNumber(count);
  if (charge.name === 'eagle') {
    let result = counterStr;
    result += ' ' + pluralize('eagle', count);

    result += ' ' + charge.attitude;

    if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
      result += ' in ' + charge.countAndDisposition.disposition;
    }

    result += ' ' + stringifyTincture(charge.tincture);

    if (charge.beakedAndArmed.name != charge.tincture.name) {
      result += ' beaked and armed ' + stringifyTincture(charge.beakedAndArmed);
    }
    return result;
  } else if (charge.name === 'fleurdelys') {
    let result = counterStr;
    result += charge.countAndDisposition.count === 1 ? ' fleur de lys ' : ' fleurs de lys ';

    if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
      result += ' in ' + charge.countAndDisposition.disposition + ' ';
    }
    result += stringifyTincture(charge.tincture);

    return result;
  } else if (charge.name === 'lion') {
    let result = counterStr;
    result += ' ' + pluralize('lion', count);

    result += ' ' + charge.attitude;

    if (charge.head !== null) {
      result += ' ' + charge.head;
    }
    if (charge.tail !== null) {
      result += ' tail ' + charge.tail;
    }
    if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
      result += ' in ' + charge.countAndDisposition.disposition;
    }

    result += ' ' + stringifyTincture(charge.tincture);
    if (charge.armedAndLangued.name !== gules.name) {
      result += ' armed and langued ' + stringifyTincture(charge.armedAndLangued);
    }

    return result;
  } else if (charge.name === 'roundel') {
    let result = counterStr;
    if (charge.inside === 'voided') {
      result += ' ' + pluralize('annulet', count);
      if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
        result += ' in ' + charge.countAndDisposition.disposition;
      }
      result += ' ' + stringifyTincture(charge.tincture);
    } else if (charge.inside === 'nothing') {
      if (charge.tincture.name === or.name) {
        result += ' ' + pluralize('bezant', count);
        if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
          result += ' in ' + charge.countAndDisposition.disposition + ' ';
        }
      } else {
        result += ' ' + pluralize('roundel', count);
        if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
          result += ' in ' + charge.countAndDisposition.disposition;
        }
        result += ' ' + stringifyTincture(charge.tincture);
      }
    } else {
      return cannotHappen(charge.inside);
    }

    return result;
  } else if (charge.name === 'lozenge') {
    let result = counterStr;
    if (charge.inside === 'voided') {
      result += ' ' + pluralize('mascle', count) + ' ';
    } else if (charge.inside === 'pierced') {
      result += ' ' + pluralize('rustre', count) + ' ';
    } else if (charge.inside === 'nothing') {
      result += ' ' + pluralize('lozenge', count) + ' ';
    } else {
      return cannotHappen(charge.inside);
    }
    if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
      result += ' in ' + charge.countAndDisposition.disposition + ' ';
    }
    result += stringifyTincture(charge.tincture);

    return result;
  } else if (charge.name === 'cross') {
    let result = counterStr;
    result += ' ' + pluralize('cross', count) + ' ';
    result += charge.limbs + ' ';

    if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
      result += ' in ' + charge.countAndDisposition.disposition + ' ';
    }

    result += stringifyTincture(charge.tincture);

    return result;
  } else if (charge.name === 'mullet') {
    let result = counterStr;
    result += ' ' + pluralize('mullet', count);
    if (charge.points !== 5) {
      result += ' of ' + stringifyNumber(charge.points) + ' points';
    }
    if (charge.inside === 'pierced') {
      result += ' pierced';
    }

    if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
      result += ' in ' + charge.countAndDisposition.disposition;
    }

    result += ' ' + stringifyTincture(charge.tincture);

    return result;
  } else {
    return cannotHappen(charge);
  }
}

function stringifyBlasonWithCapitalization(blason: Blason, shouldCapitalize: boolean): string {
  if (blason.kind === 'simple') {
    const field = stringifyField(blason.field, shouldCapitalize);

    const addendum = [
      blason.ordinary ? stringifyOrdinary(blason.ordinary) : null,
      blason.charge ? stringifyCharge(blason.charge) : null,
    ].filter(isNotNull);

    if (addendum.length > 0) {
      return field + ', ' + addendum.join(', ');
    } else {
      return field;
    }
  } else if (blason.kind === 'quarterly') {
    const groupedBlason = blason.blasons.reduce<Array<{ blason: SimpleBlason; quarter: Array<number> }>>(
      (acc, blason, i) => {
        const idx = acc.findIndex((b) => isEqual(b.blason, blason));
        if (idx < 0) {
          acc.push({ blason, quarter: [i] });
        } else {
          acc[idx].quarter.push(i);
        }

        return acc;
      },
      []
    );

    return (
      'Quarterly, ' +
      groupedBlason
        .map(({ blason, quarter }) => {
          return (
            quarter.map((i) => stringifyOrdinal(i + 1)).join(' and ') +
            ' ' +
            stringifyBlasonWithCapitalization(blason, false)
          );
        })
        .join('; ')
    );
  } else {
    return cannotHappen(blason);
  }
}

export function stringifyBlason(blason: Blason): string {
  return stringifyBlasonWithCapitalization(blason, true);
}
