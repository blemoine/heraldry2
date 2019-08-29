import * as React from 'react';
import { TinctureConfiguration } from '../../model/tincture-configuration';
import { Blason, SimpleBlason } from '../../model/blason';
import { cannotHappen } from '../../../utils/cannot-happen';
import { SimpleBlasonForm } from './SimpleBlasonForm';

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  blason: Blason;
  blasonChange: (blason: Blason) => void;
};
export const BlasonForm = ({ blason, blasonChange, tinctureConfiguration }: Props) => {
  if (blason.kind === 'simple') {
    return (
      <SimpleBlasonForm tinctureConfiguration={tinctureConfiguration} blason={blason} blasonChange={blasonChange} />
    );
  } else if (blason.kind === 'quarterly') {
    const quarterlyBlasonChange = (i: 0 | 1 | 2 | 3) => (newBlason: SimpleBlason) => {
      const blasons = [
        i === 0 ? newBlason : blason.blasons[0],
        i === 1 ? newBlason : blason.blasons[1],
        i === 2 ? newBlason : blason.blasons[2],
        i === 3 ? newBlason : blason.blasons[3],
      ] as const;

      blasonChange({
        ...blason,
        blasons,
      });
    };
    return (
      <div>
        <SimpleBlasonForm
          tinctureConfiguration={tinctureConfiguration}
          blason={blason.blasons[0]}
          blasonChange={quarterlyBlasonChange(0)}
        />
        <SimpleBlasonForm
          tinctureConfiguration={tinctureConfiguration}
          blason={blason.blasons[1]}
          blasonChange={quarterlyBlasonChange(1)}
        />
        <SimpleBlasonForm
          tinctureConfiguration={tinctureConfiguration}
          blason={blason.blasons[2]}
          blasonChange={quarterlyBlasonChange(2)}
        />
        <SimpleBlasonForm
          tinctureConfiguration={tinctureConfiguration}
          blason={blason.blasons[3]}
          blasonChange={quarterlyBlasonChange(3)}
        />
      </div>
    );
  } else {
    return cannotHappen(blason);
  }
};
