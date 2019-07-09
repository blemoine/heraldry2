import * as React from 'react';
import { useState } from 'react';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';
import { argent, Blason, ermine, gules, Ordinary, Tincture } from '../model/blason';
import { TinctureSelect } from './TinctureSelect';
import { OrdinaryNameSelect } from './OrdinaryNameSelect';

export const FromBlason = () => {
  const [blason, setBlason] = useState<Blason>({
    field: gules,
    ordinary: {
      name: 'fess',
      tincture: ermine,
    },
  });

  function fieldChange(field: Tincture) {
    setBlason({ ...blason, field });
  }

  function changeOrdinary(ordinary: Ordinary['name'] | null) {
    if (ordinary) {
      const tincture = blason.ordinary ? blason.ordinary.tincture : argent;
      setBlason({ ...blason, ordinary: { name: ordinary, tincture } });
    } else {
      const newBlason = { ...blason };
      delete newBlason.ordinary;
      setBlason(newBlason);
    }
  }

  function ordinaryTinctureChange(ordinaryTincture: Tincture) {
    if (blason.ordinary) {
      setBlason({
        ...blason,
        ordinary: {
          ...blason.ordinary,
          tincture: ordinaryTincture,
        },
      });
    } else {
      throw new Error('This function should not be called if there is no ordinary');
    }
  }

  return (
    <div className="row">
      <div className="col-md-12 col-lg-6">
        <div className="form-group">
          <label>Select your field</label>
          <TinctureSelect tincture={blason.field} tinctureChange={fieldChange} />
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label>Select your ordinary</label>
              <OrdinaryNameSelect
                ordinary={blason.ordinary ? blason.ordinary.name : null}
                ordinaryChange={changeOrdinary}
              />
            </div>
          </div>
          <div className="col">
            {blason.ordinary && (
              <div className="form-group">
                <label>Select the tincture of the ordinary</label>
                <TinctureSelect tincture={blason.ordinary.tincture} tinctureChange={ordinaryTinctureChange} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-6">
        <CoatsOfArmsDisplay blason={blason} />
      </div>
    </div>
  );
};
