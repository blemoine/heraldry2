import * as React from 'react';
import { useRef, useState } from 'react';
import { Line, lines } from '../../model/line';
import { Overlay, Popover } from 'react-bootstrap';
import { PathFromBuilder } from '../../common/PathFromBuilder';
import { SvgPathBuilder } from '../../svg-path-builder/svg-path-builder';
import { computeLineOptions } from '../coats-of-arms-parts/blasonDisplay.helper';
import { stringifyLine } from '../../model/stringify/stringify.helper';

const LineRenderer = ({ line }: { line: Line }) => {
  const width = 50;
  const height = 30;

  const lineOptions = computeLineOptions(line, { width: width * 1.7, height: height * 5 });
  const oneSideOnly = lineOptions && 'oneSideOnly' in lineOptions ? lineOptions.oneSideOnly : false;
  const pathBuilder = SvgPathBuilder.start([0, height / 4])
    .goTo([0, (3 * height) / 4])
    .goTo([width, (3 * height) / 4], oneSideOnly ? null : lineOptions)
    .goTo([width, height / 4])
    .goTo([0, height / 4], lineOptions);
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ margin: 'auto', display: 'block', border: '1px solid #ccc' }}
    >
      <PathFromBuilder pathBuilder={pathBuilder} fill="#333" stroke="#333" />
    </svg>
  );
};

type Props = { line: Line; lineChange: (line: Line) => void };
export const LineSelect = ({ line, lineChange }: Props) => {
  const target = useRef<HTMLDivElement | null>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  function selectLine(line: Line) {
    lineChange(line);
    setShowOverlay(false);
  }

  return (
    <div>
      <div
        className="line-select-popover-opener"
        style={{ display: 'inline-block', cursor: 'pointer' }}
        ref={target}
        onClick={() => setShowOverlay(!showOverlay)}
      >
        <LineRenderer line={line} />
        <div className="tincture-select-label" style={{ textAlign: 'center' }}>
          {line}
        </div>
      </div>

      <Overlay
        target={target && target.current ? target.current : undefined}
        show={showOverlay}
        placement="top"
        rootClose={true}
        onHide={() => setShowOverlay(false)}
      >
        <Popover id="line-select-popover">
          <Popover.Title as="h3">Line style</Popover.Title>
          <Popover.Content>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {lines.map((line, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      width: '33%',
                      padding: '5px',
                      border: '1px solid #333',
                      flexDirection: 'column',
                    }}
                    title={line}
                    onClick={() => selectLine(line)}
                  >
                    <LineRenderer line={line} />
                    <div
                      style={{
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {stringifyLine(line)}
                    </div>
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
