import { engrailBetweenPoint, indentBetweenPoint, indentLineTo } from './line-style.helper';
import { SvgPathBuilder } from './svg-path-builder';

describe('line-style', () => {
  const startingPoint = [5, 10] as const;
  const path = SvgPathBuilder.start(startingPoint);
  describe('indentLineTo', () => {
    it('should draw a triangle vertically on horizontal line', () => {
      const indentedPath = indentLineTo(path, [15, 10], 6);

      expect(indentedPath.toPathAttribute()).toBe('M 5 10 L 10 16 L 15 10');
    });
    it('should draw a triangle horizontally on vertical line', () => {
      const indentedPath = indentLineTo(path, [5, 20], 6);

      expect(indentedPath.toPathAttribute()).toBe('M 5 10 L -1 15 L 5 20');
    });
    it('should draw a triangle vertically on horizontal line, defined in the opposite direction', () => {
      const indentedPath = indentLineTo(SvgPathBuilder.start([15, 10]), startingPoint, 6);

      expect(indentedPath.toPathAttribute()).toBe('M 15 10 L 10 4 L 5 10');
    });
    it('should draw a triangle horizontally on vertical line, defined in the opposite direction', () => {
      const indentedPath = indentLineTo(SvgPathBuilder.start([5, 20]), startingPoint, 6);

      expect(indentedPath.toPathAttribute()).toBe('M 5 20 L 11 15 L 5 10');
    });
    it('should do nothing if the distance between point is 0', () => {
      const indentedPath = indentLineTo(path, startingPoint, 6);

      expect(indentedPath.toPathAttribute()).toBe('M 5 10');
    });
    it('should draw a triangle perpendicular to a segment', () => {
      const indentedPath = indentLineTo(path, [15, 20], 6);

      expect(indentedPath.toPathAttribute()).toBe('M 5 10 L 5.75736 19.24264 L 15 20');
    });
  });

  describe('indentBetweenPoint', () => {
    it('should draw multiple triangle on an horizontal line', () => {
      const result = indentBetweenPoint(
        path,
        { line: 'indented', width: 10, height: 6 },
        (t: number) => [5 + 30 * t, 10] as const
      );

      expect(result.toPathAttribute()).toBe('M 5 10 L 10 16 L 15 10 L 20 16 L 25 10 L 30 16 L 35 10');
    });
  });
  describe('engrailBetweenPoint', () => {
    it('should draw multiple arcs on an horizontal line', () => {
      const result = engrailBetweenPoint(
        path,
        { line: 'with-arc', radius: 10, sweep: false },
        (t: number) => [5 + 30 * t, 10] as const
      );

      expect(result.toPathAttribute()).toBe('M 5 10 Q 10 20 15 10 Q 20 20 25 10 Q 30 20 35 10');
    });
  });
});
