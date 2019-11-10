import * as React from 'react';
import { useContext } from 'react';
import { Dimension } from '../../../model/dimension';
import { PlainField } from '../../../model/field';
import { ConfigurationContext, fillFromConfiguration } from '../../configuration/ConfigurationContext';
import { FurConfiguration, WithFurPatternDef } from '../FurPatternDef';

type Props = { field: PlainField; dimension: Dimension };
export const PlainDisplay = ({ dimension, field }: Props) => {
  const { tinctureConfiguration } = useContext(ConfigurationContext);
  const { width, height } = dimension;
  const furConfiguration: FurConfiguration = {
    ermine: { spotWidth: width / 9, heightMarginScale: 0.45, widthMarginScale: 0 },
    vair: { bellWidth: width / 5, bellHeightRatio: 2 },
    potent: { bellWidth: width / 2.75, bellHeightRatio: 1 },
  };
  const postfixId = field.kind;
  const fill = fillFromConfiguration(tinctureConfiguration, field.tincture, postfixId);
  return (
    <WithFurPatternDef field={field} furConfiguration={furConfiguration}>
      <rect x={0} y={0} width={width} height={height} fill={fill} stroke="#333" />
    </WithFurPatternDef>
  );
};
