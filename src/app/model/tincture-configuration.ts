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
