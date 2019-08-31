import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Blason } from '../model/blason';
import { stringifyBlason } from './blason.helpers';
import { parseBlason } from '../blason-parser/blasonParser';
import { isEqual } from 'lodash';

type Props = { blason: Blason; blasonChange: (blason: Blason) => void };
export function BlasonForm({ blason, blasonChange }: Props) {
  const [blasonStr, setBlasonStr] = useState(stringifyBlason(blason));
  const [blasonErr, setBlasonErr] = useState<Array<string>>([]);

  useEffect(() => {
    setBlasonStr(stringifyBlason(blason));
  }, [blason]);

  const updateBlason = useCallback(
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
    },
    [blason, blasonChange]
  );

  return (
    <>
      <div className="form-group" style={{ padding: '5px 10px', marginTop: '10px' }}>
        <textarea
          style={{ height: '120px' }}
          value={blasonStr}
          onChange={(e) => updateBlason(e.target.value)}
          placeholder="Enter the blason here"
          className="form-control"
        />
      </div>
      <pre>
        <div className="invalid-feedback" style={{ display: 'block' }}>
          {blasonErr.map((err, i) => (
            <p key={i}>{err}</p>
          ))}
        </div>
      </pre>
    </>
  );
}
