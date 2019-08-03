import { Blason } from '../model/blason';
import { Furs, gules } from '../model/tincture';
import { Party } from '../model/party';
import { cannotHappen } from '../../utils/cannot-happen';
import { Charge } from '../model/charge';
import { isNotNull } from '../../utils/isNotNull';
import { Field } from '../model/field';
import { capitalizeFirstLetter } from '../../utils/strings';
import { Ordinary } from '../model/ordinary';

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
    let result = '';
    if (ordinary.count === 1) {
      result += 'a ' + stringifyOrdinaryName(ordinary.name) + ' ';
    } else {
      result += stringifyNumber(ordinary.count);

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
  if (charge.name === 'lion') {
    const count = charge.countAndDisposition.count;

    let result = '';
    if (count === 1) {
      result += 'a lion';
    } else {
      if (count === 2 || count === 3) {
        result += stringifyNumber(count) + ' lions';
      } else {
        cannotHappen(count);
      }
    }

    result += ' ' + charge.attitude;

    if (charge.head !== null) {
      result += ' ' + charge.head;
    }
    if (charge.tail !== null) {
      result += ' tail ' + charge.tail;
    }
    if (charge.countAndDisposition.count !== 1) {
      result += ' in ' + charge.countAndDisposition.disposition;
    }

    result += ' ' + charge.tincture.name;
    if (charge.armedAndLangued.name !== gules.name) {
      result += ' armed and langued ' + charge.armedAndLangued.name;
    }

    return result;
  } else if (charge.name === 'eagle') {
    let result = '';
    result += 'an eagle';

    result += ' ' + charge.attitude;

    result += ' ' + charge.tincture.name;

    if (charge.beakedAndArmed.name != charge.tincture.name) {
      result += ' beaked and armed ' + charge.beakedAndArmed.name;
    }
    return result;
  } else if (charge.name === 'fleurdelys') {
    let result = charge.count === 1 ? 'a fleur de lys ' : stringifyNumber(charge.count) + ' fleurs de lys ';
    result += charge.tincture.name;

    return result;
  } else if (charge.name === 'roundel') {
    let result = charge.count === 1 ? 'a roundel ' : stringifyNumber(charge.count) + ' roundels ';
    result += charge.tincture.name;

    return result;
  } else {
    return cannotHappen(charge);
  }
}

export const numberToNameMap = {
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
} as const;
export type StringifiableNumber = keyof typeof numberToNameMap;
export function stringifyNumber(n: StringifiableNumber): string {
  return numberToNameMap[n];
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
    } else if (charge.name === 'fleurdelys' || charge.name === 'roundel') {
      if (charge.tincture.name === fur) {
        return true;
      }
    } else {
      return cannotHappen(charge);
    }
  }

  return false;
}
