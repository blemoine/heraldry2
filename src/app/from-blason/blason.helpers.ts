import { Blason, Field } from '../model/blason';
import { Furs, gules } from '../model/tincture';
import { Party } from '../model/party';
import { cannotHappen } from '../../utils/cannot-happen';
import { Charge } from '../model/charge';
import { isNotNull } from '../../utils/isNotNull';

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
  } else {
    const perName = stringifyParty(field.per.name);
    const tinctures = field.per.tinctures.map((t) => t.name).join(' and ');
    return `Per ${perName} ${tinctures}`;
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
    let result = '';
    if (charge.countAndDisposition.count === 1) {
      result += 'a lion';
    } else {
      if (charge.countAndDisposition.count === 2) {
        result += 'two lions';
      } else if (charge.countAndDisposition.count === 3) {
        result += 'three lions';
      } else {
        cannotHappen(charge.countAndDisposition.count);
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

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isThereFur(blason: Blason, fur: Furs['name']): boolean {
  if (blason.field.kind === 'plain') {
    if (blason.field.tincture.name === fur) {
      return true;
    }
  } else {
    if (blason.field.per.tinctures.some((t) => t.name === fur)) {
      return true;
    }
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
