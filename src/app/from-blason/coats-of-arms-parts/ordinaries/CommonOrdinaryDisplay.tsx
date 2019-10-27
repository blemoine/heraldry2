import { FurPatternDefinition } from '../FurPatternDefinition';
import { FocusablePathFromBuilder } from '../../../common/PathFromBuilder';
import * as React from 'react';
import { Tincture } from '../../../model/tincture';
import { FurTransformProperty, getFill } from '../FurPattern.model';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';

type Props = {
  postfixId: string;
  transformProperties: FurTransformProperty;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
  pathBuilderAndTincture: Array<{ pathBuilder: SvgPathBuilder; tincture: Tincture }>;
};
export const CommonOrdinaryDisplay = ({
  postfixId,
  transformProperties,
  fillFromTincture,
  onClick,
  pathBuilderAndTincture,
}: Props) => {
  const tinctures = pathBuilderAndTincture.map(({ tincture }) => tincture);

  return (
    <>
      <FurPatternDefinition tinctures={tinctures} postfixId={postfixId} transformProperties={transformProperties} />
      {pathBuilderAndTincture.map(({ pathBuilder, tincture }, i) => {
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
