import * as React from 'react';
import { useContext } from 'react';
import { Blason } from '../model/blason';
import { allDeclaredTinctures } from './blason.helpers';
import { isErmine, isFur, isPotent, isVair, Tincture } from '../model/tincture';
import { Dimension } from '../model/dimension';
import { ErminePatternDef } from './coats-of-arms-parts/ErminePatternDef';
import { VairPatternDef } from './coats-of-arms-parts/VairPatternDef';
import { PotentPatternDef } from './coats-of-arms-parts/PotentPatternDef';
import { EscutcheonDisplay } from './coats-of-arms-parts/escutcheon/EscutcheonDisplay';
import { BlasonDisplay } from './coats-of-arms-parts/BlasonDisplay';
import { BlasonPath } from '../model/blason-path';
import { ConfigurationContext, furPatternId } from './configuration/ConfigurationContext';

type Props = {
  blason: Blason;
  dimension: Dimension;
  selectBlasonPart: (path: BlasonPath) => void;
};
export function CoatsOfArmsDisplay(props: Props) {
  const configuration = useContext(ConfigurationContext);
  const tinctureConfiguration = configuration.tinctureConfiguration;
  const dimension = props.dimension;
  const { width, height } = dimension;

  function fillFromTincture(tincture: Tincture): { color: string } | { id: string } {
    if (isFur(tincture)) {
      return { id: furPatternId(tincture) };
    } else {
      return { color: tinctureConfiguration[tincture.name] };
    }
  }

  const blason = props.blason;

  const allTinctures = allDeclaredTinctures(blason);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="coats-of-arms-display">
      <defs>
        {allTinctures.filter(isErmine).map((ermine, i) => {
          return (
            <ErminePatternDef
              key={ermine.name + i}
              ermine={ermine}
              patternId={furPatternId(ermine)}
              tinctureConfiguration={tinctureConfiguration}
              spotWidth={width / 9}
              heightMarginScale={0.45}
              widthMarginScale={0}
            />
          );
        })}
        {allTinctures.filter(isVair).map((vair, i) => {
          return (
            <VairPatternDef
              key={vair.name + i}
              vair={vair}
              patternId={furPatternId(vair)}
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
              patternId={furPatternId(potent)}
              dimension={dimension}
              tinctureConfiguration={tinctureConfiguration}
            />
          );
        })}

        <clipPath id="plain-field-clip-path">
          <EscutcheonDisplay
            dimension={dimension}
            shieldShape={configuration.shieldShape}
            fill="transparent"
            stroke="#333"
          />
        </clipPath>
      </defs>

      <BlasonDisplay
        blason={blason}
        dimension={dimension}
        fillFromTincture={fillFromTincture}
        clipPathId="plain-field-clip-path"
        selectBlasonPart={props.selectBlasonPart}
      />
      <EscutcheonDisplay
        dimension={dimension}
        shieldShape={configuration.shieldShape}
        fill="transparent"
        stroke="#333"
      />
    </svg>
  );
}
