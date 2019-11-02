import { cannotHappen } from '../../../utils/cannot-happen';
import { FillFromTincture } from '../fillFromTincture.helper';
import { Furs, isErmine, isFur, isPotent, isVair, Tincture } from '../../model/tincture';

export type TransformProperty =
  | { kind: 'scale'; value: number | [number, number] }
  | { kind: 'translate'; value: [number, number] };
export function toTransform(arr: Array<TransformProperty>): string {
  return arr
    .map((t) => {
      if (t.kind === 'scale') {
        const scale = typeof t.value === 'number' ? t.value : t.value.join(',');
        return 'scale(' + scale + ')';
      } else if (t.kind === 'translate') {
        return 'translate(' + t.value.join(',') + ')';
      } else {
        return cannotHappen(t);
      }
    })
    .join(' ');
}

export type FurTransformProperty = {
  [fur: string]: { property: Array<TransformProperty>; fillId: string };
};

export function unsafeGetFillIdOfFur(fillFromTincture: FillFromTincture, fur: Furs): string {
  const tincture = fillFromTincture(fur);
  if ('id' in tincture) {
    return tincture.id;
  } else {
    throw new Error(`Fur ${fur.name} must have an id, got ${tincture}`);
  }
}

export function getFurName(fur: Furs): string {
  return fur.name + (isErmine(fur) ? '-' + fur.field.name + '-' + fur.spot.name : '');
}

export function buildFurTransformProperty(
  fillFromTincture: FillFromTincture,
  tinctures: Array<Tincture>,
  properties: {
    ermine: TransformProperty | ReadonlyArray<TransformProperty>;
    vair: TransformProperty | ReadonlyArray<TransformProperty>;
    potent: TransformProperty | ReadonlyArray<TransformProperty>;
  }
): FurTransformProperty {
  return tinctures.filter(isFur).reduce<Partial<FurTransformProperty>>((acc, fur) => {
    const property = isErmine(fur)
      ? properties.ermine
      : isVair(fur)
      ? properties.vair
      : isPotent(fur)
      ? properties.potent
      : cannotHappen(fur);
    const name = getFurName(fur);
    return {
      ...acc,
      [name]: {
        property: Array.isArray(property) ? property : [property],
        fillId: unsafeGetFillIdOfFur(fillFromTincture, fur),
      },
    };
  }, {}) as FurTransformProperty;
}

export function getFill(fillFromTincture: FillFromTincture, tincture: Tincture, postfixId: string | null): string {
  const fill = fillFromTincture(tincture);

  if ('color' in fill) {
    return fill.color;
  } else if (isFur(tincture)) {
    const newPatternDef = fill.id + (postfixId ? '-' + postfixId : '');
    return `url(#${newPatternDef})`;
  } else {
    return `url(#${fill.id})`;
  }
}
