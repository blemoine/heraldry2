import * as React from 'react';
import { TinctureConfiguration } from '../../model/tincture-configuration';
import { Blason } from '../../model/blason';
import { BlasonDispatcherForm } from './BlasonDispatcherForm';
import { DivisionForm } from './DivisionForm';
import { BlasonPath } from '../../model/blason-path';

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  blason: Blason;
  blasonChange: (blason: Blason) => void;
  blasonPath: BlasonPath | null;
  setBlasonPath: (path: BlasonPath | null) => void;
};

export const BlasonForm = React.memo(function BlasonForm({
  blason,
  blasonChange,
  tinctureConfiguration,
  blasonPath,
  setBlasonPath,
}: Props) {
  return (
    <>
      <DivisionForm blason={blason} blasonChange={blasonChange} />
      <BlasonDispatcherForm
        tinctureConfiguration={tinctureConfiguration}
        blason={blason}
        blasonChange={blasonChange}
        blasonPath={blasonPath}
        setBlasonPath={setBlasonPath}
      />
    </>
  );
});
