import * as React from 'react';
import { defaultTinctureConfiguration, TinctureConfiguration } from '../../model/tincture-configuration';
import { Configuration } from '../../model/configuration';
import { Furs, isErmine, isFur, MetalsAndColours, Tincture } from '../../model/tincture';
import { uuid } from '../../../utils/uuid';

export const ConfigurationContext: React.Context<Configuration> = React.createContext<Configuration>({
  shieldShape: 'heater' as const,
  tinctureConfiguration: defaultTinctureConfiguration,
});

let patternIds: { [K in Furs['name']]: string } | null = null;
function getPatternId(fur: Furs): string {
  if (!patternIds) {
    patternIds = {
      vair: uuid(),
      'vair-en-pale': uuid(),
      'counter-vair': uuid(),
      ermined: uuid(),
      potent: uuid(),
      'counter-potent': uuid(),
      'potent-en-pale': uuid(),
      'potent-en-point': uuid(),
      'vair-en-point': uuid(),
    };
  }
  return patternIds[fur.name];
}

export function furPatternId(fur: Furs, postfixId: string | null): string {
  const patternId = getPatternId(fur);
  if (isErmine(fur)) {
    return `field-pattern-${patternId}-${fur.field.name}-${fur.spot.name}` + (postfixId ? '-' + postfixId : '');
  } else {
    return `field-pattern-${patternId}-${fur.field.name}` + (postfixId ? '-' + postfixId : '');
  }
}

export function fillFromConfiguration(
  tinctureConfiguration: TinctureConfiguration,
  tincture: Tincture,
  postfixId: string | null
): string {
  if (isFur(tincture)) {
    const newPatternDef = furPatternId(tincture, postfixId);
    return `url(#${newPatternDef})`;
  } else {
    return tinctureConfiguration[tincture.name];
  }
}

export function fillMetalOrColoursFromConfiguration(
  tinctureConfiguration: TinctureConfiguration,
  tincture: MetalsAndColours
): string {
  return fillFromConfiguration(tinctureConfiguration, tincture, null);
}
