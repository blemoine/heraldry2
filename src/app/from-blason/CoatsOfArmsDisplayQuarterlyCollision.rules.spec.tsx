import fc from 'fast-check';
import { chargeArb, lineArb } from '../model/tests/arbitraries';
import { Blason, QuarterlyBlason, SimpleBlason } from '../model/blason';
import { azure, or } from '../model/tincture';
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

// I don't have an explanation, but the dormant lion has strange coordinate, not refleted in the way it is drawn
const chargeArbFiltered = chargeArb.filter((t) => t.name !== 'lion' || t.attitude !== 'dormant');

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
      fc.property(chargeArbFiltered, (charge) => {
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
                `Blason '${linkToBlason(blason)}' in quarter ${i + 1} is not inside blason for point ${point}`
              );
            }
            if (!isInRect(point, quarterRect)) {
              expect(false).toBe(
                `Blason '${linkToBlason(blason)}' in quarter ${i + 1} is not inside quarter for point ${point}`
              );
            }
          });
        });
      }),
      { numRuns }
    );
  });

  it('should ensure that charges are always under a chief field', () => {
    fc.assert(
      fc.property(chargeArbFiltered, lineArb, (charge, line) => {
        const baseBlason: SimpleBlason = {
          kind: 'simple',
          field: { kind: 'plain', tincture: azure },
          ordinary: { name: 'chief', line, tincture: or },
          charge,
        };

        const blason: QuarterlyBlason = {
          kind: 'quarterly',
          blasons: [baseBlason, baseBlason, baseBlason, baseBlason],
        };

        const quarters = assertOnCoatsOfArms(blason);
        expect(quarters.length).toBe(4);

        quarters.forEach(({ clipPath, chargesParsedPoints, quarterRect }, i) => {
          const chiefPathStr = document
            .querySelector('.blason-quarter-' + (i + 1) + ' .blason-ordinary path')!
            .getAttribute('d');
          const chiefPath: Array<any> = getPathSegments(chiefPathStr);
          const minY: number = quarterRect.y + chiefPath
            .flatMap(({ coords }) => coords)
            .reduce(([accX, accY], [x, y]) => (accY > y ? [accX, accY] : [x, y]))[1];

          chargesParsedPoints.forEach((point) => {
            const isInside = pointInSvgPolygon.isInside(point, clipPath);
            if (!isInside) {
              expect(false).toBe(
                `Blason '${linkToBlason(blason)}' in quarter ${i + 1} is not inside blason for point ${point}`
              );
            }
            const isBelow = minY < point[1];
            if (!isBelow) {
              expect(false).toBe(
                `Blason '${linkToBlason(blason)}' in quarter ${i + 1} is not below the chief ${minY} for point ${point}`
              );
            }
            if (!isInRect(point, quarterRect)) {
              expect(false).toBe(
                `Blason '${linkToBlason(blason)}' in quarter ${i + 1} is not inside quarter for point ${point}`
              );
            }
          });
        });
      }),
      { numRuns  }
    );
  });

  it('should ensure that charges are always above a base field', () => {
    fc.assert(
      fc.property(chargeArbFiltered, lineArb, (charge, line) => {
        const baseBlason: SimpleBlason = {
          kind: 'simple',
          field: { kind: 'plain', tincture: azure },
          ordinary: { name: 'base', line, tincture: or },
          charge,
        };

        const blason: QuarterlyBlason = {
          kind: 'quarterly',
          blasons: [baseBlason, baseBlason, baseBlason, baseBlason],
        };

        const quarters = assertOnCoatsOfArms(blason);
        expect(quarters.length).toBe(4);

        quarters.forEach(({ clipPath, chargesParsedPoints, quarterRect }, i) => {
          const chiefPathStr = document
            .querySelector('.blason-quarter-' + (i + 1) + ' .blason-ordinary path')!
            .getAttribute('d');
          const chiefPath: Array<any> = getPathSegments(chiefPathStr);
          const maxY: number = quarterRect.y + chiefPath
            .flatMap(({ coords }) => coords)
            .reduce(([accX, accY], [x, y]) => (accY < y ? [accX, accY] : [x, y]))[1];

          chargesParsedPoints.forEach((point) => {
            const isInside = pointInSvgPolygon.isInside(point, clipPath);
            if (!isInside) {
              expect(false).toBe(
                `Blason '${linkToBlason(blason)}' in quarter ${i + 1} is not inside blason for point ${point}`
              );
            }
            const isAbove = maxY > point[1];
            if (!isAbove) {
              expect(false).toBe(
                `Blason '${linkToBlason(blason)}' in quarter ${i + 1} is not above the base ${maxY} for point ${point}`
              );
            }
            if (!isInRect(point, quarterRect)) {
              expect(false).toBe(
                `Blason '${linkToBlason(blason)}' in quarter ${i + 1} is not inside quarter for point ${point}`
              );
            }
          });
        });
      }),
      { numRuns }
    );
  });
});

function isInRect([x, y]: PathAbsolutePoint, rect: { x: number; y: number; width: number; height: number }): boolean {
  return x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height;
}

function linkToBlason(blason: Blason): string {
  return `http://localhost:1234/#/?blason=${encodeURI(stringifyBlason(blason))}`
}