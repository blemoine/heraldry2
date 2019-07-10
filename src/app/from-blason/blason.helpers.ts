import { Blason, Field } from '../model/blason';
import { Furs } from '../model/tincture';

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
    const perName = field.per.name;
    const tinctures = field.per.tinctures.map((t) => t.name).join(' and ');
    return `Per ${perName} ${tinctures}`;
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
