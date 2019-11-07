import * as React from 'react';
import { ErmineDisplay } from './ErmineDisplay';
import { Dimension } from '../../model/dimension';
import { TinctureConfiguration } from '../../model/tincture-configuration';
import { Ermined } from '../../model/tincture';

type Props = { ermine: Ermined; patternId: string; dimension: Dimension; tinctureConfiguration: TinctureConfiguration };
export const ErminePatternDef = ({ ermine, patternId, dimension: { width }, tinctureConfiguration }: Props) => {
  const fieldColor = tinctureConfiguration[ermine.field.name];
  const patternUnitWidth = 70;
  const patternUnitHeight = 125;
  const patternHeightMargin = 5;
  const patternWidth = width / 5.5;
  const patternHeight = (patternWidth * patternUnitHeight) / patternUnitWidth;
  const id = ermine.name + '-' + ermine.field.name + '-' + ermine.spot.name;
  return (
    <>
      <symbol viewBox="0 0 200 240" id={id}>
        <ErmineDisplay width={200} height={240} fill={fieldColor} spot={tinctureConfiguration[ermine.spot.name]} />
      </symbol>

      <pattern
        id={patternId}
        width={patternWidth}
        height={patternHeight}
        patternUnits="userSpaceOnUse"
        viewBox={`0 0 ${patternUnitWidth} ${patternUnitHeight}`}
      >
        <rect width={patternUnitWidth} height={patternUnitHeight} fill={fieldColor} />
        <use
          href={'#' + id}
          x="0"
          y="0"
          width={patternUnitWidth / 2}
          height={(patternUnitHeight - patternHeightMargin) / 2}
        />
        <use
          href={'#' + id}
          x={patternUnitWidth / 2}
          y={(patternUnitHeight + patternHeightMargin) / 2}
          width={patternUnitWidth / 2}
          height={(patternUnitHeight - patternHeightMargin) / 2}
        />
      </pattern>
    </>
  );
};
