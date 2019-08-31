import * as React from 'react';
import { Configuration, ShieldShape, shieldShapes } from '../../model/configuration';
import { TinctureConfigurationForm } from './TinctureConfigurationForm';
import { TinctureConfiguration } from '../../model/tincture-configuration';
import { SelectScalar } from '../../common/SelectScalar';

type Props = {
  isOpen: boolean;
  configuration: Configuration;
  configurationChange: (configuration: Configuration) => void;
};

export const ConfigurationForm = ({ isOpen, configuration, configurationChange }: Props) => {
  function updateTinctureConfiguration(tinctureConfiguration: TinctureConfiguration) {
    configurationChange({ ...configuration, tinctureConfiguration });
  }

  function updateShieldShape(shieldShape: ShieldShape) {
    configurationChange({ ...configuration, shieldShape });
  }

  return (
    <div
      style={{
        border: '1px solid #999',
        transition: 'all 0.5s',
        overflow: !isOpen ? 'hidden' : 'visible',
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
          <SelectScalar options={shieldShapes} value={configuration.shieldShape} valueChange={updateShieldShape} />
        </div>
      </div>
    </div>
  );
};
