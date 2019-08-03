import { Tincture } from './tincture';
import { CountAndDisposition, SupportedNumber } from './countAndDisposition';

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

export type FleurDeLys = {
  name: 'fleurdelys';
  count: SupportedNumber;
  tincture: Tincture;
};

export type Roundel = {
  name: 'roundel';
  count: SupportedNumber;
  tincture: Tincture
};

export type Charge = Lion | Eagle | FleurDeLys | Roundel;

export const charges: Array<Charge['name']> = ['lion', 'eagle', 'fleurdelys', 'roundel'];
