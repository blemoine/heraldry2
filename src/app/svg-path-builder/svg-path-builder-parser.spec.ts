import { isError } from '../../utils/result';
import { parseSvgPathBuilder } from './svg-path-builder-parser';

function testParse(str: string, expected: string): void {
  const path = parseSvgPathBuilder(str);
  if (isError(path)) {
    return fail(path.error.join('\n'));
  }
  expect(path.toPathAttribute()).toEqual(expected);
}

describe('parseSvgPathBuilder', () => {
  it('should parse a starting point', () => {
    testParse('M0 0  ', 'M 0 0');
  });

  it('should parse a simple path', () => {
    testParse('M0 0 L-12 23.4 ', 'M 0 0 L -12 23.4');
  });

  it('should parse a path with multi steps', () => {
    testParse('M0 0 L-12 23.4 L0 1 L.3 2.5', 'M 0 0 L -12 23.4 L 0 1 L 0.3 2.5');
  });

  it('should parse a path with inside L multi steps', () => {
    testParse('M0 0 L-12 23.4 0 1 .3 2.5', 'M 0 0 L -12 23.4 L 0 1 L 0.3 2.5');
  });

  it('should parse a path with an arc', () => {
    testParse('M     0 0 A    5.2 6 45 0 1    30.2 40.5', 'M 0 0 A5.2 6 45 0 1 30.2 40.5');
  });

  it('should parse a path with a relative bezier curve', () => {
    testParse('M     0 0 c 1 2  3.4 5 6    7', 'M 0 0 C 1 2 3.4 5 6 7');
  });

  it('should parse a path with a cubic bezier curve', () => {
    testParse('M     0 0 C 1 2  3.4 5 6    7', 'M 0 0 C 1 2 3.4 5 6 7');
  });

  it('should parse a path with a horizontal move', () => {
    testParse('M     0 0 h 12', 'M 0 0 H12');
  });

  it('should parse a path with a relative quadratique bezier curve', () => {
    testParse('M     0 0 s 1 2    5 6    ', 'M 0 0 S 1 2 5 6');
  });

  it('should parse a path with a Z', () => {
    testParse('M     1 2.3 L 4 5 Z', 'M 1 2.3 L 4 5 Z');
  });
  it('should parse a path with a z', () => {
    testParse('M     1 2.3 L 4 5 z', 'M 1 2.3 L 4 5 Z');
  });
  it('should parse relative go to', () => {
    testParse('M     1 2.3 l 4 5 z', 'M 1 2.3 L 5 7.3 Z');
  });
  it('should parse a real case', () => {
    testParse(
      'M182.19 1c-7.332 18.24-27.686-.839-47.75 8.938',
      'M 182.19 1 C 174.858 19.24 154.504 0.161 134.44 9.938'
    );
  });
});
