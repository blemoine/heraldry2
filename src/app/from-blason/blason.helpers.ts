import { Blason } from '../model/blason';
import { Furs, gules } from '../model/tincture';
import { Party } from '../model/party';
import { cannotHappen } from '../../utils/cannot-happen';
import { Charge } from '../model/charge';
import { isNotNull } from '../../utils/isNotNull';
import { Field } from '../model/field';

export function stringifyBlason(blason: Blason): string {
  const field = stringifyField(blason.field);

  const addendum = [
    blason.ordinary ? 'a ' + blason.ordinary.name + ' ' + blason.ordinary.tincture.name : null,
    blason.charge ? stringifyCharge(blason.charge) : null,
  ].filter(isNotNull);

  if (addendum.length > 0) {
    return field + ', ' + addendum.join(', ');
  } else {
    return field;
  }
}

function stringifyField(field: Field): string {
  if (field.kind === 'plain') {
    return capitalizeFirstLetter(field.tincture.name);
  } else if (field.kind === 'party') {
    const perName = stringifyParty(field.per.name);
    const tinctures = field.per.tinctures.map((t) => t.name).join(' and ');
    return `Per ${perName} ${tinctures}`;
  } else if (field.kind === 'bendy') {
    return `Bendy ${field.tinctures[0].name} and ${field.tinctures[1].name}`;
  } else if (field.kind === 'paly') {
    return `Paly ${field.tinctures[0].name} and ${field.tinctures[1].name}`;
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
  } else {
    return cannotHappen(charge.name);
  }
}

export function stringifyNumber(n: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10): string {
  if (n === 1) {
    return 'one';
  } else if (n === 2) {
    return 'two';
  } else if (n === 3) {
    return 'three';
  } else if (n === 4) {
    return 'four';
  } else if (n === 5) {
    return 'five';
  } else if (n === 6) {
    return 'six';
  } else if (n === 7) {
    return 'seven';
  } else if (n === 8) {
    return 'eight';
  } else if (n === 9) {
    return 'nine';
  } else if (n === 10) {
    return 'ten';
  } else {
    return cannotHappen(n);
  }
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
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
  } else if (field.kind === 'paly' || field.kind === 'bendy' || field.kind === 'barry') {
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
    } else {
      return cannotHappen(charge.name);
    }
  }

  return false;
}
