import { parseRgbColor, RgbColor, stringifyColor, toHsl, toRgb } from './color';
import fc from 'fast-check';

const rgbArb: fc.Arbitrary<RgbColor> = fc.record({
  r: fc.integer(0, 255),
  g: fc.integer(0, 255),
  b: fc.integer(0, 255),
});

describe('parseColor', () => {
  it('should parse 3 digits color', () => {
    const result = parseRgbColor('#1aF');
    expect(result).toEqual({ r: 17, g: 170, b: 255 });
  });
  it('should parse 6 digits color', () => {
    const result = parseRgbColor('#1AbF03');
    expect(result).toEqual({ r: 26, g: 191, b: 3 });
  });
  it('should fail if the color is invalid', () => {
    const result = parseRgbColor('WTH?');
    expect(result).toEqual({ error: [`Cannot parse the color 'WTH?'`] });
  });
});

describe('toHsl', () => {
  it('should convert some colors to HSL', () => {
    expect(toHsl(parseRgbColor('#ABCDEE') as RgbColor)).toEqual({ h: 210, s: 66.34, l: 80.2 });
    expect(toHsl(parseRgbColor('#3F5F1F') as RgbColor)).toEqual({ h: 90, s: 50.79, l: 24.71 });
    expect(toHsl(parseRgbColor('#3D3D3D') as RgbColor)).toEqual({ h: 0, s: 0, l: 23.92 });
  });
});

describe('toRGB', () => {
  it('should convert some colors to RGB', () => {
    expect(toRgb({ h: 210, s: 66.34, l: 80.2 })).toEqual({ r: 171, g: 205, b: 238 });
    expect(toRgb({ h: 90, s: 50.79, l: 24.71 })).toEqual({ r: 63, g: 95, b: 31 });
    expect(toRgb({ h: 0, s: 0, l: 23.91 })).toEqual({ r: 60.9705, g: 60.9705, b: 60.9705 });
  });

  it('should be the inverse of toHsl', () => {
    fc.assert(
      fc.property(rgbArb, (rgb: RgbColor) => {
        const { r, g, b } = toRgb(toHsl(rgb));
        // we want a precision of ±1
        const precision = -Math.log(2 * 1.1);
        expect(r).toBeCloseTo(rgb.r, precision);
        expect(g).toBeCloseTo(rgb.g, precision);
        expect(b).toBeCloseTo(rgb.b, precision);
      })
    );
  });
});

describe('stringifyRgb', () => {
  it('should be the inverse of toRgb', () => {
    fc.assert(
      fc.property(rgbArb, (rgb: RgbColor) => {
        expect(parseRgbColor(stringifyColor(rgb))).toEqual(rgb);
      })
    );
  });
});
