import * as React from 'react';
import { useState } from 'react';
import { Blason } from '../model/blason';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { scale } from '../model/dimension';
import { BlasonForm } from './BlasonForm';
import { defaultTinctureConfiguration } from '../model/tincture-configuration';

type Props = { blason: Blason; blasonChange: (blason: Blason) => void };
export const CoatsOfArmsDetail = ({ blason, blasonChange }: Props) => {
  const [width, setWidth] = useState(200);
  const height = (width * 4) / 3;
  const dimension = { height, width };
  function onResize(_e: React.SyntheticEvent, { size }: ResizeCallbackData) {
    setWidth(size.width);
  }
  const tinctureConfiguration = defaultTinctureConfiguration;

  return (
    <div>
      <BlasonForm blason={blason} blasonChange={blasonChange} />

      <ResizableBox
        width={width}
        height={height}
        minConstraints={[60, 80]}
        maxConstraints={[420, 560]}
        resizeHandles={['e']}
        onResize={onResize}
      >
        <CoatsOfArmsDisplay
          blason={blason}
          dimension={scale(dimension, 0.9)}
          tinctureConfiguration={tinctureConfiguration}
        />
      </ResizableBox>
    </div>
  );
};
