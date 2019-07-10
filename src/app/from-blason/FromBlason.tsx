import * as React from 'react';
import { useState } from 'react';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';
import { TinctureSelect } from './TinctureSelect';
import { OrdinaryForm } from './OrdinaryForm';
import { ermine, gules, Tincture } from '../model/tincture';
import { Blason } from '../model/blason';
import { Ordinary } from '../model/ordinary';

export const FromBlason = () => {
  const [blason, setBlason] = useState<Blason>({
    field: gules,
    ordinary: {
      name: 'chevron',
      tincture: ermine,
    },
  });

  function fieldChange(field: Tincture) {
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
        <div className="form-group">
          <label>Select your field</label>
          <TinctureSelect tincture={blason.field} tinctureChange={fieldChange} />
        </div>

        <OrdinaryForm ordinary={blason.ordinary || null} ordinaryChange={ordinaryChange} />
      </div>
      <div className="col-md-12 col-lg-6">
        <CoatsOfArmsDisplay blason={blason} />
      </div>
    </div>
  );
};
