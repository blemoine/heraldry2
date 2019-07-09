import { Blason, Furs } from '../model/blason';

export function stringifyBlason(blason: Blason): string {
  const field = capitalizeFirstLetter(blason.field.name);
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
  return blason.field.name === fur || (!!blason.ordinary && blason.ordinary.tincture.name === fur);
}
