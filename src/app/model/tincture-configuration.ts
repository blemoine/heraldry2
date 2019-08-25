import { Colours, Metal, Stains } from './tincture';

export type TinctureConfiguration = { [K in (Metal | Colours | Stains)['name']]: string };

export const defaultTinctureConfiguration: TinctureConfiguration = {
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
