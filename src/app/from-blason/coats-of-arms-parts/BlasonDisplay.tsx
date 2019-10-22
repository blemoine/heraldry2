import * as React from 'react';
import { Blason } from '../../model/blason';
import { Dimension, scale } from '../../model/dimension';
import { cannotHappen } from '../../../utils/cannot-happen';
import { SimpleBlasonDisplay } from './SimpleBlasonDisplay';
import { ShieldShape } from '../../model/configuration';
import { BlasonPath } from '../../model/blason-path';
import { FillFromTincture } from '../fillFromTincture.helper';

type Props = {
  blason: Blason;
  dimension: Dimension;
  fillFromTincture: FillFromTincture;
  clipPathId: string;
  shieldShape: ShieldShape;
  selectBlasonPart: (path: BlasonPath) => void;
};
export const BlasonDisplay = ({
  blason,
  dimension,
  fillFromTincture,
  clipPathId,
  shieldShape,
  selectBlasonPart,
}: Props) => {
  if (blason.kind === 'simple') {
    return (
      <SimpleBlasonDisplay
        blason={blason}
        dimension={dimension}
        fillFromTincture={fillFromTincture}
        clipPathId={clipPathId}
        shape="default"
        shieldShape={shieldShape}
        selectBlasonPart={selectBlasonPart}
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
              <g key={i} className={'blason-quarter-' + (i + 1)} transform={`translate(${xTranslate} ${yTranslate})`}>
                <rect
                  x={0}
                  y={0}
                  width={quarterDimension.width}
                  height={quarterDimension.height}
                  fill="transparent"
                  stroke="#333"
                />
                <SimpleBlasonDisplay
                  blason={b}
                  dimension={quarterDimension}
                  fillFromTincture={fillFromTincture}
                  clipPathId="quarterly-clip-path"
                  shape={shape}
                  shieldShape={shieldShape}
                  selectBlasonPart={(path) => selectBlasonPart([i, path])}
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
