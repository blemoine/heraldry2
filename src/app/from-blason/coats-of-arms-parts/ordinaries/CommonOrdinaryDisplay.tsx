import { FurPatternDefinition } from '../FurPatternDefinition';
import { FocusablePathFromBuilder } from '../../../common/PathFromBuilder';
import * as React from 'react';
import { Tincture } from '../../../model/tincture';
import { FurTransformProperty, getFill } from '../FurPattern.model';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';

type Props = {
  tincture: Tincture;
  postfixId: string;
  transformProperties: FurTransformProperty;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
  pathBuilder: SvgPathBuilder | Array<SvgPathBuilder>;
};
export const CommonOrdinaryDisplay = ({
  tincture,
  postfixId,
  transformProperties,
  fillFromTincture,
  onClick,
  pathBuilder,
}: Props) => {
  const strokeColor = tincture.name === 'sable' ? '#777' : '#333';
  const fill = getFill(fillFromTincture, tincture, postfixId);

  const pathBuilders = Array.isArray(pathBuilder) ? pathBuilder : [pathBuilder];

  return (
    <>
      <FurPatternDefinition tinctures={[tincture]} postfixId={postfixId} transformProperties={transformProperties} />
      {pathBuilders.map((pathBuilder, i) => (
        <FocusablePathFromBuilder
          key={i}
          pathBuilder={pathBuilder}
          fill={fill}
          stroke={strokeColor}
          onClick={onClick}
        />
      ))}
    </>
  );
};
