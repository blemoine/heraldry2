import * as React from 'react';
import { Blason } from '../model/blason';
import { stringifyBlason } from './blason.helpers';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';

type Props = { blason: Blason };
export const CoatsOfArmsDetail = ({ blason }: Props) => {
  return (
    <div>
      <CoatsOfArmsDisplay blason={blason} />

      <p style={{ border: '1px solid #CCC', padding: '5px 10px', marginTop: '10px' }}>
        <em>{stringifyBlason(blason)}</em>
      </p>
    </div>
  );
};
