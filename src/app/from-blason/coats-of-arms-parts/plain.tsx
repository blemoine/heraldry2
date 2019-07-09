import * as React from 'react';
import { isFur, Tincture } from '../../model/blason';
import { uuid } from '../../../utils/uuid';
import { Ermine } from './ermine';
import { Vair } from './vair';

type Props = { width: number; tincture: Tincture };
export const Plain: React.FunctionComponent<Props> = (props) => {
  const height = (props.width * 6) / 5;

  const tincture = props.tincture;

  const patternId = 'field-pattern-' + uuid();
  return (
    <svg width={props.width} height={height} viewBox="0 0 200 240">
      {tincture.name === 'ermine' && (
        <defs>
          <Ermine />
          <pattern id={patternId} width={36.36} height={64.9} patternUnits="userSpaceOnUse" viewBox="0 0 70 125">
            <use href="#ermine" x="0" y="0" width={35} height={60} />
            <use href="#ermine" x="35" y="65" width={35} height={60} />
          </pattern>
        </defs>
      )}
      {tincture.name === 'vair' && (
        <defs>
          <Vair />
          <pattern id={patternId} width={40} height={80} patternUnits="userSpaceOnUse" viewBox="0 0 100 200">
            <use href="#vair" x="0" y="0" width={100} height={100} />
            <use href="#vair" x="-50" y="100" width={100} height={100} />
            <use href="#vair" x="50" y="100" width={100} height={100} />
          </pattern>
        </defs>
      )}

      <path
        d="M0 0 H200 V80 A197 199.2 90 0 1 100 240 A197 199.2 -90 0 1 0 80 Z"
        fill={isFur(tincture) ? 'url(#' + patternId + ')' : tincture.color}
        stroke="#333"
      />

      {props.children}
    </svg>
  );
};
