import * as React from 'react';
import { isFur, Tincture } from '../../model/blason';

type Props = { width: number; tincture: Tincture };
export const Plain = (props: Props) => {
  const height = (props.width * 6) / 5;

  const tincture = props.tincture;

  //TODO fur
  return (
    <svg width={props.width} height={height} viewBox="0 0 200 240">
      {isFur(tincture) ? (
        <g></g>
      ) : (
        <path d="M0 0 H200 V80 A197 199.2 90 0 1 100 240 A197 199.2 -90 0 1 0 80 Z" fill={tincture.color} />
      )}
    </svg>
  );
};
