import { Tincture } from '../model/tincture';

export type FillFromTincture = (tincture: Tincture) => { color: string } | { id: string };
export function convertToOlfFillFronTincture(fillFromTincture: FillFromTincture) {
  return (tincture: Tincture) => {
    const result = fillFromTincture(tincture);
    if ('color' in result) {
      return result.color;
    } else {
      return `url(#${result.id})`;
    }
  };
}
