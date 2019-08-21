import * as React from 'react';
import { Blason } from '../model/blason';
import { isThereFur } from './blason.helpers';
import { OrdinaryDisplay } from './coats-of-arms-parts/ordinaries/OrdinaryDisplay';
import { uuid } from '../../utils/uuid';
import { ermines, Furs, isFur, potents, Tincture, vairs } from '../model/tincture';
import { FieldDisplay } from './coats-of-arms-parts/FieldDisplay';
import { HeaterDisplay } from './coats-of-arms-parts/escutcheon/HeaterDisplay';
import { ChargeDisplay } from './coats-of-arms-parts/ChargeDisplay';
import { Dimension } from '../model/dimension';
import { ErminePatternDef } from './coats-of-arms-parts/ErminePatternDef';
import { VairPatternDef } from './coats-of-arms-parts/VairPatternDef';
import { PotentPatternDef } from './coats-of-arms-parts/PotentPatternDef';
import { TinctureConfiguration } from '../model/tincture-configuration';

type Props = { blason: Blason; dimension: Dimension; tinctureConfiguration: TinctureConfiguration };
export const CoatsOfArmsDisplay = (props: Props) => {
  const tinctureConfiguration = props.tinctureConfiguration;
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
  const ordinary = blason.ordinary;

  const [verticalOffset, heightScale] = ordinary && ordinary.name === 'chief' ? [1 / 5, 4 / 5] : [0, 1];

  const computedDimension = { width, height: height * heightScale };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
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
          <HeaterDisplay dimension={dimension} />
        </clipPath>
      </defs>

      <g clipPath="url(#plain-field-clip-path)">
        <GWrapper translate={[0, verticalOffset * height]}>
          <FieldDisplay dimension={computedDimension} field={blason.field} fillFromTincture={fillFromTincture} />
        </GWrapper>
      </g>

      {ordinary && (
        <g clipPath="url(#plain-field-clip-path)">
          <OrdinaryDisplay dimension={dimension} ordinary={ordinary} fill={fillFromTincture(ordinary.tincture)} />
        </g>
      )}

      {blason.charge && (
        <g clipPath="url(#plain-field-clip-path)">
          <GWrapper translate={[0, verticalOffset * height]}>
            <ChargeDisplay dimension={computedDimension} charge={blason.charge} fillFromTincture={fillFromTincture} />
          </GWrapper>
        </g>
      )}

      <HeaterDisplay dimension={dimension} />
    </svg>
  );
};

type GWrapperProps = { translate: [number, number] };
const GWrapper: React.FunctionComponent<GWrapperProps> = (props) => {
  const translate = props.translate;
  if (translate[0] !== 0 || translate[1] !== 0) {
    return <g transform={`translate(${translate[0]} ${translate[1]})`}>{props.children}</g>;
  } else {
    return <>{props.children}</>;
  }
};
