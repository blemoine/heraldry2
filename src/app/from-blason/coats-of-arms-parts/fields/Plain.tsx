import * as React from 'react';
import { useContext } from 'react';
import { Dimension } from '../../../model/dimension';
import { PlainField } from '../../../model/field';
import { ConfigurationContext, fillFromConfiguration } from '../../configuration/ConfigurationContext';
import { WithFurPatternDef } from '../FurPatternDef';

type Props = { field: PlainField; dimension: Dimension };
export const PlainDisplay = ({ dimension, field }: Props) => {
  const { tinctureConfiguration } = useContext(ConfigurationContext);
  const { width, height } = dimension;
  const furConfiguration = {
    ermine: { spotWidth: width / 9, heightMarginScale: 0.45, widthMarginScale: 0 },
    vair: {},
    potent: {},
  };
  const postfixId = field.kind;
  const fill = fillFromConfiguration(tinctureConfiguration, field.tincture, postfixId);
  return (
    <WithFurPatternDef dimension={dimension} field={field} furConfiguration={furConfiguration}>
      <rect x={0} y={0} width={width} height={height} fill={fill} stroke="#333" />
    </WithFurPatternDef>
  );
};
