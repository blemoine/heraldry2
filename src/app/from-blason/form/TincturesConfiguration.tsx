import * as React from 'react';
import { Tincture } from '../../model/tincture';
import { TinctureSelect } from './TinctureSelect';
import { capitalizeFirstLetter } from '../../../utils/strings';
import { TinctureConfiguration } from '../../model/tincture-configuration';

function toOrdinal(i: number): string {
  if (i === 1) {
    return 'first';
  } else if (i === 2) {
    return 'second';
  } else if (i === 3) {
    return 'third';
  } else if (i === 4) {
    return 'fourth';
  } else {
    throw new Error(`Cannot convert ${i} to ordinal yet`);
  }
}

type Props<T extends ReadonlyArray<Tincture>> = {
  tinctures: T;
  tincturesChanges: (t: T) => void;
  tinctureConfiguration: TinctureConfiguration;
};
export const TincturesConfiguration = <T extends ReadonlyArray<Tincture>>({
  tinctures,
  tincturesChanges,
  tinctureConfiguration,
}: Props<T>) => {
  function updateTincture(tincture: Tincture, index: number) {
    if (index >= tinctures.length) {
      throw new Error(`Cannot update the index ${index} in a tuple of size ${tinctures.length}`);
    }
    const newTinctures = [...tinctures];
    newTinctures[index] = tincture;
    tincturesChanges((newTinctures as unknown) as T);
  }

  return (
    <>
      {tinctures.map((tincture, i) => {
        const ordinal = toOrdinal(i + 1);

        return (
          <div className="col" key={i}>
            <div className={`form-group field-${ordinal}-tincture-select`}>
              <label>{capitalizeFirstLetter(ordinal)} tincture</label>
              <TinctureSelect
                tinctureConfiguration={tinctureConfiguration}
                tincture={tincture}
                tinctureChange={(t) => updateTincture(t, i)}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
