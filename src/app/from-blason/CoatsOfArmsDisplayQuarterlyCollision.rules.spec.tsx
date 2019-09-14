import fc from 'fast-check';
import { chargeArb } from '../model/tests/arbitraries';
import { QuarterlyBlason, SimpleBlason } from '../model/blason';
import { azure } from '../model/tincture';
import * as React from 'react';
import { Dimension } from '../model/dimension';
import { Configuration } from '../model/configuration';
import { defaultTinctureConfiguration } from '../model/tincture-configuration';
import { cleanup, render } from '@testing-library/react';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';
import { range } from '../../utils/range';
import { getChargePoints, getPathSegments } from './tests/collision.utils';
import * as pointInSvgPolygon from 'point-in-svg-polygon';
import { stringifyBlason } from './blason.helpers';
import { PathAbsolutePoint } from '../svg-path-builder/geometrical.helper';

const numRuns = process.env.GENERATOR_CASE_COUNT ? parseFloat(process.env.GENERATOR_CASE_COUNT) : 40;

describe('CoatsOfArms quarterly collision rules', () => {
  const dimension: Dimension = { width: 360, height: 480 };
  const configuration: Configuration = { shieldShape: 'heater', tinctureConfiguration: defaultTinctureConfiguration };

  function assertOnCoatsOfArms(blason: QuarterlyBlason) {


    cleanup();
    render(<CoatsOfArmsDisplay blason={blason} dimension={dimension} configuration={configuration} />);

    const clipPathStr = document.querySelector('#plain-field-clip-path path')!.getAttribute('d');
    const clipPath = getPathSegments(clipPathStr);

    const topSvg = document.querySelector('.coats-of-arms-display');
    const topWidth = topSvg ? parseFloat(topSvg.getAttribute('width') || '0') : 0;
    const topHeight = topSvg ? parseFloat(topSvg.getAttribute('height') || '0') : 0;

    return range(0, 4).map((i) => {
      const chargesParsedPoints = getChargePoints('.blason-quarter-' + (i + 1));

      const quarterRect = {
        x: i % 2 === 0 ? 0 : topWidth / 2,
        y: i < 2 ? 0 : topHeight / 2,
        width: topWidth / 2,
        height: topHeight / 2,
      };

      return {
        clipPath,
        chargesParsedPoints,
        quarterRect,
      };
    });
  }

  it('should ensure that charges are always inside a plain field', () => {
    fc.assert(
      fc.property(chargeArb, (charge) => {
        const baseBlason: SimpleBlason = {
          kind: 'simple',
          field: { kind: 'plain', tincture: azure },
          charge,
        };

        const blason: QuarterlyBlason = {
          kind: 'quarterly',
          blasons: [baseBlason, baseBlason, baseBlason, baseBlason],
        };

        const quarters = assertOnCoatsOfArms(blason);
        expect(quarters.length).toBe(4);

        quarters.forEach(({ clipPath, chargesParsedPoints, quarterRect }, i) => {
          chargesParsedPoints.forEach((point) => {
            const isInside = pointInSvgPolygon.isInside(point, clipPath);
            if (!isInside) {
              expect(false).toBe(
                `Blason '${stringifyBlason(blason)}' in quarter ${i + 1} is not inside blason for point ${point}`
              );
            }
            if (!isInRect(point, quarterRect)) {
              expect(false).toBe(
                `Blason '${stringifyBlason(blason)}' in quarter ${i + 1} is not inside quarter for point ${point}`
              );
            }
          });
        });
      }),
      { numRuns  }
    );
  });
});

function isInRect([x, y]: PathAbsolutePoint, rect: { x: number; y: number; width: number; height: number }): boolean {
  return x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height;
}
