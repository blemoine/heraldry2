import * as React from 'react';
import { Blason } from '../model/blason';
import { stringifyBlason } from './blason.helpers';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useState } from 'react';

type Props = { blason: Blason };
export const CoatsOfArmsDetail = ({ blason }: Props) => {
  const [width, setWidth] = useState(200);
  const height = (width * 4) / 3;
  function onResize(_e: React.SyntheticEvent, { size }: ResizeCallbackData) {
    setWidth(size.width);
  }

  return (
    <div>
      <ResizableBox
        width={width}
        height={height}
        minConstraints={[60, 80]}
        maxConstraints={[420, 560]}
        resizeHandles={['e']}
        onResize={onResize}
      >
        <CoatsOfArmsDisplay blason={blason} width={width * 0.9} height={height * 0.9} />
      </ResizableBox>

      <p style={{ border: '1px solid #CCC', padding: '5px 10px', marginTop: '10px' }}>
        <em>{stringifyBlason(blason)}</em>
      </p>
    </div>
  );
};
