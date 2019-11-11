import * as React from 'react';
import { ReactElement, useContext } from 'react';
import { isErmine, isPotent, isVair, Tincture } from '../../model/tincture';
import { ErminePatternDef } from './ErminePatternDef';
import { ConfigurationContext, furPatternId } from '../configuration/ConfigurationContext';
import { VairPatternDef } from './VairPatternDef';
import { PotentPatternDef } from './PotentPatternDef';
import { Field } from '../../model/field';
import { allDeclaredTincturesOfField } from '../blason.helpers';

export type FurConfiguration = {
  ermine: { spotWidth: number; heightMarginScale: number; widthMarginScale: number };
  vair: { bellWidth: number; bellHeightRatio: number };
  potent: { bellWidth: number; bellHeightRatio: number };
};
type Props = {
  allTinctures: Array<Tincture>;
  postfixId: string | null;
  furConfiguration: FurConfiguration;
};
export const FurPatternDef = ({ allTinctures, postfixId, furConfiguration }: Props): ReactElement => {
  const { tinctureConfiguration } = useContext(ConfigurationContext);
  const { spotWidth, heightMarginScale, widthMarginScale } = furConfiguration.ermine;
  return (
    <>
      {allTinctures.filter(isErmine).map((ermine, i) => {
        return (
          <ErminePatternDef
            key={ermine.name + i}
            ermine={ermine}
            patternId={furPatternId(ermine, postfixId)}
            tinctureConfiguration={tinctureConfiguration}
            spotWidth={spotWidth}
            heightMarginScale={heightMarginScale}
            widthMarginScale={widthMarginScale}
          />
        );
      })}
      {allTinctures.filter(isVair).map((vair, i) => {
        return (
          <VairPatternDef
            key={vair.name + i}
            vair={vair}
            patternId={furPatternId(vair, postfixId)}
            bellWidth={furConfiguration.vair.bellWidth}
            bellHeightRatio={furConfiguration.vair.bellHeightRatio}
            tinctureConfiguration={tinctureConfiguration}
          />
        );
      })}
      {allTinctures.filter(isPotent).map((potent, i) => {
        return (
          <PotentPatternDef
            key={potent.name + i}
            potent={potent}
            patternId={furPatternId(potent, postfixId)}
            bellWidth={furConfiguration.potent.bellWidth}
            bellHeightRatio={furConfiguration.potent.bellHeightRatio}
            tinctureConfiguration={tinctureConfiguration}
          />
        );
      })}
    </>
  );
};

export function getPatternId(field: Field): string {
  if (field.kind === 'party' || field.kind === 'tierced') {
    return field.kind + '-' + field.per.name;
  } else {
    return field.kind;
  }
}

export const WithFurPatternDef: React.FunctionComponent<{
  field: Field;
  furConfiguration: FurConfiguration;
}> = ({ field, furConfiguration, children }) => {
  const allTinctures = allDeclaredTincturesOfField(field);
  const postfixId = getPatternId(field);

  return (
    <>
      <FurPatternDef allTinctures={allTinctures} postfixId={postfixId} furConfiguration={furConfiguration} />
      {children}
    </>
  );
};
