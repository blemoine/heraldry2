import * as pointInSvgPolygon from 'point-in-svg-polygon';
import { identity3, Matrix3, mul, mulVec, scale3, translation3 } from '../../svg-path-builder/matrix';
import { memoize } from 'lodash';

export const getPathSegments = memoize(function(pathStr: string | null) {
  return pathStr ? pointInSvgPolygon.segments(pathStr) : [];
});

function parentsUntil(el: Node, selector: string): Array<Element> {
  const parent = el.parentElement;
  if (parent && !parent.matches(selector)) {
    return [parent, ...parentsUntil(parent, selector)];
  } else {
    return [];
  }
}

export function getChargePoints(parentSelector: string = ''): Array<[number, number]> {
  const chargePath = Array.from(document.querySelectorAll<SVGPathElement>(parentSelector + ' .blason-charge path'));

  return chargePath.flatMap((path) => {
    const pathAttribute = path.getAttribute('d');
    if (!pathAttribute) {
      return [];
    }
    const points: Array<[number, number]> = pointInSvgPolygon.segments(pathAttribute).flatMap(({ coords }) => {
      return [coords[0], coords[coords.length - 1]];
    });
    const parents = parentsUntil(path, '.coats-of-arms-display');

    const transformMatrix: Matrix3 = parents.reduce((accMat, el) => {
      if (el.tagName === 'g') {
        const transform = el.getAttribute('transform');
        const coordinate = transform
          ? transform.match(/^translate\(\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s*\)$/)
          : null;
        if (transform && !coordinate) {
          throw new Error(`transform ${transform} is unsupported`);
        }

        const translateX = coordinate ? parseFloat(coordinate[1]) : 0;
        const translateY = coordinate ? parseFloat(coordinate[2]) : 0;
        if (!coordinate) {
          return accMat;
        }
        return mul(translation3(translateX, translateY), accMat);
      } else if (el.tagName === 'svg') {
        const widthStr = el.getAttribute('width');
        const heightStr = el.getAttribute('height');
        const viewBox = el.getAttribute('viewBox');
        const viewBoxMatches = viewBox
          ? viewBox.match(/(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/)
          : null;

        const scaleX = widthStr && viewBoxMatches ? parseFloat(widthStr) / parseFloat(viewBoxMatches[3]) : 1;
        const scaleY = heightStr && viewBoxMatches ? parseFloat(heightStr) / parseFloat(viewBoxMatches[4]) : 1;
        return mul(scale3(scaleX, scaleY), accMat);
      } else {
        return accMat;
      }
    }, identity3());
    return points.map((p): [number, number] => {
      const r = mulVec(transformMatrix, [p[0], p[1], 1]);

      return [r[0], r[1]];
    });
  });
}
