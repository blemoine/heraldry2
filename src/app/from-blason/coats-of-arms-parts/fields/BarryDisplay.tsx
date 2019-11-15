import * as React from 'react';
import { range } from '../../../../utils/range';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { computeLineOptions, invertLineOptionNullable, oneSideLineOption } from '../blasonDisplay.helper';
import { Line } from '../../../model/line';

type Props = {
  fill: [string, string];
  line: Line;
  dimension: Dimension;
  number: 6 | 8 | 10;
};

export const BarryDisplay: React.FunctionComponent<Props> = ({ fill, line, dimension, number }) => {
  const { width, height } = dimension;

  const lineOptions = computeLineOptions(line, dimension);
  const invertLineOptions = line === 'dancetty' ? lineOptions : invertLineOptionNullable(lineOptions);

  const oneSideOnly = oneSideLineOption(lineOptions);
  const invertedOneSideOnly = line === 'dancetty' ? lineOptions : oneSideLineOption(invertLineOptions);

  return (
    <>
      {range(0, number).map((i) => {
        const barHeight = height / number;

        const startOffset = i === 0 ? barHeight : 0;
        const endOffset = i === number - 1 ? barHeight : 0;
        const lineOffset = line === 'urdy' ? barHeight : 0;
        const pathBuilder = SvgPathBuilder.rectangle(
          [0, i * barHeight - startOffset],
          { width, height: barHeight + lineOffset + startOffset + endOffset },
          {
            bottom: i % 2 === 1 ? oneSideOnly : lineOptions,
            top: i % 2 === 0 ? invertedOneSideOnly : invertLineOptions,
          }
        );

        return <PathFromBuilder key={i} pathBuilder={pathBuilder} fill={fill[i % 2]} stroke="#333" />;
      })}
    </>
  );
};
