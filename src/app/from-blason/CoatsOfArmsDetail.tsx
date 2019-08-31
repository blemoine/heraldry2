import * as React from 'react';
import { useState } from 'react';
import { Blason } from '../model/blason';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { Dimension, scale } from '../model/dimension';
import { BlasonForm } from './BlasonForm';
import { Configuration } from '../model/configuration';

type Props = { configuration: Configuration; blason: Blason; blasonChange: (blason: Blason) => void };
export const CoatsOfArmsDetail = ({ configuration, blason, blasonChange }: Props) => {
  const [width, setWidth] = useState(200);
  const height = (width * 4) / 3;
  const dimension: Dimension = { height, width };
  function onResize(_e: React.SyntheticEvent, { size }: ResizeCallbackData) {
    setWidth(size.width);
  }

  return (
    <div>
      <BlasonForm blason={blason} blasonChange={blasonChange} />

      <ResizableBox
        width={width}
        height={height}
        minConstraints={[60, 80]}
        maxConstraints={[480, 640]}
        resizeHandles={['e']}
        onResize={onResize}
      >
        <CoatsOfArmsDisplay blason={blason} dimension={scale(dimension, 0.9)} configuration={configuration} />
      </ResizableBox>
    </div>
  );
};
