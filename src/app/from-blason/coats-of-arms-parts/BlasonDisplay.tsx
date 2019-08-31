import * as React from 'react';
import { Blason } from '../../model/blason';
import { Dimension, scale } from '../../model/dimension';
import { cannotHappen } from '../../../utils/cannot-happen';
import { SimpleBlasonDisplay } from './SimpleBlasonDisplay';
import { Tincture } from '../../model/tincture';

type Props = {
  blason: Blason;
  dimension: Dimension;
  fillFromTincture: (tincture: Tincture) => string;
  clipPathId: string;
};
export const BlasonDisplay = ({ blason, dimension, fillFromTincture, clipPathId }: Props) => {
  if (blason.kind === 'simple') {
    return (
      <SimpleBlasonDisplay
        blason={blason}
        dimension={dimension}
        fillFromTincture={fillFromTincture}
        clipPathId={clipPathId}
        shape="default"
      />
    );
  } else if (blason.kind === 'quarterly') {
    const clipPathUrl = `url(#${clipPathId})`;

    const quarterDimension = scale(dimension, 2 / blason.blasons.length);

    return (
      <>
        <clipPath id="quarterly-clip-path">
          <rect x={0} y={0} width={quarterDimension.width} height={quarterDimension.height} />
        </clipPath>

        <g clipPath={clipPathUrl}>
          {blason.blasons.map((b, i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            const xTranslate = col * quarterDimension.width;
            const yTranslate = row * quarterDimension.height;

            const shape = row > 0 ? (col === 0 ? 'leftCut' : 'rightCut') : 'square';
            return (
              <g key={i} transform={`translate(${xTranslate} ${yTranslate})`}>
                <SimpleBlasonDisplay
                  blason={b}
                  dimension={quarterDimension}
                  fillFromTincture={fillFromTincture}
                  clipPathId="quarterly-clip-path"
                  shape={shape}
                />
              </g>
            );
          })}
        </g>
      </>
    );
  } else {
    return cannotHappen(blason);
  }
};
