import { Blason, Field } from '../model/blason';
import { Furs } from '../model/tincture';
import { Party } from '../model/party';
import { cannotHappen } from '../../utils/cannot-happen';

export function stringifyBlason(blason: Blason): string {
  const field = stringifyField(blason.field);

  if (blason.ordinary) {
    const ordinary = 'a ' + blason.ordinary.name + ' ' + blason.ordinary.tincture.name;
    return field + ', ' + ordinary;
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
  } else if (partyName === 'bend' || partyName === 'fess' || partyName === 'pale' || partyName === 'chevron') {
    return partyName;
  } else {
    return cannotHappen(partyName);
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

  return !!blason.ordinary && blason.ordinary.tincture.name === fur;
}
