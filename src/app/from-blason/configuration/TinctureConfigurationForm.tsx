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

const availableTinctureConfiguration: Array<(seed: string) => TinctureConfiguration> = [
  () => defaultTinctureConfiguration,
  () => defaultTinctureConfiguration2,
  () => wappenWikiConfiguration,
  (seed: string) =>
    Object.entries(colorConfigurationRange).reduce<Partial<TinctureConfiguration>>(
      (acc, [color, hslRange]) => {
        acc[color as TinctureName] = stringifyColor(toRgb(generateInRange(seed, hslRange)));
        return acc;
      },
      { name: 'custom' }
    ) as TinctureConfiguration,
];
const colorBoxWidth = 25;

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  tinctureConfigurationChange: (tinctureConfiguration: TinctureConfiguration) => void;
};
export const TinctureConfigurationForm = function TinctureConfigurationForm(props: Props) {
  const [seed, setSeed] = useLocalStorage('seed-for-random-configuration', new Date(0).toISOString());

  const selectedTinctureConfiguration = props.tinctureConfiguration;
  const tinctureConfigurationChange = props.tinctureConfigurationChange;

  function generateNewRandom(e: React.MouseEvent) {
    e.stopPropagation();
    const newSeed = new Date().toISOString();
    setSeed(newSeed);

    const randomConf = availableTinctureConfiguration
      .map((tinctureConfigurationFn) => tinctureConfigurationFn(newSeed))
      .find((conf) => conf.name === 'custom');
    if (!randomConf) {
      throw new Error('A conf named random MUST exists in the list of availableTincture');
    }
    tinctureConfigurationChange(randomConf);
  }
  return (
    <div style={{ marginTop: '10px' }}>
      <ul className="list-inline">
        {availableTinctureConfiguration.map((tinctureConfigurationFn) => {
          const tinctureConf = tinctureConfigurationFn(seed);
          const name = tinctureConf.name;
          return (
            <li
              key={name}
              className={`list-inline-item tincture-wrapper-${name}`}
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
                    checked={tinctureConf.name === selectedTinctureConfiguration.name}
                  />
                  {name}
                </label>
                {name === 'custom' && (
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
