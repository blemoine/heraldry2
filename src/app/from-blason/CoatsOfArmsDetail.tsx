import * as React from 'react';
import { useCallback, useState } from 'react';
import { Blason } from '../model/blason';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { Dimension, scale } from '../model/dimension';
import { BlasonForm } from './BlasonForm';
import { Configuration } from '../model/configuration';

const resizeHandles = ['e' as const];
const minConstraints: [number, number] = [60, 80];
const maxConstraints: [number, number] = [480, 640];
const coatsOfArmsStyle = { border: '1px solid #CCC', padding: '5%' };

type Props = { configuration: Configuration; blason: Blason; blasonChange: (blason: Blason) => void };
export const CoatsOfArmsDetail = React.memo(function CoatsOfArmsDetail({ configuration, blason, blasonChange }: Props) {
  const [width, setWidth] = useState(400);
  const height = (width * 4) / 3;
  const dimension: Dimension = { height, width };
  const onResize = useCallback(
    function onResize(_e: React.SyntheticEvent, { size }: ResizeCallbackData) {
      setWidth(size.width);
    },
    [setWidth]
  );

  return (
    <div>
      <BlasonForm blason={blason} blasonChange={blasonChange} />

      <ResizableBox
        width={width}
        height={height}
        minConstraints={minConstraints}
        maxConstraints={maxConstraints}
        resizeHandles={resizeHandles}
        onResize={onResize}
      >
        <div style={coatsOfArmsStyle}>
          <CoatsOfArmsDisplay blason={blason} dimension={scale(dimension, 0.9)} configuration={configuration} />
        </div>
      </ResizableBox>
    </div>
  );
});
