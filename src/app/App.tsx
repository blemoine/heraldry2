import * as React from 'react';
import { Header } from './Header';
import { FromBlason } from './from-blason/FromBlason';
import { useState } from 'react';
import { defaultPageState } from './model/pageState';
import { useLocalStorage } from '../utils/useLocalStorage';
import { Blason } from './model/blason';
import { Configuration } from './model/configuration';
import { defaultTinctureConfiguration } from './model/tincture-configuration';
import { gules } from './model/tincture';
const baseDefaultBlason: Blason = { kind: 'simple', field: { kind: 'plain', tincture: gules } } as const;
const blasonLocalStorageKey = 'default-blason#2';
const configurationLocalStorageKey = 'configuration#1';

export const App = () => {
  const [pageState, setPageState] = useState(defaultPageState);
  const [blason, setBlason] = useLocalStorage<Blason>(blasonLocalStorageKey, baseDefaultBlason);
  const [configuration, setConfiguration] = useLocalStorage<Configuration>(configurationLocalStorageKey, {
    shieldShape: 'heater',
    tinctureConfiguration: defaultTinctureConfiguration,
  });

  const toggleConfiguration = () => setPageState({ ...pageState, configurationOpened: !pageState.configurationOpened });

  return (
    <>
      <Header pageState={pageState} toggleConfiguration={toggleConfiguration} />
      <div>
        <FromBlason
          pageState={pageState}
          blason={blason}
          configuration={configuration}
          blasonChange={setBlason}
          configurationChange={setConfiguration}
        />
      </div>
    </>
  );
};
