import { Colours, Metal, Stains, TinctureName } from './tincture';
import { ColorRange, HslColor } from '../../utils/color/color';

export type TinctureConfiguration = { [K in TinctureName]: string } & { name: string };

export const defaultTinctureConfiguration: TinctureConfiguration = {
  name: 'default',
  argent: '#FFFFFF',
  or: '#FFD700',
  azure: '#0000FF',
  sable: '#000000',
  gules: '#FF0000',
  vert: '#008000',
  purpure: '#800080',
  murrey: '#8A004B',
  sanguine: '#B22221',
  tenne: '#C67000',
};

export const defaultTinctureConfiguration2: TinctureConfiguration = {
  name: 'default2',
  argent: '#FFFFFF',
  or: '#fcdd08',
  azure: '#0f47af',
  sable: '#000000',
  gules: '#db1119',
  vert: '#088931',
  purpure: '#800080',
  murrey: '#8A004B',
  sanguine: '#B22221',
  tenne: '#C67000',
};

export const wappenWikiConfiguration: TinctureConfiguration = {
  name: 'wappenWiki',
  argent: '#f6f6f6',
  or: '#f2bc50',
  azure: '#0e6793',
  sable: '#333333',
  gules: '#bc2f2e',
  vert: '#3e933e',
  purpure: '#913a6a',
  murrey: '#a42d45',
  sanguine: '#a52f2d',
  tenne: '#bf7532',
};

export const colorConfigurationRange: { [K in (Metal | Colours | Stains)['name']]: ColorRange<HslColor> } = {
  argent: { h: [0, 0], s: [0, 0], l: [95, 100] },
  or: { h: [40, 52], s: [85, 100], l: [50, 65] },
  azure: { h: [200, 240], s: [80, 100], l: [30, 50] },
  sable: { h: [0, 0], s: [0, 0], l: [0, 20] },
  gules: { h: [0, 0], s: [60, 100], l: [45, 50] },
  vert: { h: [120, 140], s: [40, 100], l: [25, 40] },
  purpure: { h: [300, 325], s: [40, 100], l: [25, 40] },
  murrey: { h: [327, 348], s: [57, 100], l: [27, 41] },
  sanguine: { h: [0, 0], s: [57, 68], l: [41, 42] },
  tenne: { h: [30, 35], s: [60, 100], l: [39, 47] },
};
