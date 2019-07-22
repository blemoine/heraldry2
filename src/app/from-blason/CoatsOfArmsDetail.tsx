import * as React from 'react';
import { Blason } from '../model/blason';
import { stringifyBlason } from './blason.helpers';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useEffect, useState } from 'react';
import { parseBlason } from '../blason-parser/blasonParser';
import { isEqual } from 'lodash';

type Props = { blason: Blason; blasonChange: (blason: Blason) => void };
export const CoatsOfArmsDetail = ({ blason, blasonChange }: Props) => {
  const [width, setWidth] = useState(200);
  const height = (width * 4) / 3;
  function onResize(_e: React.SyntheticEvent, { size }: ResizeCallbackData) {
    setWidth(size.width);
  }

  const [blasonStr, setBlasonStr] = useState(stringifyBlason(blason));
  const [blasonErr, setBlasonErr] = useState<Array<string>>([]);

  useEffect(() => {
    setBlasonStr(stringifyBlason(blason));
  }, [blason]);

  function updateBlason(str: string) {
    setBlasonStr(str);
    const result = parseBlason(str);
    if ('error' in result) {
      setBlasonErr([result.error]);
    } else {
      if (!isEqual(blason, result)) {
        blasonChange(result);
        setBlasonErr([]);
      }
    }
  }

  return (
    <div>
      <div className="form-group" style={{ padding: '5px 10px', marginTop: '10px' }}>
        <textarea value={blasonStr} onChange={(e) => updateBlason(e.target.value)} className="form-control" />
      </div>
      <div className="invalid-feedback" style={{ display: 'block' }}>
        {blasonErr.map((err, i) => (
          <p key={i}>{err}</p>
        ))}
      </div>

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
    </div>
  );
};
