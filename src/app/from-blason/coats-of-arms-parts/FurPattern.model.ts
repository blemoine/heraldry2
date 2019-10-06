import { cannotHappen } from '../../../utils/cannot-happen';
import { FillFromTincture } from '../fillFromTincture.helper';
import { Furs, isErmine, isFur, isPotent, isVair, Tincture, tinctures } from '../../model/tincture';

export type TransformProperty = { kind: 'scale'; value: number | [number, number] };
export function toTransform(t: TransformProperty): string {
  if (t.kind === 'scale') {
    const scale = typeof t.value === 'number' ? t.value : t.value.join(',');
    return 'scale(' + scale + ')';
  } else {
    return cannotHappen(t.kind);
  }
}

export type FurTransformProperty = {
  [fur in Furs['name']]: { property: TransformProperty; fillId: string };
};

export function unsafeGetFillIdOfFur(fillFromTincture: FillFromTincture, fur: Furs): string {
  const tincture = fillFromTincture(fur);
  if ('id' in tincture) {
    return tincture.id;
  } else {
    throw new Error(`Fur ${fur.name} must have an id, got ${tincture}`);
  }
}

export function buildFurTransformProperty(
  fillFromTincture: FillFromTincture,
  properties: { ermine: TransformProperty; vair: TransformProperty; potent: TransformProperty }
): FurTransformProperty {
  return tinctures.filter(isFur).reduce<Partial<FurTransformProperty>>((acc, fur) => {
    const property = isErmine(fur)
      ? properties.ermine
      : isVair(fur)
      ? properties.vair
      : isPotent(fur)
      ? properties.potent
      : cannotHappen(fur);
    return {
      ...acc,
      [fur.name]: {
        property,
        fillId: unsafeGetFillIdOfFur(fillFromTincture, fur),
      },
    };
  }, {}) as FurTransformProperty;
}

export function getFill(fillFromTincture: FillFromTincture, tincture: Tincture, postfixId: string): string {
  const fill = fillFromTincture(tincture);

  if ('color' in fill) {
    return fill.color;
  } else if (isFur(tincture)) {
    const newPatternDef = fill.id + '-' + postfixId;
    return `url(#${newPatternDef})`;
  } else {
    return `url(#${fill.id})`;
  }
}
