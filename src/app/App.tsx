import * as React from 'react';
import { Header } from './Header';
import { FromBlason } from './from-blason/FromBlason';
import { useState } from 'react';
import { defaultPageState } from './model/pageState';

export const App = () => {
  const [pageState, setPageState] = useState(defaultPageState);

  const toggleConfiguration = () => setPageState({ ...pageState, configurationOpened: !pageState.configurationOpened });

  return (
    <>
      <Header pageState={pageState} toggleConfiguration={toggleConfiguration} />
      <div>
        <FromBlason pageState={pageState} />
      </div>
    </>
  );
};
