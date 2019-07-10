import { Blason } from '../model/blason';
import { Furs } from '../model/tincture';

export function stringifyBlason(blason: Blason): string {
  let field: string;
  if (blason.field.kind === 'plain') {
    field = capitalizeFirstLetter(blason.field.tincture.name);
  } else {
    throw new Error('TODO');
  }

  if (blason.ordinary) {
    const ordinary = 'a ' + blason.ordinary.name + ' ' + blason.ordinary.tincture.name;
    return field + ', ' + ordinary;
  } else {
    return field;
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
