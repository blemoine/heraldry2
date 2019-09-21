import fc from 'fast-check';
import { lineArb, simplifiedChargeArb } from '../model/tests/arbitraries';
import { Blason, SimpleBlason } from '../model/blason';
import { azure, or } from '../model/tincture';
import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import { Dimension } from '../model/dimension';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';
import { Configuration } from '../model/configuration';
import { defaultTinctureConfiguration } from '../model/tincture-configuration';
import * as pointInSvgPolygon from 'point-in-svg-polygon';
import { stringifyBlason } from './blason.helpers';
import { getChargePoints, getPathSegments } from './tests/collision.utils';

const numRuns = process.env.GENERATOR_CASE_COUNT ? parseFloat(process.env.GENERATOR_CASE_COUNT) : 40;

describe('CoatsOfArms Simple collision rules', () => {
  const dimension: Dimension = { width: 360, height: 480 };
  const configuration: Configuration = { shieldShape: 'heater', tinctureConfiguration: defaultTinctureConfiguration };

  function assertOnCoatsOfArms(blason: Blason) {
    cleanup();
    render(
      <CoatsOfArmsDisplay
        blason={blason}
        dimension={dimension}
        configuration={configuration}
        selectBlasonPart={() => {}}
      />
    );

    const clipPathStr = document.querySelector('#plain-field-clip-path path')!.getAttribute('d');
    const clipPath = getPathSegments(clipPathStr);

    const chargesParsedPoints = getChargePoints();
    return { clipPath, chargesParsedPoints };
  }

  it('should ensure that charges are always inside a plain field', () => {
    fc.assert(
      fc.property(simplifiedChargeArb, (charge) => {
        const blason: SimpleBlason = {
          kind: 'simple',
          field: { kind: 'plain', tincture: azure },
          charge,
        };

        const { clipPath, chargesParsedPoints } = assertOnCoatsOfArms(blason);
        chargesParsedPoints.forEach((point) => {
          const isInside = pointInSvgPolygon.isInside(point, clipPath);
          if (!isInside) {
            expect(false).toBe(`Blason '${stringifyBlason(blason)}' returns false for point ${point}`);
          }
        });
      }),
      { numRuns }
    );
  });

  it('should ensure that charges are always inside the field under a chief', () => {
    fc.assert(
      fc.property(simplifiedChargeArb, lineArb, (charge, line) => {
        const blason: SimpleBlason = {
          kind: 'simple',
          field: { kind: 'plain', tincture: azure },
          ordinary: { name: 'chief', line, tincture: or },
          charge,
        };

        const { clipPath, chargesParsedPoints } = assertOnCoatsOfArms(blason);

        const chiefPathStr = document.querySelector('.blason-ordinary path')!.getAttribute('d');
        const chiefPath = getPathSegments(chiefPathStr);
        const minY: number = chiefPath
          .flatMap(({ coords }) => coords)
          .reduce(([accX, accY], [x, y]) => (accY > y ? [accX, accY] : [x, y]))[1];

        chargesParsedPoints.forEach((point) => {
          const isInside = pointInSvgPolygon.isInside(point, clipPath);
          const isBelow = minY < point[1];
          if (!isInside || !isBelow) {
            expect(false).toBe(
              `Blason '${stringifyBlason(blason)}' returns false for point ${point}, with minY ${minY}`
            );
          }
        });
      }),
      { numRuns }
    );
  });

  it('should ensure that charges are always inside the field above a base', () => {
    fc.assert(
      fc.property(simplifiedChargeArb, lineArb, (charge, line) => {
        const blason: SimpleBlason = {
          kind: 'simple',
          field: { kind: 'plain', tincture: azure },
          ordinary: { name: 'base', line, tincture: or },
          charge,
        };

        const { clipPath, chargesParsedPoints } = assertOnCoatsOfArms(blason);

        const basePathStr = document.querySelector('.blason-ordinary path')!.getAttribute('d');
        const basePath = getPathSegments(basePathStr);
        const maxY: number = basePath
          .flatMap(({ coords }) => coords)
          .reduce(([accX, accY], [x, y]) => (accY < y ? [accX, accY] : [x, y]))[1];

        chargesParsedPoints.forEach((point) => {
          const isInside = pointInSvgPolygon.isInside(point, clipPath);
          const isAbove = maxY > point[1];
          if (!isInside || !isAbove) {
            expect(false).toBe(
              `Blason '${stringifyBlason(blason)}' returns false for point ${point}, with maxY ${maxY}`
            );
          }
        });
      }),
      { numRuns }
    );
  });

  it('should ensure that charges are always inside a bordure', () => {
    fc.assert(
      fc.property(simplifiedChargeArb, lineArb, (charge, line) => {
        const blason: SimpleBlason = {
          kind: 'simple',
          field: { kind: 'plain', tincture: azure },
          ordinary: { name: 'bordure', line, tincture: or },
          charge,
        };

        const { chargesParsedPoints } = assertOnCoatsOfArms(blason);

        const bordurePathStr = document.querySelector('.blason-ordinary path')!.getAttribute('d') || '';
        const firstZIndex = bordurePathStr.indexOf('Z');
        const bordurePath = getPathSegments(bordurePathStr.substr(firstZIndex + 1));

        chargesParsedPoints.forEach((point) => {
          const isInsideBordure = pointInSvgPolygon.isInside(point, bordurePath);
          if (!isInsideBordure) {
            expect(false).toBe(`Blason '${stringifyBlason(blason)}' returns false for point ${point}`);
          }
        });
      }),
      { numRuns }
    );
  });
});
