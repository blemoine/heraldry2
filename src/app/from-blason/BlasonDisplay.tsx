import * as React from 'react';
import { Blason } from '../model/blason';
import { Plain } from './blason-parts/plain';


type Props = { blason: Blason };
export const BlasonDisplay = (props: Props) => {
  return <div>
    <Plain width={200} tincture={props.blason.field} />
  </div>;
};
