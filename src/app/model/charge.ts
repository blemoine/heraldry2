import { Tincture } from './tincture';
import { CountAndDisposition } from './countAndDisposition';

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
  countAndDisposition: CountAndDisposition;
};

export type FleurDeLys = {
  name: 'fleurdelys';
  countAndDisposition: CountAndDisposition;
  tincture: Tincture;
};

export const roundelInsides = ['nothing', 'voided'] as const;
export type RoundelInside = typeof roundelInsides[number];
export type Roundel = {
  name: 'roundel';
  countAndDisposition: CountAndDisposition;
  tincture: Tincture;
  inside: RoundelInside;
};

export const lozengeInsides = ['nothing', 'voided', 'pierced'] as const;
export type LozengeInside = typeof lozengeInsides[number];
export type Lozenge = {
  name: 'lozenge';
  countAndDisposition: CountAndDisposition;
  tincture: Tincture;
  inside: LozengeInside;
};

export const crossLimbs = [
  'hummetty',
  'pattée',
  'potent',
  'cercelée',
  'moline',
  'bottony',
  'crosselet',
  'maltese',
  'flory',
] as const;
export type CrossLimbs = typeof crossLimbs[number];
export type Cross = {
  name: 'cross';
  countAndDisposition: CountAndDisposition;
  tincture: Tincture;
  limbs: CrossLimbs;
};

export const mulletInsides = ['nothing', 'pierced'] as const;
export type MulletInside = typeof mulletInsides[number];
export const mulletPoints = [5, 6, 7, 8] as const;
export type MulletPoints = typeof mulletPoints[number];
export type Mullet = {
  name: 'mullet';
  countAndDisposition: CountAndDisposition;
  tincture: Tincture;
  inside: MulletInside;
  points: MulletPoints;
};

export type Escutcheon = {
  name: 'escutcheon';
  tincture: Tincture;
  countAndDisposition: CountAndDisposition;
};

export const crownTypes = ['dovetailed', 'ducal', 'embattled'] as const;
export type CrownType = typeof crownTypes[number];
export type Crown = {
  name: 'crown';
  type: CrownType;
  tincture: Tincture;
  countAndDisposition: CountAndDisposition;
};

export type Charge = Lion | Eagle | FleurDeLys | Roundel | Lozenge | Cross | Mullet | Escutcheon | Crown;

export const charges: Array<Charge['name']> = [
  'lion',
  'eagle',
  'fleurdelys',
  'roundel',
  'lozenge',
  'cross',
  'mullet',
  'escutcheon',
  'crown',
];
