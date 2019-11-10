import * as React from 'react';
import { range } from '../../../../utils/range';
import { Dimension } from '../../../model/dimension';
import { BarryField } from '../../../model/field';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { getFill } from '../FurPattern.model';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { computeLineOptions, invertLineOptionNullable, oneSideLineOption } from '../blasonDisplay.helper';
import { FurConfiguration, WithFurPatternDef } from '../FurPatternDef';
import { cannotHappen } from '../../../../utils/cannot-happen';

type Props = {
  field: BarryField;
  fillFromTincture: FillFromTincture;
  dimension: Dimension;
  number: 6 | 8 | 10;
};

const postfixId = 'barry';

export const BarryDisplay: React.FunctionComponent<Props> = ({ field, fillFromTincture, dimension, number }) => {
  const { width, height } = dimension;

  const fills = field.tinctures.map((tincture) => getFill(fillFromTincture, tincture, postfixId));
  const lineOptions = computeLineOptions(field.line, dimension);
  const invertLineOptions = field.line === 'dancetty' ? lineOptions : invertLineOptionNullable(lineOptions);

  const oneSideOnly = oneSideLineOption(lineOptions);
  const invertedOneSideOnly = field.line === 'dancetty' ? lineOptions : oneSideLineOption(invertLineOptions);

  let furConfiguration: FurConfiguration;
  if (number === 6) {
    furConfiguration = {
      potent: { bellHeightRatio: 0.82, bellWidth: width / 5.5 },
      vair: { bellHeightRatio: 1, bellWidth: width / 9 },
      ermine: { spotWidth: width / 13, widthMarginScale: 0, heightMarginScale: 0.4 },
    };
  } else if (number === 8) {
    furConfiguration = {
      potent: { bellHeightRatio: 0.92, bellWidth: width / 5.5 },
      vair: { bellHeightRatio: 1.666, bellWidth: width / 10 },
      ermine: { spotWidth: width / 17, widthMarginScale: 0, heightMarginScale: 0.37 },
    };
  } else if (number === 10) {
    furConfiguration = {
      potent: { bellHeightRatio: 0.735, bellWidth: width / 5.5 },
      vair: { bellHeightRatio: 1.33, bellWidth: width / 10 },
      ermine: { spotWidth: width / 18, widthMarginScale: 0, heightMarginScale: 0 },
    };
  } else {
    cannotHappen(number);
  }

  return (
    <WithFurPatternDef field={field} furConfiguration={furConfiguration}>
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
    </WithFurPatternDef>
  );
};
