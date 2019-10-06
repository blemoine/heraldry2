import * as React from 'react';
import {
  colorConfigurationRange,
  defaultTinctureConfiguration,
  defaultTinctureConfiguration2,
  TinctureConfiguration,
  wappenWikiConfiguration,
} from '../../model/tincture-configuration';
import { generateInRange, stringifyColor, toRgb } from '../../../utils/color/color';
import { useLocalStorage } from '../../../utils/useLocalStorage';
import { TinctureName } from '../../model/tincture';

const getCustomConfiguration = (seed: string) =>
  Object.entries(colorConfigurationRange).reduce<Partial<TinctureConfiguration>>(
    (acc, [color, hslRange]) => {
      acc[color as TinctureName] = stringifyColor(toRgb(generateInRange(seed, hslRange)));
      return acc;
    },
    { name: 'custom' }
  ) as TinctureConfiguration;

const colorBoxWidth = 25;

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  tinctureConfigurationChange: (tinctureConfiguration: TinctureConfiguration) => void;
};
export const TinctureConfigurationForm = function TinctureConfigurationForm(props: Props) {
  const [customConf, setCustomConf] = useLocalStorage(
    'custom-configuration',
    getCustomConfiguration(new Date(0).toISOString())
  );
  const availableTinctureConfiguration: Array<TinctureConfiguration> = [
    defaultTinctureConfiguration,
    defaultTinctureConfiguration2,
    wappenWikiConfiguration,
    customConf,
  ];
  const selectedTinctureConfiguration = props.tinctureConfiguration;
  const tinctureConfigurationChange = props.tinctureConfigurationChange;

  function generateNewRandom(e: React.MouseEvent) {
    e.stopPropagation();
    const newSeed = new Date().toISOString();
    const newConf = getCustomConfiguration(newSeed);
    setCustomConf(newConf);
    tinctureConfigurationChange(newConf);
  }
  function colorChange(key: string, newColor: string) {
    const newConf = {
      ...customConf,
      [key]: newColor,
    };
    setCustomConf(newConf);
    tinctureConfigurationChange(newConf);
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <ul className="list-inline">
        {availableTinctureConfiguration.map((tinctureConf) => {
          const confName = tinctureConf.name;
          return (
            <li
              key={confName}
              className={`list-inline-item tincture-wrapper-${confName}`}
              style={{ padding: '5px 10px', cursor: 'pointer' }}
              onClick={() => tinctureConfigurationChange(tinctureConf)}
            >
              <div
                style={{
                  border: '1px solid #CCC',
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: 5 * colorBoxWidth + 2 + 'px',
                }}
              >
                {Object.entries<string>(tinctureConf)
                  .filter(([name]) => name !== 'name')
                  .map(([name, color], i) => {
                    return (
                      <label
                        key={i}
                        style={{
                          backgroundColor: color,
                          width: colorBoxWidth + 'px',
                          height: colorBoxWidth + 'px',
                          cursor: 'pointer',
                          margin: 0,
                        }}
                        title={name}
                      >
                        {confName === 'custom' && (
                          <input
                            type="color"
                            style={{ display: 'none' }}
                            value={color}
                            onChange={(e) => colorChange(name, e.target.value)}
                          />
                        )}
                      </label>
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
                    checked={tinctureConf.name === selectedTinctureConfiguration.name}
                  />
                  {confName}
                </label>
                {confName === 'custom' && (
                  <button
                    style={{ marginLeft: '10px' }}
                    className="btn btn-outline-dark btn-sm reload-random"
                    onClick={(e) => generateNewRandom(e)}
                    title="New random"
                  >
                    <i className="fas fa-redo" />
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
