import { FillFromTincture } from '../fillFromTincture.helper';
import { isFur, Tincture } from '../../model/tincture';

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
