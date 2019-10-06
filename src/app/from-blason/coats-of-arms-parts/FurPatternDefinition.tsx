import * as React from 'react';
import { isErmine, isPotent, isVair, Tincture } from '../../model/tincture';
import { isNotNull } from '../../../utils/isNotNull';
import { FurTransformProperty, toTransform } from './FurPattern.model';

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
            const newPatternDef = transformProperties[tincture.name].fillId + '-' + postfixId;
            return (
              <pattern
                key={i}
                id={`${newPatternDef}`}
                xlinkHref={`#${transformProperties[tincture.name].fillId}`}
                patternTransform={toTransform(transformProperties[tincture.name].property)}
              />
            );
          } else if (isVair(tincture)) {
            const newPatternDef = transformProperties[tincture.name].fillId + '-' + postfixId;
            return (
              <pattern
                key={i}
                id={`${newPatternDef}`}
                xlinkHref={`#${transformProperties[tincture.name].fillId}`}
                patternTransform={toTransform(transformProperties[tincture.name].property)}
              />
            );
          } else if (isPotent(tincture)) {
            const newPatternDef = transformProperties[tincture.name].fillId + '-' + postfixId;
            return (
              <pattern
                key={i}
                id={`${newPatternDef}`}
                xlinkHref={`#${transformProperties[tincture.name].fillId}`}
                patternTransform={toTransform(transformProperties[tincture.name].property)}
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
