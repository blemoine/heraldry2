import * as React from 'react';
import { useContext } from 'react';
import { Blason } from '../model/blason';
import { allDeclaredTinctures } from './blason.helpers';
import { isFur, Tincture } from '../model/tincture';
import { Dimension } from '../model/dimension';
import { EscutcheonDisplay } from './coats-of-arms-parts/escutcheon/EscutcheonDisplay';
import { BlasonDisplay } from './coats-of-arms-parts/BlasonDisplay';
import { BlasonPath } from '../model/blason-path';
import { ConfigurationContext, furPatternId } from './configuration/ConfigurationContext';
import { FurConfiguration, FurPatternDef } from './coats-of-arms-parts/FurPatternDef';

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
      return { id: furPatternId(tincture, null) };
    } else {
      return { color: tinctureConfiguration[tincture.name] };
    }
  }

  const blason = props.blason;

  const allTinctures = allDeclaredTinctures(blason);
  const furConfiguration: FurConfiguration = {
    ermine: { spotWidth: width / 9, heightMarginScale: 0.45, widthMarginScale: 0 },
    vair: { bellWidth: dimension.width / 5, bellHeightRatio: 2 },
    potent: { bellWidth: dimension.width / 2.75, bellHeightRatio: 1 },
  };
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="coats-of-arms-display">
      <defs>
        <FurPatternDef furConfiguration={furConfiguration} allTinctures={allTinctures} postfixId={null} />

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
