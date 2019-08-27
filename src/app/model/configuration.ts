import { TinctureConfiguration } from './tincture-configuration';

export const shieldShapes = ['heater', 'spanish', 'swiss' /*, 'french',  */] as const;
export type ShieldShape = typeof shieldShapes[number];

export type Configuration = {
  shieldShape: ShieldShape;
  tinctureConfiguration: TinctureConfiguration;
};
