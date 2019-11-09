import * as React from 'react';
import { ErmineDisplay } from './ErmineDisplay';
import { TinctureConfiguration } from '../../model/tincture-configuration';
import { Ermined } from '../../model/tincture';

type Props = {
  ermine: Ermined;
  patternId: string;
  tinctureConfiguration: TinctureConfiguration;
  spotWidth: number;
  widthMarginScale: number;
  heightMarginScale: number;
};
export const ErminePatternDef = ({
  ermine,
  patternId,
  tinctureConfiguration,
  spotWidth,
  widthMarginScale,
  heightMarginScale,
}: Props) => {
  const fieldColor = tinctureConfiguration[ermine.field.name];

  const ermineSpotWidth = 200;
  const ermineSpotHeight = 240;
  const spotHeight = (ermineSpotHeight * spotWidth) / ermineSpotWidth;

  const widthMargin = widthMarginScale * spotWidth;
  const heightMargin = heightMarginScale * spotHeight;
  const patternUnitWidth = spotWidth * 2 + widthMargin;
  const patternUnitHeight = spotHeight * 2 + heightMargin;

  const id = ermine.name + '-' + ermine.field.name + '-' + ermine.spot.name;

  return (
    <>
      <symbol viewBox={`0 0 ${ermineSpotWidth} ${ermineSpotHeight}`} id={id}>
        <ErmineDisplay
          width={ermineSpotWidth}
          height={ermineSpotHeight}
          fill={fieldColor}
          spot={tinctureConfiguration[ermine.spot.name]}
        />
      </symbol>

      <pattern
        id={patternId}
        width={patternUnitWidth}
        height={patternUnitHeight}
        patternUnits="userSpaceOnUse"
        viewBox={`0 0 ${patternUnitWidth} ${patternUnitHeight}`}
      >
        <rect width={patternUnitWidth} height={patternUnitHeight} fill={fieldColor} />
        <use href={'#' + id} x={widthMargin / 4} y={heightMargin / 4} width={spotWidth} height={spotHeight} />
        <use
          href={'#' + id}
          x={spotWidth + (3 * widthMargin) / 4}
          y={spotHeight + (3 * heightMargin) / 4}
          width={spotWidth}
          height={spotHeight}
        />
      </pattern>
    </>
  );
};
