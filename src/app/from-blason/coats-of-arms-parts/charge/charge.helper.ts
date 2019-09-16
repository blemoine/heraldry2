import { range } from '../../../../utils/range';
import { max } from '../../../../utils/max';
import { Disposition, SupportedNumber } from '../../../model/countAndDisposition';
import { cannotHappen } from '../../../../utils/cannot-happen';
import { SimpleBlasonShape } from '../blasonDisplay.helper';

const defaultRepartitionMapping = {
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
} as const;

const leftAndRightCutRepatitionMapping = {
  ...defaultRepartitionMapping,
  8:[4,3,1],
  9: [4,3,2],
  13: [4, 3, 3, 2, 1],
} as const;

export function getChargePositions(
  count: SupportedNumber,
  repartitionConfig: Disposition,
  shape: SimpleBlasonShape
): { cellWidth: number; cellHeight: number; positions: ReadonlyArray<[number, number]> } {
  const repartition: ReadonlyArray<number> = getRepartition(count, repartitionConfig, shape);
  const columnCount = max(repartition) || 1;
  const rowCount = repartition.length;

  const align =
    shape === 'leftCut' ? ('right' as const) : shape === 'rightCut' ? ('left' as const) : ('center' as const);

  const positions = repartition.flatMap(
    (numberOfCharge, row): Array<[number, number]> => {
      const cy = (row * 2 + 1) / (rowCount * 2);
      const offset: number = columnCount - numberOfCharge;
      return range(0, numberOfCharge).map((i): [number, number] => {
        if (align === 'center') {
          const cx = (i * 2 + 1.5 + offset) / (columnCount * 2 + 1);

          return [cx, cy];
        } else if (align === 'right') {
          const cx = (i * 2 + 1.5 + 2 * offset) / (columnCount * 2 + 1);

          return [cx, cy];
        } else if (align === 'left') {
          const cx = (i * 2 + 1.5) / (columnCount * 2 + 1);

          return [cx, cy];
        } else {
          return cannotHappen(align);
        }
      });
    }
  );
  return {
    cellWidth: 1 / (columnCount * 2 + 1),
    cellHeight: 1 / rowCount,
    positions,
  };
}

function getRepartition(
  count: SupportedNumber,
  repartitionConfig: 'default' | 'pale' | 'fess',
  shape: SimpleBlasonShape
): ReadonlyArray<number> {
  if (repartitionConfig === 'default') {
    if (shape === 'default' || shape === 'square') {
      return defaultRepartitionMapping[count];
    } else if (shape === 'leftCut') {
      return leftAndRightCutRepatitionMapping[count];
    } else if (shape === 'rightCut') {
      return leftAndRightCutRepatitionMapping[count];
    } else {
      return cannotHappen(shape);
    }
  } else if (repartitionConfig === 'pale') {
    return range(0, count).map((_i) => 1);
  } else if (repartitionConfig === 'fess') {
    return [count];
  } else {
    return cannotHappen(repartitionConfig);
  }
}
