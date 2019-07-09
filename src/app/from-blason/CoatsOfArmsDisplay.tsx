import * as React from 'react';
import { Blason } from '../model/blason';
import { Plain } from './coats-of-arms-parts/plain';
import { stringifyBlason } from './blason.helpers';
import { OrdinaryDisplay } from './coats-of-arms-parts/ordinaries/OrdinaryDisplay';


type Props = { blason: Blason };
export const CoatsOfArmsDisplay = (props: Props) => {
  return <div>
    <Plain width={200} tincture={props.blason.field}>
      {props.blason.ordinary && <OrdinaryDisplay ordinary={props.blason.ordinary} /> }
    </Plain>
    <p style={{border:'1px solid #CCC', padding:'5px 10px'}}><em>{stringifyBlason(props.blason)}</em></p>
  </div>;
};
