import { range } from '../../../../utils/range';
import { max } from '../../../../utils/max';
import { SupportedNumber } from '../../../model/countAndDisposition';

const repartitionMapping = {
  1: [1],
  2: [2],
  3: [2, 1],
  4: [3, 1],
  5: [3, 2],
  6: [3, 2, 1],
  7: [3, 2, 2],
  8: [3, 3, 2],
  9: [3, 3, 3],
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

export function getChargePositions(
  count: SupportedNumber
): { cellWidth: number; positions: ReadonlyArray<[number, number]> } {
  const repartition: ReadonlyArray<number> = repartitionMapping[count];
  const columnCount = max(repartition) || 1;

  const positions = repartition.flatMap(
    (numberOfRoundel, row): Array<[number, number]> => {
      const cy = (row * 1.5 + 1) / (repartition.length * 2);
      const offset: number = columnCount - numberOfRoundel;
      return range(0, numberOfRoundel).map((i): [number, number] => {
        const cx = (i * 2 + 1.5 + offset) / (columnCount * 2 + 1);

        return [cx, cy];
      });
    }
  );
  return {
    cellWidth: 1 / (columnCount * 2 + 1),
    positions,
  };
}
