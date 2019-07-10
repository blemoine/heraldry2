import * as React from 'react';
import { useEffect, useState } from 'react';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';
import { OrdinaryForm } from './OrdinaryForm';
import { ermine, gules } from '../model/tincture';
import { Blason, Field } from '../model/blason';
import { Ordinary } from '../model/ordinary';
import { FieldForm } from './FieldForm';

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

  function fieldChange(field: Field) {
    setBlason({ ...blason, field });
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
        <FieldForm field={blason.field} fieldChange={fieldChange} />

        <OrdinaryForm ordinary={blason.ordinary || null} ordinaryChange={ordinaryChange} />
      </div>
      <div className="col-md-12 col-lg-6">
        <CoatsOfArmsDisplay blason={blason} />
      </div>
    </div>
  );
};
