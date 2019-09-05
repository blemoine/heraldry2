import * as React from 'react';
import { TinctureConfiguration } from '../../model/tincture-configuration';
import { Blason } from '../../model/blason';
import { BlasonDispatcherForm } from './BlasonDispatcherForm';
import { DivisionForm } from './DivisionForm';

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  blason: Blason;
  blasonChange: (blason: Blason) => void;
};

export const BlasonForm = React.memo(function BlasonForm({ blason, blasonChange, tinctureConfiguration }: Props) {
  return (
    <>
      <DivisionForm blason={blason} blasonChange={blasonChange} />
      <BlasonDispatcherForm tinctureConfiguration={tinctureConfiguration} blason={blason} blasonChange={blasonChange} />
    </>
  );
});
