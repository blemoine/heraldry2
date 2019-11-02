export const argent = { tricking: ['ar.'], name: 'argent' } as const;
export type Argent = typeof argent;
export const or = { tricking: ['o.'], name: 'or' } as const;
export type Or = typeof or;

export const gules = { tricking: ['gu.'], name: 'gules' } as const;
export type Gules = typeof gules;
export const sable = { tricking: ['s.', 'sa.'], name: 'sable' } as const;
export type Sable = typeof sable;
export const azure = { tricking: ['as.', 'bl.', 'b.'], name: 'azure' } as const;
export type Azure = typeof azure;
export const vert = { tricking: ['vt.', 'v.'], name: 'vert' } as const;
export type Vert = typeof vert;
export const purpure = { tricking: ['purp.', 'pu.', 'p.'], name: 'purpure' } as const;
export type Purpure = typeof purpure;

export const murrey = { tricking: 'm.', name: 'murrey' } as const;
export type Murrey = typeof murrey;
export const sanguine = { tricking: [], name: 'sanguine' } as const;
export type Sanguine = typeof sanguine;
export const tenne = { tricking: [], name: 'tenne' } as const;
export type Tenne = typeof tenne;

export type Metal = Argent | Or;
export type Colours = Gules | Sable | Azure | Vert | Purpure;
export type Stains = Murrey | Sanguine | Tenne;

export type TinctureName = (Metal | Colours | Stains)['name'];

export type Ermined = { name: 'ermined'; field: MetalsAndColours; spot: MetalsAndColours };
function mkErmined(field: MetalsAndColours, spot: MetalsAndColours): Ermined {
  return { name: 'ermined', field, spot };
}

export const ermine = mkErmined(argent, sable);
export const counterErmine = mkErmined(sable, argent);
export const erminois = mkErmined(or, sable);
export const pean = mkErmined(sable, or);
export const ermines: ReadonlyArray<Ermined> = [ermine, counterErmine, erminois, pean] as const;
export function isErmine(t: Tincture): t is Ermined {
  return t.name === 'ermined';
}

export const vair = { name: 'vair', field: argent, bell: azure } as const;
export type Vair = typeof vair;
export const counterVair = { name: 'counter-vair', field: argent, bell: azure } as const;
export type CounterVair = typeof counterVair;
export const vairEnPale = { name: 'vair-en-pale', field: argent, bell: azure } as const;
export type VairEnPale = typeof vairEnPale;
export const vairEnPoint = { name: 'vair-en-point', field: argent, bell: azure } as const;
export type VairEnPoint = typeof vairEnPoint;

export const potent = { name: 'potent', field: argent, bell: azure } as const;
export type Potent = typeof potent;
export const counterPotent = { name: 'counter-potent', field: argent, bell: azure } as const;
export type CounterPotent = typeof counterPotent;
export const potentEnPale = { name: 'potent-en-pale', field: argent, bell: azure } as const;
export type PotentEnPale = typeof potentEnPale;
export const potentEnPoint = { name: 'potent-en-point', field: argent, bell: azure } as const;
export type PotentEnPoint = typeof potentEnPoint;

export type Vairs = Vair | CounterVair | VairEnPale | VairEnPoint;
export const vairs: ReadonlyArray<Vairs> = [vair, counterVair, vairEnPale, vairEnPoint] as const;
export function isVair(t: Tincture): t is Vairs {
  return vairs.some((e) => e.name === t.name);
}

export type Potents = Potent | CounterPotent | PotentEnPale | PotentEnPoint;
export const potents: ReadonlyArray<Potents> = [potent, counterPotent, potentEnPale, potentEnPoint] as const;
export function isPotent(t: Tincture): t is Potents {
  return potents.some((e) => e.name === t.name);
}

export type Furs = Ermined | Vairs | Potents;

export type MetalsAndColours = Metal | Colours;
export type Tincture = MetalsAndColours | Stains | Furs;

export function isFur(tincture: Tincture): tincture is Furs {
  return isErmine(tincture) || isVair(tincture) || isPotent(tincture);
}

export function isMetal(tincture: Tincture): tincture is Metal {
  return tincture.name === 'argent' || tincture.name === 'or';
}

export const metalAndColours: Array<MetalsAndColours> = [argent, or, gules, sable, azure, vert, purpure];

export const tinctures: Array<Tincture> = [
  ...metalAndColours,
  murrey,
  sanguine,
  tenne,
  ...ermines,
  ...vairs,
  ...potents,
];

export function areTinctureEquals(t1: Tincture, t2: Tincture): boolean {
  if (t1.name === 'ermined' && t2.name === 'ermined') {
    return areTinctureEquals(t1.spot, t2.spot) && areTinctureEquals(t1.field, t2.field);
  } else {
    return t1.name === t2.name;
  }
}
