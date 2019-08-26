import * as React from 'react';
import {
  defaultTinctureConfiguration,
  defaultTinctureConfiguration2,
  TinctureConfiguration,
  wappenWikiConfiguration,
} from '../../model/tincture-configuration';
import { useState } from 'react';
import { Configuration } from '../../model/configuration';

type Props = {
  configuration: Configuration;
  configurationChange: (configuration: Configuration) => void;
};

const availableTinctureConfiguration: Array<{ name: string; tinctureConfiguration: TinctureConfiguration }> = [
  { name: 'default', tinctureConfiguration: defaultTinctureConfiguration },
  { name: 'default_2', tinctureConfiguration: defaultTinctureConfiguration2 },
  { name: 'wappenWiki', tinctureConfiguration: wappenWikiConfiguration },
];
const colorBoxWidth = 20;

export const ConfigurationForm = ({ configuration, configurationChange }: Props) => {
  const [isCollapsed, setCollapsed] = useState(true);

  return (
    <div style={{ border: '1px solid #999', padding: '10px 5px' }}>
      <div style={{ cursor: 'pointer' }} onClick={() => setCollapsed(!isCollapsed)}>
        <span style={{ padding: '3px 10px' }}>{isCollapsed ? '+' : '-'}</span>
        <span style={{ margin: '0 10px', borderBottom: '1px solid #333', padding: '3px 0', fontWeight: 'bold' }}>
          Configuration
        </span>
      </div>
      <div style={{ transition: 'all 0.5s', overflow: 'hidden', height: isCollapsed ? 0 : '100px' }}>
        <div style={{ marginTop: '10px' }}>
          <ul className="list-inline">
            {availableTinctureConfiguration.map(({ name, tinctureConfiguration }) => {
              return (
                <li
                  key={name}
                  className="list-inline-item"
                  style={{ padding: '5px 10px', cursor: 'pointer' }}
                  onClick={() => configurationChange({ ...configuration, tinctureConfiguration })}
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
                        checked={tinctureConfiguration === tinctureConfiguration}
                      />
                      {name}
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
