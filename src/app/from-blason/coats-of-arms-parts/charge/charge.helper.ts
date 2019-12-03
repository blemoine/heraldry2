import { range } from '../../../../utils/range';
import { max } from '../../../../utils/max';
import { Disposition, SupportedNumber } from '../../../model/countAndDisposition';
import { cannotHappen } from '../../../../utils/cannot-happen';
import { SimpleBlasonShape } from '../blasonDisplay.helper';
import { isNotNull } from '../../../../utils/isNotNull';

type RepartitionMapping = {
  [k in 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20]: Array<number>;
};
const defaultRepartitionMapping: RepartitionMapping = {
  1: [1],
  2: [2],
  3: [2, 1],
  4: [3, 1],
  5: [3, 2],
  6: [3, 2, 1],
  7: [3, 2, 2],
  8: [3, 3, 2],
  9: [3, 3, 2, 1],
  10: [4, 3, 2, 1],
  11: [4, 3, 3, 1],
  12: [4, 3, 3, 2],
  13: [4, 3, 3, 3],
  14: [5, 4, 3, 2],
  15: [5, 4, 3, 2, 1],
  16: [5, 4, 3, 3, 1],
  17: [5, 4, 3, 3, 2],
  18: [6, 5, 4, 2, 1],
  19: [6, 5, 4, 3, 1],
  20: [6, 5, 4, 3, 2],
};

const leftAndRightCutRepatitionMapping: RepartitionMapping = {
  ...defaultRepartitionMapping,
  8: [4, 3, 1],
  9: [4, 3, 2],
  13: [4, 3, 3, 2, 1],
};

function getRepartition(
  count: SupportedNumber,
  repartitionConfig: Disposition,
  shape: SimpleBlasonShape
): ReadonlyArray<ReadonlyArray<0 | 1>> {
  if (repartitionConfig === 'default') {
    if (shape === 'default' || shape === 'square') {
      // align center
      const baseMapping = defaultRepartitionMapping[count];
      //const isAllRowOdd = baseMapping.every((i) => i % 2 === 0);
      //const isAllRowEven = baseMapping.every((i) => i % 2 === 1);
      const columnCount = (max(baseMapping) || 1) * 2 + 1;
      const columnCenter = (columnCount - 1) / 2;
      return baseMapping.map((numberOfChargeOnTheRow) => {
        return range(0, columnCount).map((currCol): 1 | 0 => {
          const isCurColEven = currCol % 2 === 0;
          const distanceToCenter = Math.abs(currCol - columnCenter);
          if (numberOfChargeOnTheRow % 2 === 0) {
            if (columnCenter % 2 === 0 && isCurColEven) {
              return 0;
            } else if (columnCenter % 2 !== 0 && !isCurColEven) {
              return 0;
            }

            return distanceToCenter <= numberOfChargeOnTheRow ? 1 : 0;
          } else {
            if (columnCenter % 2 === 0 && !isCurColEven) {
              return 0;
            } else if (columnCenter % 2 !== 0 && isCurColEven) {
              return 0;
            }

            return distanceToCenter <= numberOfChargeOnTheRow - 1 ? 1 : 0;
          }
        });
      });
    } else {
      const baseMapping = leftAndRightCutRepatitionMapping[count];
      if (shape === 'leftCut') {
        const columnCount = max(baseMapping) || 1;
        return baseMapping.map((c) => range(0, columnCount).map((i) => (c >= columnCount - i ? 1 : 0)));
      } else if (shape === 'rightCut') {
        const columnCount = max(baseMapping) || 1;
        return baseMapping.map((c) => range(0, columnCount).map((i) => (c > i ? 1 : 0)));
      } else {
        return cannotHappen(shape);
      }
    }
  } else if (repartitionConfig === 'pale') {
    return range(0, count).map(() => [1]);
  } else if (repartitionConfig === 'fess') {
    return [[...range(0, count).flatMap((): Array<1 | 0> => [0, 1]), 0]];
  } else if (repartitionConfig === 'bend') {
    return range(0, count).map((i) => {
      return range(0, count).map((j) => (i === j ? 1 : 0));
    });
  } else if (repartitionConfig === 'bendSinister') {
    return range(0, count).map((i) => {
      return range(0, count).map((j) => (i === count - j - 1 ? 1 : 0));
    });
  } else {
    return cannotHappen(repartitionConfig);
  }
}

export function getChargePositions(
  count: SupportedNumber,
  repartitionConfig: Disposition,
  shape: SimpleBlasonShape
): { cellWidth: number; cellHeight: number; positions: ReadonlyArray<[number, number]> } {
  const repartition: ReadonlyArray<ReadonlyArray<0 | 1>> = getRepartition(count, repartitionConfig, shape);
  const columnCount = max(repartition.map((c) => c.length)) || 1;
  const rowCount = repartition.length;

  const positions = repartition.flatMap(
    (chargeRepartitionOnRow, row): Array<[number, number]> => {
      const cy = (row * 2 + 1) / (rowCount * 2);
      return chargeRepartitionOnRow
        .map((chargeInCell, i): [number, number] | null => {
          if (chargeInCell === 0) {
            return null;
          } else if (chargeInCell === 1) {
            const cx = (i * 2 + 1) / (columnCount * 2);

            return [cx, cy];
          } else {
            return cannotHappen(chargeInCell);
          }
        })
        .filter(isNotNull);
    }
  );
  return {
    cellWidth: 1 / columnCount,
    cellHeight: 1 / rowCount,
    positions,
  };
}
