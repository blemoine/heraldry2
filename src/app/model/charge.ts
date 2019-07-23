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
export type CountAndDisposition = { count: 1 } | { count: 2 | 3; disposition: 'pale' };
export type Lion = {
  name: 'lion';
  attitude: LionAttitude;
  head: LionHead | null;
  tail: LionTail | null;

  tincture: Tincture;
  armedAndLangued: Tincture;
  countAndDisposition: CountAndDisposition;
};

export const eagleAttitudes = ['displayed'] as const;
export type EagleAttitude = typeof eagleAttitudes[number];
export type Eagle = {
  name: 'eagle';
  attitude: EagleAttitude;
  tincture: Tincture;
  beakedAndArmed: Tincture;
};

export type Charge = Lion | Eagle;

export const charges: Array<Charge['name']> = ['lion', 'eagle'];
