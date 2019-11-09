import * as React from 'react';
import { Blason } from '../../model/blason';
import { BlasonDispatcherForm } from './BlasonDispatcherForm';
import { DivisionForm } from './DivisionForm';
import { BlasonPath } from '../../model/blason-path';

type Props = {
  blason: Blason;
  blasonChange: (blason: Blason) => void;
  blasonPath: BlasonPath | null;
  setBlasonPath: (path: BlasonPath | null) => void;
};

export const BlasonForm = React.memo(function BlasonForm({ blason, blasonChange, blasonPath, setBlasonPath }: Props) {
  return (
    <>
      <DivisionForm blason={blason} blasonChange={blasonChange} />
      <BlasonDispatcherForm
        blason={blason}
        blasonChange={blasonChange}
        blasonPath={blasonPath}
        setBlasonPath={setBlasonPath}
      />
    </>
  );
});
