import fc from 'fast-check';
import { chargeArb } from '../model/tests/arbitraries';
import { SimpleBlason } from '../model/blason';
import { azure } from '../model/tincture';
import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import { Dimension } from '../model/dimension';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';
import { Configuration } from '../model/configuration';
import { defaultTinctureConfiguration } from '../model/tincture-configuration';
import * as pointInSvgPolygon from 'point-in-svg-polygon';
import { isNotNull } from '../../utils/isNotNull';
import { stringifyBlason } from './blason.helpers';

describe('CoatsOfArms rules', () => {
  const dimension: Dimension = { width: 360, height: 480 };
  const configuration: Configuration = { shieldShape: 'heater', tinctureConfiguration: defaultTinctureConfiguration };

  it('should ensure that charges are always inside a plain field', () => {
    fc.assert(
      fc.property(chargeArb, fc.context(), (charge, ctx) => {
        const blason: SimpleBlason = {
          kind: 'simple',
          field: { kind: 'plain', tincture: azure },
          charge,
        };

        cleanup();
        render(<CoatsOfArmsDisplay blason={blason} dimension={dimension} configuration={configuration} />);

        const clipPathStr = document.querySelector('#plain-field-clip-path path')!.getAttribute('d');
        const clipPath = pointInSvgPolygon.segments(clipPathStr);

        const chargeSvgRect = Array.from(document.querySelectorAll('.blason-charge svg'));

        let chargesParsedPoint: Array<[number, number]>;
        if (chargeSvgRect.length > 0) {
          chargesParsedPoint = chargeSvgRect
            .flatMap((svg: any) => {
              const g: SVGGElement = svg.parentElement as any;

              const width = parseFloat(svg.getAttribute('width'));
              const height = parseFloat(svg.getAttribute('height'));
              const viewBox = svg.getAttribute('viewBox');
              const viewBoxMatches = viewBox
                ? viewBox.match(/(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/)
                : null;
              const scale = viewBoxMatches ? [width / viewBoxMatches[3], height / viewBoxMatches[4]] : [1, 1];

              if (g.tagName !== 'g') {
                throw new Error('Wth is ' + g.tagName);
              }
              const transform = g.getAttribute('transform');

              const coordinate = transform
                ? transform.match(/translate\(\s*(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/)
                : ['0', '0', '0'];

              const translateX = coordinate ? parseFloat(coordinate[1]) : 0;
              const translateY = coordinate ? parseFloat(coordinate[2]) : 0;

              return getPointFromPath(svg.querySelectorAll('path')).map(([x, y]): [number, number] => {
                if (Number.isNaN(x)) {
                  ctx.log('' + x);
                }
                return [x * scale[0] + translateX, y * scale[1] + translateY];
              });
            })
            .filter(isNotNull);
        } else {
          const chargeNodeList = document.querySelectorAll<SVGPathElement>('.blason-charge path');

          chargesParsedPoint = getPointFromPath(chargeNodeList);
        }

        chargesParsedPoint.forEach((point) => {
          const isInside = pointInSvgPolygon.isInside(point, clipPath);
          if (!isInside) {
            ctx.log(`Blason '${stringifyBlason(blason)}' returns false for point ${point}`);
          }
          expect(isInside).toBe(true);
        });
      }),
      { numRuns: 50 }
    );
  });
});

function getPointFromPath(chargeNodeList: NodeListOf<SVGPathElement>): Array<[number, number]> {
  const chargesStr: Array<string> = Array.from(chargeNodeList)
    .map((p) => p.getAttribute('d'))
    .filter(isNotNull);

  return chargesStr
    .flatMap((str) => pointInSvgPolygon.segments(str))
    .flatMap(({ coords }) => {
      return [coords[0], coords[coords.length - 1]];
    });
}
