import { Blason, SimpleBlason } from '../model/blason';
import { Furs, Tincture } from '../model/tincture';
import { cannotHappen } from '../../utils/cannot-happen';
import { Charge } from '../model/charge';
import { Field } from '../model/field';
import { Ordinary } from '../model/ordinary';

function allDeclaredTincturesOfCharge(charge: Charge): Array<Tincture> {
  if (charge.name === 'lion') {
    return [charge.tincture, charge.armedAndLangued];
  } else if (charge.name === 'eagle') {
    return [charge.tincture, charge.beakedAndArmed];
  } else if (
    charge.name === 'fleurdelys' ||
    charge.name === 'escutcheon' ||
    charge.name === 'roundel' ||
    charge.name === 'lozenge' ||
    charge.name === 'cross' ||
    charge.name === 'mullet'
  ) {
    return [charge.tincture];
  } else {
    return cannotHappen(charge);
  }
}
export function allDeclaredTincturesOfOrdinary(ordinary: Ordinary): Array<Tincture> {
  if (ordinary.name === 'chape-ploye') {
    const tinctures = ordinary.tinctures;
    if (tinctures.kind === 'party') {
      return tinctures.tinctures;
    } else if (tinctures.kind === 'simple') {
      return [tinctures.tincture];
    } else {
      return cannotHappen(tinctures);
    }
  } else {
    return [ordinary.tincture];
  }
}
export function allDeclaredTincturesOfField(field: Field): Array<Tincture> {
  if (field.kind === 'plain') {
    return [field.tincture];
  } else if (field.kind === 'party' || field.kind === 'tierced') {
    return field.per.tinctures;
  } else if (
    field.kind === 'paly' ||
    field.kind === 'bendy' ||
    field.kind === 'bendySinister' ||
    field.kind === 'barry' ||
    field.kind === 'chequy' ||
    field.kind === 'lozengy' ||
    field.kind === 'paly-pily' ||
    field.kind === 'barry-pily' ||
    field.kind === 'bendy-pily' ||
    field.kind === 'bendy-pily-sinister' ||
    field.kind === 'chevronny' ||
    field.kind === 'chevronny-reversed' ||
    field.kind === 'quarterly-of-nine' ||
    field.kind === 'gironny' ||
    field.kind === 'lozengy-bendwise' ||
    field.kind === 'embrassee-a-dexter' ||
    field.kind === 'embrassee-a-sinister' ||
    field.kind === 'lozenge-throughout' ||
    field.kind === 'lozenge-throughout-arched' ||
    field.kind === 'barry-and-per-pale' ||
    field.kind === 'barry-and-per-chevron-throughout'
  ) {
    return field.tinctures;
  } else {
    return cannotHappen(field);
  }
}
function allDeclaredTincturesOfSimpleBlason(blason: SimpleBlason): Array<Tincture> {
  return [
    ...allDeclaredTincturesOfField(blason.field),
    ...(blason.ordinary ? allDeclaredTincturesOfOrdinary(blason.ordinary) : []),
    ...(blason.charge ? allDeclaredTincturesOfCharge(blason.charge) : []),
  ];
}
function allDeclaredTinctures(blason: Blason): Array<Tincture> {
  if (blason.kind === 'simple') {
    return allDeclaredTincturesOfSimpleBlason(blason);
  } else if (blason.kind === 'quarterly') {
    return blason.blasons.flatMap((blason) => allDeclaredTincturesOfSimpleBlason(blason));
  } else {
    return cannotHappen(blason);
  }
}

export function isThereFur(blason: Blason, fur: Furs['name']): boolean {
  return allDeclaredTinctures(blason).some((t) => t.name === fur);
}
