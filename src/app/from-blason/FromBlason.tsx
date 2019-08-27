import * as React from 'react';
import { useEffect, useState } from 'react';
import { gules } from '../model/tincture';
import { Blason } from '../model/blason';
import { CoatsOfArmsDetail } from './CoatsOfArmsDetail';
import { BlasonForm } from './form/BlasonForm';
import { ConfigurationForm } from './configuration/ConfigurationForm';
import { defaultTinctureConfiguration } from '../model/tincture-configuration';
import { Configuration } from '../model/configuration';

const baseDefaultBlason: Blason = {
  field: { kind: 'plain', tincture: gules },
} as const;
export const FromBlason = () => {
  const blasonLocalStorageKey = 'default-blason#2';
  const defaultBlasonStr = localStorage.getItem(blasonLocalStorageKey);
  const defaultBlason = defaultBlasonStr ? JSON.parse(defaultBlasonStr) : baseDefaultBlason;

  const [blason, setBlason] = useState<Blason>(defaultBlason);

  useEffect(() => {
    localStorage.setItem(blasonLocalStorageKey, JSON.stringify(blason));
  }, [blason]);

  const configurationLocalStorageKey = 'configuration#1';
  const defaultConfigurationStr = localStorage.getItem(configurationLocalStorageKey);
  const defaultConfiguration = defaultConfigurationStr
    ? JSON.parse(defaultConfigurationStr)
    : {
        shieldShape: 'heater',
        tinctureConfiguration: defaultTinctureConfiguration,
      };

  const [configuration, setConfiguration] = useState<Configuration>(defaultConfiguration);
  useEffect(() => {
    localStorage.setItem(configurationLocalStorageKey, JSON.stringify(configuration));
  }, [configuration]);

  return (
    <>
      <ConfigurationForm configuration={configuration} configurationChange={setConfiguration} />
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <BlasonForm
            tinctureConfiguration={configuration.tinctureConfiguration}
            blason={blason}
            blasonChange={setBlason}
          />
        </div>
        <div className="col-md-12 col-lg-6">
          <CoatsOfArmsDetail
            configuration={configuration}
            blason={blason}
            blasonChange={(blason) => setBlason(blason)}
          />
        </div>
      </div>
    </>
  );
};
