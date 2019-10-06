import * as React from 'react';
import { range } from '../../../../utils/range';
import { Dimension } from '../../../model/dimension';
import { BarryField } from '../../../model/field';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { FurPatternDefinition } from '../FurPatternDefinition';
import { buildFurTransformProperty, FurTransformProperty, getFill } from '../FurPattern.model';

type Props = {
  field: BarryField;
  fillFromTincture: FillFromTincture;
  dimension: Dimension;
  number: number;
};

const postfixId = 'barry';

export const BarryDisplay: React.FunctionComponent<Props> = ({
  field,
  fillFromTincture,
  dimension: { width, height },
  number,
}) => {
  const scaleRatio = 0.75 / (width / height);
  const transformProperties: FurTransformProperty = buildFurTransformProperty(fillFromTincture, {
    ermine: { kind: 'scale', value: (4.1 * scaleRatio) / number },
    vair: { kind: 'scale', value: (3.33 * scaleRatio) / number },
    potent: { kind: 'scale', value: (3.67 * scaleRatio) / number },
  });

  const fills = field.tinctures.map((tincture) => getFill(fillFromTincture, tincture, postfixId));

  return (
    <>
      <FurPatternDefinition
        tinctures={field.tinctures}
        postfixId={postfixId}
        transformProperties={transformProperties}
      />
      {range(0, number).map((i) => {
        return (
          <rect
            key={i}
            x={0}
            y={(height * i) / number}
            height={height / number}
            width={width}
            fill={fills[i % 2]}
            stroke="#333"
          />
        );
      })}
    </>
  );
};
