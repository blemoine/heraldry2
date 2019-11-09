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
import { stringifyBlason } from './model/stringify/stringify.helper';
import { ConfigurationContext } from './from-blason/configuration/ConfigurationContext';

const baseDefaultBlason: Blason = { kind: 'simple', field: { kind: 'plain', tincture: gules } } as const;
const configurationLocalStorageKey = 'configuration#1';

function useBlasonFromUrl(location: H.Location, history: H.History): [Blason, (blason: Blason) => void] {
  const urlParams = new URLSearchParams(location.search);
  const urlBlason = urlParams.get('blason');
  const blason = React.useMemo(() => (urlBlason ? parseBlason(urlBlason) : baseDefaultBlason), [urlBlason]);
  if ('error' in blason) {
    // TODO display that correctly
    throw new Error(`Unsupported blason ${blason.error}`);
  }
  const setBlason = React.useCallback(
    function setBlason(blason: Blason) {
      const blasonStr = stringifyBlason(blason);
      history.push({
        search: '?blason=' + blasonStr,
      });
    },
    [history]
  );

  return [blason, setBlason];
}

type Props = { location: H.Location; history: H.History };
const InnerApp = ({ location, history }: Props) => {
  const [pageState, setPageState] = useState(defaultPageState);

  const [blason, setBlason] = useBlasonFromUrl(location, history);

  const [configuration, setConfiguration] = useLocalStorage<Configuration>(configurationLocalStorageKey, {
    shieldShape: 'heater',
    tinctureConfiguration: defaultTinctureConfiguration,
  });

  const toggleConfiguration = () => setPageState({ ...pageState, configurationOpened: !pageState.configurationOpened });

  return (
    <>
      <Header pageState={pageState} toggleConfiguration={toggleConfiguration} />
      <div>
        <ConfigurationContext.Provider value={configuration}>
          <FromBlason
            pageState={pageState}
            blason={blason}
            blasonChange={setBlason}
            configurationChange={setConfiguration}
          />
        </ConfigurationContext.Provider>
      </div>
    </>
  );
};

export const App = () => {
  return <Route component={InnerApp} />;
};
