import { Blason, SimpleBlason } from '../model/blason';
import { areTinctureEquals, Furs, isFur, Tincture } from '../model/tincture';
import { cannotHappen } from '../../utils/cannot-happen';
import { Field } from '../model/field';
import { Ordinary } from '../model/ordinary';
import { uniq } from 'lodash';

export function allDeclaredTincturesOfOrdinary(ordinary: Ordinary): Array<Tincture> {
  const chargeTinctures = 'charge' in ordinary && ordinary.charge ? ordinary.charge.allTinctures : [];
  if (ordinary.name === 'chape-ploye' || ordinary.name === 'chausse-ploye') {
    const tinctures = ordinary.tinctures;
    if (tinctures.kind === 'party') {
      return tinctures.tinctures.concat(chargeTinctures);
    } else if (tinctures.kind === 'simple') {
      return [tinctures.tincture, ...chargeTinctures];
    } else {
      return cannotHappen(tinctures);
    }
  } else {
    return [ordinary.tincture, ...chargeTinctures];
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
    field.kind === 'gironny-arrondi' ||
    field.kind === 'lozengy-bendwise' ||
    field.kind === 'embrassee-a-dexter' ||
    field.kind === 'embrassee-a-sinister' ||
    field.kind === 'lozenge-throughout' ||
    field.kind === 'lozenge-throughout-arched' ||
    field.kind === 'barry-and-per-pale' ||
    field.kind === 'bendy-and-per-bend-sinister' ||
    field.kind === 'bendy-sinister-and-per-bend' ||
    field.kind === 'bendy-and-per-pale' ||
    field.kind === 'barry-and-per-chevron-throughout'
  ) {
    return field.tinctures;
  } else {
    return cannotHappen(field);
  }
}
function allDeclaredTincturesOfSimpleBlason(blason: SimpleBlason): Array<Tincture> {
  return uniq([
    ...allDeclaredTincturesOfField(blason.field),
    ...(blason.ordinary ? allDeclaredTincturesOfOrdinary(blason.ordinary) : []),
    ...(blason.charge ? blason.charge.allTinctures : []),
  ]);
}
export function allDeclaredTinctures(blason: Blason): Array<Tincture> {
  if (blason.kind === 'simple') {
    return allDeclaredTincturesOfSimpleBlason(blason);
  } else if (blason.kind === 'quarterly') {
    return uniq(blason.blasons.flatMap((blason) => allDeclaredTincturesOfSimpleBlason(blason)));
  } else {
    return cannotHappen(blason);
  }
}

export function isThereFur(blason: Blason, fur: Furs): boolean {
  return allDeclaredTinctures(blason).some((t) => areTinctureEquals(t, fur));
}

export function getStrokeColor(tincture: Tincture): string {
  if (isFur(tincture)) {
    return getStrokeColor(tincture.field);
  }
  return tincture.name === 'sable' ? '#777' : '#000';
}
