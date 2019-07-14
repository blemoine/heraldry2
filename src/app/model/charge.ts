import { Tincture } from './tincture';

export const lionAttitudes = [
  'rampant',
  'passant',
  'statant',
  'salient',
  'sejant',
  'sejant-erect',
  'couchant',
  'dormant',
] as const;
export const lionHeads = ['guardant', 'regardant'] as const;
export const lionTails = ['coward', 'forked', 'crossed', 'nowed'] as const;

export type LionAttitude = typeof lionAttitudes[number];
export type LionHead = typeof lionHeads[number];
export type LionTail = typeof lionTails[number];
export type Lion = {
  name: 'lion';
  attitude: LionAttitude;
  head: LionHead | null;
  tail: LionTail | null;

  tincture: Tincture;
  armedAndLangued: Tincture; //If not specified, gules, or if the field is gules, azure
};

export type Charge = Lion;

export const charges: Array<Charge['name']> = ['lion'];
