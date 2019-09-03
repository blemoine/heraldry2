import * as React from 'react';
import { useState } from 'react';
import { Header } from './Header';
import { FromBlason } from './from-blason/FromBlason';
import { defaultPageState } from './model/pageState';
import { useLocalStorage } from '../utils/useLocalStorage';
import { Blason } from './model/blason';
import { Configuration } from './model/configuration';
import { defaultTinctureConfiguration } from './model/tincture-configuration';
import { gules } from './model/tincture';
import { Route } from 'react-router-dom';
import * as H from 'history';
import { parseBlason } from './blason-parser/blasonParser';
import { stringifyBlason } from './from-blason/blason.helpers';

const baseDefaultBlason: Blason = { kind: 'simple', field: { kind: 'plain', tincture: gules } } as const;
const configurationLocalStorageKey = 'configuration#1';

type Props = { location: H.Location; history: H.History };
const InnerApp = ({ location, history }: Props) => {
  const [pageState, setPageState] = useState(defaultPageState);

  const urlParams = new URLSearchParams(location.search);
  const urlBlason = urlParams.get('blason');
  const blason = urlBlason ? parseBlason(urlBlason) : baseDefaultBlason;
  if ('error' in blason) {
    // TODO display that correctly
    throw new Error(`Unsupported blason ${blason.error}`);
  }
  function setBlason(blason: Blason) {
    const blasonStr = stringifyBlason(blason);
    history.push({
      search: '?blason=' + blasonStr,
    });
  }

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

export const App = () => {
  return <Route component={InnerApp} />;
};
