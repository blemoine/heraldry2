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
  pathBuilder: SvgPathBuilder | Array<{ pathBuilder: SvgPathBuilder; tincture: Tincture }>;
};
export const CommonOrdinaryDisplay = ({
  tincture,
  postfixId,
  transformProperties,
  fillFromTincture,
  onClick,
  pathBuilder,
}: Props) => {
  const pathBuilders = Array.isArray(pathBuilder) ? pathBuilder : [{ pathBuilder: pathBuilder, tincture }];

  const tinctures = pathBuilders.map(({ tincture }) => tincture);

  return (
    <>
      <FurPatternDefinition tinctures={tinctures} postfixId={postfixId} transformProperties={transformProperties} />
      {pathBuilders.map(({ pathBuilder, tincture }, i) => {
        const strokeColor = tincture.name === 'sable' ? '#777' : '#333';
        const fill = getFill(fillFromTincture, tincture, postfixId);
        return (
          <FocusablePathFromBuilder
            key={i}
            pathBuilder={pathBuilder}
            fill={fill}
            stroke={strokeColor}
            onClick={onClick}
          />
        );
      })}
    </>
  );
};
