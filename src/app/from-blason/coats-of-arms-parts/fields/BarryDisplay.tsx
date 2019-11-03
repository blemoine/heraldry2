import * as React from 'react';
import { range } from '../../../../utils/range';
import { Dimension } from '../../../model/dimension';
import { BarryField } from '../../../model/field';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { FurPatternDefinition } from '../FurPatternDefinition';
import { buildFurTransformProperty, FurTransformProperty, getFill } from '../FurPattern.model';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { computeLineOptions, invertLineOptionNullable, oneSideLineOption } from '../blasonDisplay.helper';
import { allDeclaredTincturesOfField } from '../../blason.helpers';

type Props = {
  field: BarryField;
  fillFromTincture: FillFromTincture;
  dimension: Dimension;
  number: number;
};

const postfixId = 'barry';

export const BarryDisplay: React.FunctionComponent<Props> = ({ field, fillFromTincture, dimension, number }) => {
  const { width, height } = dimension;
  const scaleRatio = 0.75 / (width / height);
  const transformProperties: FurTransformProperty = buildFurTransformProperty(
    fillFromTincture,
    allDeclaredTincturesOfField(field),
    {
      ermine: { kind: 'scale', value: (4.1 * scaleRatio) / number },
      vair: { kind: 'scale', value: (3.33 * scaleRatio) / number },
      potent: { kind: 'scale', value: (3.67 * scaleRatio) / number },
    }
  );

  const fills = field.tinctures.map((tincture) => getFill(fillFromTincture, tincture, postfixId));
  const lineOptions = computeLineOptions(field.line, dimension);
  const invertLineOptions = field.line === 'dancetty' ? lineOptions : invertLineOptionNullable(lineOptions);

  const oneSideOnly = oneSideLineOption(lineOptions);
  const invertedOneSideOnly = field.line === 'dancetty' ? lineOptions : oneSideLineOption(invertLineOptions);
  return (
    <>
      <FurPatternDefinition
        tinctures={field.tinctures}
        postfixId={postfixId}
        transformProperties={transformProperties}
      />
      {range(0, number).map((i) => {
        const barHeight = height / number;

        const startOffset = i === 0 ? barHeight : 0;
        const endOffset = i === number - 1 ? barHeight : 0;
        const lineOffset = field.line === 'urdy' ? barHeight : 0;
        const pathBuilder = SvgPathBuilder.rectangle(
          [0, i * barHeight - startOffset],
          { width, height: barHeight + lineOffset + startOffset + endOffset },
          {
            bottom: i % 2 === 1 ? oneSideOnly : lineOptions,
            top: i % 2 === 0 ? invertedOneSideOnly : invertLineOptions,
          }
        );

        return <PathFromBuilder key={i} pathBuilder={pathBuilder} fill={fills[i % 2]} stroke="#333" />;
      })}
    </>
  );
};
