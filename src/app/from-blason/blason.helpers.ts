import { Blason } from '../model/blason';
import { Furs, gules, or } from '../model/tincture';
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
    result += ordinary.tincture.name;
    return result;
  } else {
    let result = 'a ' + stringifyOrdinaryName(ordinary.name) + ' ';
    if (ordinary.line !== 'straight') {
      result += ordinary.line + ' ';
    }
    result += ordinary.tincture.name;
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
  if (field.kind === 'plain') {
    return capitalizeFirstLetter(field.tincture.name);
  } else if (field.kind === 'party') {
    const perName = stringifyParty(field.per.name);
    const tinctures = field.per.tinctures.map((t) => t.name).join(' and ');
    let result = 'Per ' + perName + ' ';
    if (field.per.line !== 'straight') {
      result += field.per.line + ' ';
    }
    result += tinctures;
    return result;
  } else if (field.kind === 'bendy') {
    return `Bendy ${field.tinctures[0].name} and ${field.tinctures[1].name}`;
  } else if (field.kind === 'bendySinister') {
    return `Bendy Sinister ${field.tinctures[0].name} and ${field.tinctures[1].name}`;
  } else if (field.kind === 'paly') {
    return `Paly ${field.tinctures[0].name} and ${field.tinctures[1].name}`;
  } else if (field.kind === 'chequy') {
    return `Chequy ${field.tinctures[0].name} and ${field.tinctures[1].name}`;
  } else if (field.kind === 'barry') {
    return `Barry of ${stringifyNumber(field.number)} ${field.tinctures[0].name} and ${field.tinctures[1].name}`;
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
  const count = charge.name === 'lion' || charge.name === 'eagle' ? charge.countAndDisposition.count : charge.count;
  const counterStr = count === 1 ? (charge.name === 'eagle' ? 'an' : 'a') : stringifyNumber(count);
  if (charge.name === 'eagle') {
    const count = charge.countAndDisposition.count;
    let result = counterStr;
    result += ' ' + pluralize('eagle', count);

    result += ' ' + charge.attitude;

    if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
      result += ' in ' + charge.countAndDisposition.disposition;
    }

    result += ' ' + charge.tincture.name;

    if (charge.beakedAndArmed.name != charge.tincture.name) {
      result += ' beaked and armed ' + charge.beakedAndArmed.name;
    }
    return result;
  } else if (charge.name === 'fleurdelys') {
    let result = counterStr;
    result += charge.count === 1 ? ' fleur de lys ' : ' fleurs de lys ';
    result += charge.tincture.name;

    return result;
  } else if (charge.name === 'lion') {
    const count = charge.countAndDisposition.count;

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

    result += ' ' + charge.tincture.name;
    if (charge.armedAndLangued.name !== gules.name) {
      result += ' armed and langued ' + charge.armedAndLangued.name;
    }

    return result;
  } else if (charge.name === 'roundel') {
    let result = counterStr;
    if (charge.inside === 'voided') {
      result += ' ' + pluralize('annulet', charge.count) + ' ';
      result += charge.tincture.name;
    } else if (charge.inside === 'nothing') {
      if (charge.tincture.name === or.name) {
        result += ' ' + pluralize('bezant', charge.count);
      } else {
        result += ' ' + pluralize('roundel', charge.count) + ' ';
        result += charge.tincture.name;
      }
    } else {
      return cannotHappen(charge.inside);
    }

    return result;
  } else if (charge.name === 'lozenge') {
    let result = counterStr;
    if (charge.inside === 'voided') {
      result += ' ' + pluralize('mascle', charge.count) + ' ';
    } else if (charge.inside === 'pierced') {
      result += ' ' + pluralize('rustre', charge.count) + ' ';
    } else if (charge.inside === 'nothing') {
      result += ' ' + pluralize('lozenge', charge.count) + ' ';
    } else {
      return cannotHappen(charge.inside);
    }
    result += charge.tincture.name;

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
    field.kind === 'chequy'
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
    } else if (charge.name === 'fleurdelys' || charge.name === 'roundel' || charge.name === 'lozenge') {
      if (charge.tincture.name === fur) {
        return true;
      }
    } else {
      return cannotHappen(charge);
    }
  }

  return false;
}
