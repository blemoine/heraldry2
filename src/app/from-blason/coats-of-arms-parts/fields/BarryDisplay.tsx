import * as React from 'react';
import { range } from '../../../../utils/range';
import { Dimension } from '../../../model/dimension';
import { BarryField } from '../../../model/field';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { isErmine, isPotent, isVair } from '../../../model/tincture';

type Props = {
  field: BarryField;
  fillFromTincture: FillFromTincture;
  dimension: Dimension;
  number: number;
};
export const BarryDisplay: React.FunctionComponent<Props> = ({
  field,
  fillFromTincture,
  dimension: { width, height },
  number,
}) => {
  const fillAndDef = field.tinctures.map((tincture, i) => {
    const fill = fillFromTincture(tincture);

    if ('color' in fill) {
      return { fill: fill.color, def: null };
    } else {
      const scaleRatio = 0.75 / (width / height);
      if (isErmine(tincture)) {
        const newPatternDef = fill.id + '-barry';
        return {
          fill: `url(#${newPatternDef})`,
          def: (
            <pattern
              key={i}
              id={`${newPatternDef}`}
              xlinkHref={`#${fill.id}`}
              patternTransform={`scale(${(4.1 * scaleRatio) / number})`}
            />
          ),
        };
      } else if (isVair(tincture)) {
        const newPatternDef = fill.id + '-barry';
        return {
          fill: `url(#${newPatternDef})`,
          def: (
            <pattern
              key={i}
              id={`${newPatternDef}`}
              xlinkHref={`#${fill.id}`}
              patternTransform={`scale(${(3.33 * scaleRatio) / number})`}
            />
          ),
        };
      } else if (isPotent(tincture)) {
        const newPatternDef = fill.id + '-barry';
        return {
          fill: `url(#${newPatternDef})`,
          def: (
            <pattern
              key={i}
              id={`${newPatternDef}`}
              xlinkHref={`#${fill.id}`}
              patternTransform={`scale(${(3.67 * scaleRatio) / number})`}
            />
          ),
        };
      } else {
        return { fill: `url(#${fill.id})`, def: null };
      }
    }
  });

  return (
    <>
      {fillAndDef.map(({ def }) => def)}
      {range(0, number).map((i) => {
        return (
          <rect
            key={i}
            x={0}
            y={(height * i) / number}
            height={height / number}
            width={width}
            fill={fillAndDef[i % 2].fill}
            stroke="#333"
          />
        );
      })}
    </>
  );
};
