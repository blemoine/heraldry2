import { Tincture } from '../../../model/tincture';
import { TinctureSelect } from '../TinctureSelect';
import * as React from 'react';
import { TinctureConfiguration } from '../../../model/tincture-configuration';

type Props = {
  tinctures: [Tincture, Tincture, Tincture];
  tincturesChanges: (t: [Tincture, Tincture, Tincture]) => void;
  tinctureConfiguration: TinctureConfiguration;
};
export const ThreeTinctureConfiguration = ({ tinctures, tincturesChanges, tinctureConfiguration }: Props) => {
  function firstTinctureChange(tincture: Tincture) {
    tincturesChanges([tincture, tinctures[1], tinctures[2]]);
  }

  function secondTinctureChange(tincture: Tincture) {
    tincturesChanges([tinctures[0], tincture, tinctures[2]]);
  }
  function thirdTinctureChange(tincture: Tincture) {
    tincturesChanges([tinctures[0], tinctures[1], tincture]);
  }

  return (
    <>
      <div className="col">
        <div className="form-group field-first-tincture-select">
          <label>First tincture</label>
          <TinctureSelect
            tinctureConfiguration={tinctureConfiguration}
            tincture={tinctures[0]}
            tinctureChange={firstTinctureChange}
          />
        </div>
      </div>
      <div className="col">
        <div className="form-group field-second-tincture-select">
          <label>Second tincture</label>
          <TinctureSelect
            tinctureConfiguration={tinctureConfiguration}
            tincture={tinctures[1]}
            tinctureChange={secondTinctureChange}
          />
        </div>
      </div>
      <div className="col">
        <div className="form-group field-third-tincture-select">
          <label>Third tincture</label>
          <TinctureSelect
            tinctureConfiguration={tinctureConfiguration}
            tincture={tinctures[2]}
            tinctureChange={thirdTinctureChange}
          />
        </div>
      </div>
    </>
  );
};
