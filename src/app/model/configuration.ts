import { TinctureConfiguration } from './tincture-configuration';

export const shieldShapes = ['heater' /*, 'french', 'swiss', 'spanish'*/] as const;
export type ShieldShape = typeof shieldShapes[number];

export type Configuration = {
  shieldShape: ShieldShape;
  tinctureConfiguration: TinctureConfiguration;
};
