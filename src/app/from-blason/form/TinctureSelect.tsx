import * as React from 'react';
import { useContext, useRef, useState } from 'react';
import {
  isErmine,
  isFur,
  isPotent,
  isVair,
  metalAndColours,
  MetalsAndColours,
  Tincture,
  tinctures,
} from '../../model/tincture';
import { Overlay, Popover } from 'react-bootstrap';
import { ErminePatternDef } from '../coats-of-arms-parts/ErminePatternDef';
import { VairPatternDef } from '../coats-of-arms-parts/VairPatternDef';
import { PotentPatternDef } from '../coats-of-arms-parts/PotentPatternDef';
import { cannotHappen } from '../../../utils/cannot-happen';
import { uuid } from '../../../utils/uuid';
import { stringifyTincture } from '../../model/stringify/stringify.helper';
import { ConfigurationContext } from '../configuration/ConfigurationContext';

const TinctureRenderer = ({ tincture }: { tincture: Tincture }) => {
  const tinctureConfiguration = useContext(ConfigurationContext).tinctureConfiguration;
  const width = 30;
  const height = 30;
  const id = uuid();
  if (isFur(tincture)) {
    const dimension = { width: width * 2, height: height * 2 };
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ margin: 'auto', display: 'block', border: '1px solid #ccc' }}
      >
        <defs>
          {isErmine(tincture) ? (
            <ErminePatternDef
              ermine={tincture}
              patternId={tincture.name + '-field-' + id}
              tinctureConfiguration={tinctureConfiguration}
              spotWidth={width / 4}
              heightMarginScale={0}
              widthMarginScale={0}
            />
          ) : isVair(tincture) ? (
            <VairPatternDef
              vair={tincture}
              patternId={tincture.name + '-field-' + id}
              bellWidth={dimension.width / 5}
              bellHeightRatio={2}
              tinctureConfiguration={tinctureConfiguration}
            />
          ) : isPotent(tincture) ? (
            <PotentPatternDef
              potent={tincture}
              patternId={tincture.name + '-field-' + id}
              bellWidth={dimension.width / 2.75}
              bellHeightRatio={1}
              tinctureConfiguration={tinctureConfiguration}
            />
          ) : (
            cannotHappen(tincture)
          )}
        </defs>
        <rect x={0} y={0} width={width} height={height} fill={`url(#${tincture.name}-field-${id})`} />
      </svg>
    );
  } else {
    return (
      <div
        style={{
          backgroundColor: tinctureConfiguration[tincture.name],
          width,
          height,
          margin: 'auto',
          border: '1px solid #ccc',
        }}
      />
    );
  }
};

type AbstractProps<T extends Tincture | null> = {
  tincture: T;
  tinctureChange: (t: T) => void;
  tinctureList: Array<T>;
};

const AbstractTinctureSelect = <T extends Tincture | null>({
  tincture,
  tinctureChange,
  tinctureList,
}: AbstractProps<T>) => {
  const target = useRef<HTMLDivElement | null>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  function selectTincture(tincture: T) {
    tinctureChange(tincture);
    setShowOverlay(false);
  }

  return (
    <div>
      <div
        className="tincture-select-popover-opener"
        style={{
          display: 'inline-block',
          cursor: 'pointer',
        }}
        ref={target}
        onClick={() => setShowOverlay(!showOverlay)}
      >
        {tincture ? (
          <>
            <TinctureRenderer tincture={tincture as Tincture} />
            <div className="tincture-select-label" style={{ textAlign: 'center' }}>
              {stringifyTincture(tincture as Tincture)}
            </div>
          </>
        ) : (
          <div className="tincture-select-label" style={{ textAlign: 'center' }}>
            None
          </div>
        )}
      </div>
      <Overlay
        target={target?.current ?? undefined}
        show={showOverlay}
        placement="top"
        rootClose={true}
        onHide={() => setShowOverlay(false)}
      >
        <Popover id="tincture-select-popover">
          <Popover.Title as="h3">Tincture</Popover.Title>
          <Popover.Content>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {tinctureList.map((tincture, i) => {
                if (tincture === null) {
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        width: '25%',
                        padding: '5px',
                        border: '1px solid #333',
                        flexDirection: 'column',
                      }}
                      title="None"
                      onClick={() => selectTincture(tincture)}
                    >
                      <div style={{ textAlign: 'center' }}>None</div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        width: '25%',
                        padding: '5px',
                        border: '1px solid #333',
                        flexDirection: 'column',
                      }}
                      title={stringifyTincture(tincture as Tincture)}
                      onClick={() => selectTincture(tincture)}
                    >
                      <TinctureRenderer tincture={tincture as Tincture} />
                      <div style={{ textAlign: 'center' }}>{stringifyTincture(tincture as Tincture)}</div>
                    </div>
                  );
                }
              })}
            </div>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  );
};

type TinctureProps = {
  tincture: Tincture;
  tinctureChange: (t: Tincture) => void;
};

export const TinctureSelect = ({ tincture, tinctureChange }: TinctureProps) => {
  return <AbstractTinctureSelect tincture={tincture} tinctureChange={tinctureChange} tinctureList={tinctures} />;
};

type MetalAndColoursProps = {
  tincture: MetalsAndColours | null;
  tinctureChange: (t: MetalsAndColours | null) => void;
};

const metalAndColoursAndNull = [...metalAndColours, null];
export const MetalAndColoursSelect = ({ tincture, tinctureChange }: MetalAndColoursProps) => {
  return (
    <AbstractTinctureSelect tincture={tincture} tinctureChange={tinctureChange} tinctureList={metalAndColoursAndNull} />
  );
};
