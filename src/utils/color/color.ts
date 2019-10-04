import { raise, Result } from '../result';
import { round } from '../round';
import * as seedrandom from 'seedrandom';

export type RgbColor = { r: number; g: number; b: number };
export type HslColor = { h: number; s: number; l: number };

export function parseRgbColor(str: string): Result<RgbColor> {
  const maybe3Based = str.match(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/);
  if (maybe3Based) {
    const r = parseInt(maybe3Based[1] + maybe3Based[1], 16);
    const g = parseInt(maybe3Based[2] + maybe3Based[2], 16);
    const b = parseInt(maybe3Based[3] + maybe3Based[3], 16);
    return { r, g, b };
  } else {
    const maybe6Based = str.match(/^#([0-9a-fA-F][0-9a-fA-F])([0-9a-fA-F][0-9a-fA-F])([0-9a-fA-F][0-9a-fA-F])$/);
    if (maybe6Based) {
      const r = parseInt(maybe6Based[1], 16);
      const g = parseInt(maybe6Based[2], 16);
      const b = parseInt(maybe6Based[3], 16);
      return { r, g, b };
    } else {
      return raise(`Cannot parse the color '${str}'`);
    }
  }
}

function normalize(n: number, max: number): number {
  return Math.min(Math.max(0, n / max), 1);
}

export function toHsl({ r, g, b }: RgbColor): HslColor {
  const normalizedR = normalize(r, 255);
  const normalizedG = normalize(g, 255);
  const normalizedB = normalize(b, 255);

  const max = Math.max(normalizedR, normalizedG, normalizedB);
  const min = Math.min(normalizedR, normalizedG, normalizedB);
  const l = (max + min) / 2;

  if (max === min) {
    return {
      h: 0,
      s: 0,
      l: round(l * 100, 2),
    };
  } else {
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    let h: number;

    if (max === normalizedR) {
      h = (normalizedG - normalizedB) / d + (normalizedG < normalizedB ? 6 : 0);
    } else if (max === normalizedG) {
      h = (normalizedB - normalizedR) / d + 2;
    } else {
      h = (normalizedR - normalizedG) / d + 4;
    }

    return {
      h: Math.round(h * 60),
      s: round(s * 100, 2),
      l: round(l * 100, 2),
    };
  }
}

function constrainColorComponent(value: number): number {
  return Math.round(Math.min(Math.max(0, value), 255));
}

export function toRgb({ h, s, l }: HslColor): RgbColor {
  const normalizedH = normalize(h, 360);
  const normalizedS = normalize(s, 100);
  const normalizedL = normalize(l, 100);

  function hue2rgb(p: number, q: number, t: number) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  if (normalizedS === 0) {
    return { r: normalizedL * 255, g: normalizedL * 255, b: normalizedL * 255 };
  } else {
    const q =
      normalizedL < 0.5 ? normalizedL * (1 + normalizedS) : normalizedL + normalizedS - normalizedL * normalizedS;
    const p = 2 * normalizedL - q;
    const r = hue2rgb(p, q, normalizedH + 1 / 3);
    const g = hue2rgb(p, q, normalizedH);
    const b = hue2rgb(p, q, normalizedH - 1 / 3);
    return {
      r: constrainColorComponent(r * 255),
      g: constrainColorComponent(g * 255),
      b: constrainColorComponent(b * 255),
    };
  }
}

export type ColorRange<T> = { [k in keyof T]: [number, number] };

export function generateInRange(seed: string, range: ColorRange<HslColor>): HslColor {
  const rng = seedrandom.alea(seed);

  return {
    h: range.h[0] + rng.quick() * (range.h[1] - range.h[0]),
    s: range.s[0] + rng.quick() * (range.s[1] - range.s[0]),
    l: range.l[0] + rng.quick() * (range.l[1] - range.l[0]),
  };
}

export function stringifyColor({ r, g, b }: RgbColor): string {
  return (
    '#' +
    Math.floor(r)
      .toString(16)
      .padStart(2, '0') +
    Math.floor(g)
      .toString(16)
      .padStart(2, '0') +
    Math.floor(b)
      .toString(16)
      .padStart(2, '0')
  );
}
