import * as React from 'react';
import { isErmine, isPotent, isVair, Tincture } from '../../model/tincture';
import { isNotNull } from '../../../utils/isNotNull';
import { FurTransformProperty, getFurName, toTransform } from './FurPattern.model';

type Props = {
  tinctures: Array<Tincture>;
  postfixId: string;
  transformProperties: FurTransformProperty;
};

export const FurPatternDefinition = ({ tinctures, postfixId, transformProperties }: Props) => {
  return (
    <>
      {tinctures
        .map((tincture, i) => {
          if (isErmine(tincture)) {
            const furName = getFurName(tincture);
            const fillId = transformProperties[furName].fillId;
            const newPatternDef = fillId + '-' + postfixId;
            return (
              <pattern
                key={i}
                id={`${newPatternDef}`}
                xlinkHref={`#${fillId}`}
                patternTransform={toTransform(transformProperties[furName].property)}
              />
            );
          } else if (isVair(tincture)) {
            const furName = getFurName(tincture);
            const fillId = transformProperties[furName].fillId;
            const newPatternDef = fillId + '-' + postfixId;
            return (
              <pattern
                key={i}
                id={`${newPatternDef}`}
                xlinkHref={`#${fillId}`}
                patternTransform={toTransform(transformProperties[furName].property)}
              />
            );
          } else if (isPotent(tincture)) {
            const furName = getFurName(tincture);
            const fillId = transformProperties[furName].fillId;
            const newPatternDef = fillId + '-' + postfixId;
            return (
              <pattern
                key={i}
                id={`${newPatternDef}`}
                xlinkHref={`#${fillId}`}
                patternTransform={toTransform(transformProperties[furName].property)}
              />
            );
          } else {
            return null;
          }
        })
        .filter(isNotNull)}
    </>
  );
};
