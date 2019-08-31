import * as React from 'react';
import { gules } from '../model/tincture';
import { Blason } from '../model/blason';
import { CoatsOfArmsDetail } from './CoatsOfArmsDetail';
import { ConfigurationForm } from './configuration/ConfigurationForm';
import { defaultTinctureConfiguration } from '../model/tincture-configuration';
import { Configuration } from '../model/configuration';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { BlasonForm } from './form/BlasonForm';
import { PageState } from '../model/pageState';

const baseDefaultBlason: Blason = { kind: 'simple', field: { kind: 'plain', tincture: gules } } as const;
type Props = { pageState: PageState };
export const FromBlason = ({ pageState }: Props) => {
  const blasonLocalStorageKey = 'default-blason#2';
  const [blason, setBlason] = useLocalStorage<Blason>(blasonLocalStorageKey, baseDefaultBlason);

  const configurationLocalStorageKey = 'configuration#1';
  const [configuration, setConfiguration] = useLocalStorage<Configuration>(configurationLocalStorageKey, {
    shieldShape: 'heater',
    tinctureConfiguration: defaultTinctureConfiguration,
  });

  return (
    <>
      <ConfigurationForm
        isOpen={pageState.configurationOpened}
        configuration={configuration}
        configurationChange={setConfiguration}
      />
      <div className="row mt-3 ml-2 mr-2">
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
