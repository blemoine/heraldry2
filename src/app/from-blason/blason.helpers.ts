import { Blason } from '../model/blason';
import { Furs, gules, or, Tincture } from '../model/tincture';
import { Party } from '../model/party';
import { cannotHappen } from '../../utils/cannot-happen';
import { Charge } from '../model/charge';
import { isNotNull } from '../../utils/isNotNull';
import { Field } from '../model/field';
import { capitalizeFirstLetter } from '../../utils/strings';
import { Ordinary } from '../model/ordinary';
import { stringifyNumber, SupportedNumber } from '../model/countAndDisposition';

export function stringifyBlason(blason: Blason): string {
  const field = stringifyField(blason.field);

  const addendum = [
    blason.ordinary ? stringifyOrdinary(blason.ordinary) : null,
    blason.charge ? stringifyCharge(blason.charge) : null,
  ].filter(isNotNull);

  if (addendum.length > 0) {
    return field + ', ' + addendum.join(', ');
  } else {
    return field;
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

export function stringifyOrdinaryName(name: Ordinary['name']): string {
  if (name === 'bendSinister') {
    return 'bend sinister';
  } else {
    return name;
  }
}

function stringifyField(field: Field): string {
  if (field.kind === 'party') {
    const perName = stringifyParty(field.per.name);
    const tinctures = field.per.tinctures.map((t) => stringifyTincture(t)).join(' and ');
    let result = 'Per ' + perName + ' ';
    if (field.per.line !== 'straight') {
      result += field.per.line + ' ';
    }
    result += tinctures;
    return result;
  } else {
    const fieldStr = capitalizeFirstLetter(stringifyFieldKind(field.kind));
    if (field.kind === 'plain') {
      return capitalizeFirstLetter(stringifyTincture(field.tincture));
    } else if (
      field.kind === 'bendySinister' ||
      field.kind === 'bendy' ||
      field.kind === 'paly' ||
      field.kind === 'lozengy' ||
      field.kind === 'paly-pily' ||
      field.kind === 'barry-pily' ||
      field.kind === 'chequy' ||
      field.kind === 'chevronny'
    ) {
      return fieldStr + ` ${stringifyTincture(field.tinctures[0])} and ${stringifyTincture(field.tinctures[1])}`;
    } else if (field.kind === 'barry') {
      return (
        fieldStr +
        ` of ${stringifyNumber(field.number)} ${stringifyTincture(field.tinctures[0])} and ${stringifyTincture(
          field.tinctures[1]
        )}`
      );
    } else {
      return cannotHappen(field);
    }
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
  } else if (field === 'chequy') {
    return 'chequy';
  } else if (field === 'lozengy') {
    return 'lozengy';
  } else if (field === 'paly-pily') {
    return 'paly pily';
  } else if (field === 'barry-pily') {
    return 'barry pily';
  } else if (field === 'chevronny') {
    return 'chevronny';
  } else {
    return cannotHappen(field);
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
    partyName === 'saltire'
  ) {
    return partyName;
  } else {
    return cannotHappen(partyName);
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
      result += ' ' + pluralize('annulet', count) + ' ';
      if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
        result += ' in ' + charge.countAndDisposition.disposition + ' ';
      }
      result += stringifyTincture(charge.tincture);
    } else if (charge.inside === 'nothing') {
      if (charge.tincture.name === or.name) {
        result += ' ' + pluralize('bezant', count);
        if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
          result += ' in ' + charge.countAndDisposition.disposition + ' ';
        }
      } else {
        result += ' ' + pluralize('roundel', count) + ' ';
        if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
          result += ' in ' + charge.countAndDisposition.disposition + ' ';
        }
        result += stringifyTincture(charge.tincture);
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
  } else {
    return cannotHappen(charge);
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

export function isThereFur(blason: Blason, fur: Furs['name']): boolean {
  const field = blason.field;
  if (field.kind === 'plain') {
    if (field.tincture.name === fur) {
      return true;
    }
  } else if (field.kind === 'party') {
    if (field.per.tinctures.some((t) => t.name === fur)) {
      return true;
    }
  } else if (
    field.kind === 'paly' ||
    field.kind === 'bendy' ||
    field.kind === 'bendySinister' ||
    field.kind === 'barry' ||
    field.kind === 'chequy' ||
    field.kind === 'lozengy' ||
    field.kind === 'paly-pily' ||
    field.kind === 'barry-pily' ||
    field.kind === 'chevronny'
  ) {
    if (field.tinctures.some((t) => t.name === fur)) {
      return true;
    }
  } else {
    return cannotHappen(field);
  }

  const ordinary = blason.ordinary;
  if (!!ordinary) {
    if (ordinary.tincture.name === fur) {
      return true;
    }
  }

  const charge = blason.charge;
  if (!!charge) {
    if (charge.name === 'lion') {
      if (charge.tincture.name === fur) {
        return true;
      }
      if (charge.armedAndLangued.name === fur) {
        return true;
      }
    } else if (charge.name === 'eagle') {
      if (charge.tincture.name === fur) {
        return true;
      }
      if (charge.beakedAndArmed.name === fur) {
        return true;
      }
    } else if (
      charge.name === 'fleurdelys' ||
      charge.name === 'roundel' ||
      charge.name === 'lozenge' ||
      charge.name === 'cross'
    ) {
      if (charge.tincture.name === fur) {
        return true;
      }
    } else {
      return cannotHappen(charge);
    }
  }

  return false;
}

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
