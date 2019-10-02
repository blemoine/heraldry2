import * as React from 'react';
import {
  defaultTinctureConfiguration,
  defaultTinctureConfiguration2,
  TinctureConfiguration,
  wappenWikiConfiguration,
} from '../../model/tincture-configuration';
import { isEqual } from 'lodash';

const availableTinctureConfiguration: Array<{ name: string; tinctureConfiguration: TinctureConfiguration }> = [
  { name: 'default', tinctureConfiguration: defaultTinctureConfiguration },
  { name: 'default_2', tinctureConfiguration: defaultTinctureConfiguration2 },
  { name: 'wappenWiki', tinctureConfiguration: wappenWikiConfiguration },
];
const colorBoxWidth = 20;

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  tinctureConfigurationChange: (tinctureConfiguration: TinctureConfiguration) => void;
};
export const TinctureConfigurationForm = function TinctureConfigurationForm(props: Props) {
  const selectedTinctureConfiguration = props.tinctureConfiguration;
  const tinctureConfigurationChange = props.tinctureConfigurationChange;

  return (
    <div style={{ marginTop: '10px' }}>
      <ul className="list-inline">
        {availableTinctureConfiguration.map(({ name, tinctureConfiguration }) => {
          return (
            <li
              key={name}
              className="list-inline-item"
              style={{ padding: '5px 10px', cursor: 'pointer' }}
              onClick={() => tinctureConfigurationChange(tinctureConfiguration)}
            >
              <div
                style={{
                  border: '1px solid #CCC',
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: 5 * colorBoxWidth + 2 + 'px',
                }}
              >
                {Object.entries(tinctureConfiguration).map(([name, color], i) => {
                  return (
                    <div
                      key={i}
                      style={{ backgroundColor: color, width: colorBoxWidth + 'px', height: colorBoxWidth + 'px' }}
                      title={name}
                    />
                  );
                })}
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="radio"
                    readOnly={true}
                    name="tincture-configuration"
                    style={{ marginRight: '5px' }}
                    checked={isEqual(tinctureConfiguration, selectedTinctureConfiguration)}
                  />
                  {name}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
