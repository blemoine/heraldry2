import * as React from 'react';
import { defaultTinctureConfiguration } from '../../model/tincture-configuration';
import { Configuration } from '../../model/configuration';

export const ConfigurationContext: React.Context<Configuration> = React.createContext<Configuration>({
  shieldShape: 'heater' as const,
  tinctureConfiguration: defaultTinctureConfiguration,
});
