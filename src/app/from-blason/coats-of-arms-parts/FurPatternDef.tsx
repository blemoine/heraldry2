import * as React from 'react';
import { ReactElement, useContext } from 'react';
import { isErmine, isPotent, isVair, Tincture } from '../../model/tincture';
import { ErminePatternDef } from './ErminePatternDef';
import { ConfigurationContext, furPatternId } from '../configuration/ConfigurationContext';
import { VairPatternDef } from './VairPatternDef';
import { PotentPatternDef } from './PotentPatternDef';
import { Dimension } from '../../model/dimension';
import { Field } from '../../model/field';
import { allDeclaredTincturesOfField } from '../blason.helpers';

type FurConfiguration = {
  ermine: { spotWidth: number; heightMarginScale: number; widthMarginScale: number };
  vair: {};
  potent: {};
};
type Props = {
  allTinctures: Array<Tincture>;
  postfixId: string;
  dimension: Dimension;
  furConfiguration: FurConfiguration;
};
export const FurPatternDef = ({ allTinctures, postfixId, dimension, furConfiguration }: Props): ReactElement => {
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
            dimension={dimension}
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
            dimension={dimension}
            tinctureConfiguration={tinctureConfiguration}
          />
        );
      })}
    </>
  );
};

export const WithFurPatternDef: React.FunctionComponent<{
  field: Field;
  dimension: Dimension;
  furConfiguration: FurConfiguration;
}> = ({ field, dimension, furConfiguration, children }) => {
  const allTinctures = allDeclaredTincturesOfField(field);
  const postfixId = field.kind;

  return (
    <>
      <FurPatternDef
        allTinctures={allTinctures}
        postfixId={postfixId}
        dimension={dimension}
        furConfiguration={furConfiguration}
      />
      {children}
    </>
  );
};
