import * as React from 'react';
import { Header } from './Header';
import { FromBlason } from './from-blason/FromBlason';

export const App = () => {
  return (
    <>
      <Header />
      <div className="mt-3">
        <FromBlason />
      </div>
    </>
  );
};
