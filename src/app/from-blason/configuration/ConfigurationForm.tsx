import * as React from 'react';
import { Configuration, ShieldShape, shieldShapes } from '../../model/configuration';
import { TinctureConfigurationForm } from './TinctureConfigurationForm';
import { TinctureConfiguration } from '../../model/tincture-configuration';
import { SelectScalar } from '../../common/SelectScalar';
import { useState } from 'react';

type Props = {
  isOpen: boolean;
  configuration: Configuration;
  configurationChange: (configuration: Configuration) => void;
};

export function ConfigurationForm({ isOpen, configuration, configurationChange }: Props) {
  function updateTinctureConfiguration(tinctureConfiguration: TinctureConfiguration) {
    configurationChange({ ...configuration, tinctureConfiguration });
  }

  function updateShieldShape(shieldShape: ShieldShape) {
    configurationChange({ ...configuration, shieldShape });
  }

  const [overflow, setOverflow] = useState<'hidden' | 'visible'>('hidden');

  return (
    <div
      style={{
        border: '1px solid #999',
        transition: 'all 0.3s',
        overflow: overflow,
        height: 'auto',
        maxHeight: !isOpen ? 0 : '400px',
      }}
    >
      <div style={{ padding: '10px 5px' }}>
        <div style={{ cursor: 'pointer' }}>
          <span style={{ margin: '0 10px', borderBottom: '1px solid #333', padding: '3px 0', fontWeight: 'bold' }}>
            Configuration
          </span>
        </div>
        <TinctureConfigurationForm
          tinctureConfiguration={configuration.tinctureConfiguration}
          tinctureConfigurationChange={updateTinctureConfiguration}
        />
        <div>
          <SelectScalar
            options={shieldShapes}
            value={configuration.shieldShape}
            valueChange={updateShieldShape}
            onMenuOpen={() => setOverflow('visible')}
            onMenuClose={() => setOverflow('hidden')}
          />
        </div>
      </div>
    </div>
  );
}
