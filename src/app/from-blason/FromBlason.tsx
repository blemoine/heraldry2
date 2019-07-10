import * as React from 'react';
import { useEffect, useState } from 'react';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';
import { TinctureSelect } from './TinctureSelect';
import { OrdinaryForm } from './OrdinaryForm';
import { ermine, gules, Tincture } from '../model/tincture';
import { Blason } from '../model/blason';
import { Ordinary } from '../model/ordinary';

const baseDefaultBlason: Blason = {
  field: { kind: 'plain', tincture: gules },
  ordinary: {
    name: 'chevron',
    tincture: ermine,
  },
} as const;
export const FromBlason = () => {
  const localStorageKey = 'default-blason#2';
  const defaultBlasonStr = localStorage.getItem(localStorageKey);
  const defaultBlason = defaultBlasonStr ? JSON.parse(defaultBlasonStr) : baseDefaultBlason;

  const [blason, setBlason] = useState<Blason>(defaultBlason);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(blason));
  }, [blason]);

  function fieldChange(tincture: Tincture) {
    setBlason({ ...blason, field: { kind: 'plain', tincture } });
  }

  function ordinaryChange(ordinary: Ordinary | null) {
    if (ordinary) {
      setBlason({ ...blason, ordinary });
    } else {
      const newBlason = { ...blason };
      delete newBlason.ordinary;
      setBlason(newBlason);
    }
  }

  return (
    <div className="row">
      <div className="col-md-12 col-lg-6">
        {blason.field.kind === 'plain' && (
          <div className="form-group">
            <label>Select your field</label>
            <TinctureSelect tincture={blason.field.tincture} tinctureChange={fieldChange} />
          </div>
        )}

        <OrdinaryForm ordinary={blason.ordinary || null} ordinaryChange={ordinaryChange} />
      </div>
      <div className="col-md-12 col-lg-6">
        <CoatsOfArmsDisplay blason={blason} />
      </div>
    </div>
  );
};
