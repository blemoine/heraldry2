import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { FocusablePathFromBuilder } from '../../../common/PathFromBuilder';
import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Base } from '../../../model/ordinary';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { computeLineOptions } from '../blasonDisplay.helper';
import { buildFurTransformProperty, FurTransformProperty, getFill } from '../FurPattern.model';
import { FurPatternDefinition } from '../FurPatternDefinition';

const postfixId = 'base';

type Props = {
  dimension: Dimension;
  ordinary: Base;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
};
export const BaseOrdinaryDisplay = ({ dimension, ordinary, fillFromTincture, onClick }: Props) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const baseHeight = height / 4;
  const strokeColor = ordinary.tincture.name === 'sable' ? '#777' : '#333';
  const fill = getFill(fillFromTincture, ordinary.tincture, postfixId);

  const pathBuilder = SvgPathBuilder.start([0, height])
    .goTo([width, height])
    .goTo([width, height - baseHeight])
    .goTo([0, height - baseHeight], lineOptions)
    .close();

  const scaleRatio = height / 480;
  const transformProperties: FurTransformProperty = buildFurTransformProperty(fillFromTincture, {
    ermine: [{ kind: 'scale', value: 0.65 * scaleRatio }, { kind: 'translate', value: [0, 30] }],
    vair: [{ kind: 'scale', value: 0.55 * scaleRatio }, { kind: 'translate', value: [0, 5] }],
    potent: [{ kind: 'scale', value: 0.92 * scaleRatio }, { kind: 'translate', value: [0, 0] }],
  });

  return (
    <>
      <FurPatternDefinition
        tinctures={[ordinary.tincture]}
        postfixId={postfixId}
        transformProperties={transformProperties}
      />
      <FocusablePathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke={strokeColor} onClick={onClick} />
    </>
  );
};
