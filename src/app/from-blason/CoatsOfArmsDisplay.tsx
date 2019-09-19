import * as React from 'react';
import { Blason } from '../model/blason';
import { isThereFur } from './blason.helpers';
import { uuid } from '../../utils/uuid';
import { ermines, Furs, isFur, potents, Tincture, vairs } from '../model/tincture';
import { Dimension } from '../model/dimension';
import { ErminePatternDef } from './coats-of-arms-parts/ErminePatternDef';
import { VairPatternDef } from './coats-of-arms-parts/VairPatternDef';
import { PotentPatternDef } from './coats-of-arms-parts/PotentPatternDef';
import { Configuration } from '../model/configuration';
import { EscutcheonDisplay } from './coats-of-arms-parts/escutcheon/EscutcheonDisplay';
import { BlasonDisplay } from './coats-of-arms-parts/BlasonDisplay';
import { BlasonPath } from '../model/blason-path';

type Props = {
  blason: Blason;
  dimension: Dimension;
  configuration: Configuration;
  selectBlasonPart: (path: BlasonPath) => void;
};
export function CoatsOfArmsDisplay(props: Props) {
  const configuration = props.configuration;
  const tinctureConfiguration = configuration.tinctureConfiguration;
  const dimension = props.dimension;
  const { width, height } = dimension;

  const patternIds: { [K in Furs['name']]: string } = {
    vair: uuid(),
    'vair-en-pale': uuid(),
    'counter-vair': uuid(),
    ermine: uuid(),
    'counter-ermine': uuid(),
    erminois: uuid(),
    pean: uuid(),
    potent: uuid(),
    'counter-potent': uuid(),
    'potent-en-pale': uuid(),
    'potent-en-point': uuid(),
    'vair-en-point': uuid(),
  };

  function furPatternId(fur: Furs): string {
    return `field-pattern-${patternIds[fur.name]}`;
  }

  function fillFromTincture(tincture: Tincture): string {
    if (isFur(tincture)) {
      return `url(#${furPatternId(tincture)})`;
    } else {
      return tinctureConfiguration[tincture.name];
    }
  }

  const blason = props.blason;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="coats-of-arms-display">
      <defs>
        {ermines.map((ermine, i) => {
          return isThereFur(blason, ermine.name) ? (
            <ErminePatternDef
              key={ermine.name + i}
              ermine={ermine}
              dimension={dimension}
              patternId={furPatternId(ermine)}
              tinctureConfiguration={tinctureConfiguration}
            />
          ) : (
            ''
          );
        })}
        {vairs.map((vair, i) => {
          return isThereFur(blason, vair.name) ? (
            <VairPatternDef
              key={vair.name + i}
              vair={vair}
              patternId={furPatternId(vair)}
              dimension={dimension}
              tinctureConfiguration={tinctureConfiguration}
            />
          ) : (
            ''
          );
        })}
        {potents.map((potent, i) => {
          return isThereFur(blason, potent.name) ? (
            <PotentPatternDef
              key={potent.name + i}
              potent={potent}
              patternId={furPatternId(potent)}
              dimension={dimension}
              tinctureConfiguration={tinctureConfiguration}
            />
          ) : (
            ''
          );
        })}

        <clipPath id="plain-field-clip-path">
          <EscutcheonDisplay dimension={dimension} shieldShape={configuration.shieldShape} />
        </clipPath>
      </defs>

      <BlasonDisplay
        blason={blason}
        dimension={dimension}
        fillFromTincture={fillFromTincture}
        clipPathId="plain-field-clip-path"
        shieldShape={configuration.shieldShape}
        selectBlasonPart={props.selectBlasonPart}
      />
      <EscutcheonDisplay dimension={dimension} shieldShape={configuration.shieldShape} />
    </svg>
  );
}
