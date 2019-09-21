import * as React from 'react';
import { isErmine, isFur, isPotent, isVair, Tincture, tinctures } from '../../model/tincture';
import { TinctureConfiguration } from '../../model/tincture-configuration';
import { Overlay, Popover } from 'react-bootstrap';
import { ErminePatternDef } from '../coats-of-arms-parts/ErminePatternDef';
import { VairPatternDef } from '../coats-of-arms-parts/VairPatternDef';
import { PotentPatternDef } from '../coats-of-arms-parts/PotentPatternDef';
import { cannotHappen } from '../../../utils/cannot-happen';
import { useRef, useState } from 'react';
import { uuid } from '../../../utils/uuid';

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  tincture: Tincture;
  tinctureChange: (t: Tincture) => void;
};

const TinctureRenderer = ({
  tincture,
  tinctureConfiguration,
}: {
  tincture: Tincture;
  tinctureConfiguration: TinctureConfiguration;
}) => {
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
              dimension={dimension}
              patternId={tincture.name + '-field-' + id}
              tinctureConfiguration={tinctureConfiguration}
            />
          ) : isVair(tincture) ? (
            <VairPatternDef
              vair={tincture}
              patternId={tincture.name + '-field-' + id}
              dimension={dimension}
              tinctureConfiguration={tinctureConfiguration}
            />
          ) : isPotent(tincture) ? (
            <PotentPatternDef
              potent={tincture}
              patternId={tincture.name + '-field-' + id}
              dimension={dimension}
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

export const TinctureSelect = ({ tinctureConfiguration, tincture, tinctureChange }: Props) => {
  const target = useRef<HTMLDivElement | null>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  function selectTincture(tincture: Tincture) {
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
        <TinctureRenderer tincture={tincture} tinctureConfiguration={tinctureConfiguration} />
        <div className="tincture-select-label" style={{ textAlign: 'center' }}>
          {tincture.name}
        </div>
      </div>
      <Overlay
        target={target && target.current ? target.current : undefined}
        show={showOverlay}
        placement="top"
        rootClose={true}
        onHide={() => setShowOverlay(false)}
      >
        <Popover id="tincture-select-popover">
          <Popover.Title as="h3">Tincture</Popover.Title>
          <Popover.Content>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {tinctures.map((tincture, i) => {
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
                    title={tincture.name}
                    onClick={() => selectTincture(tincture)}
                  >
                    <TinctureRenderer tincture={tincture} tinctureConfiguration={tinctureConfiguration} />
                    <div style={{ textAlign: 'center' }}>{tincture.name}</div>
                  </div>
                );
              })}
            </div>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  );
};
