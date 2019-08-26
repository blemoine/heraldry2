import * as React from 'react';
import { useState } from 'react';
import { Configuration } from '../../model/configuration';
import { TinctureConfigurationForm } from './TinctureConfigurationForm';
import { TinctureConfiguration } from '../../model/tincture-configuration';

type Props = {
  configuration: Configuration;
  configurationChange: (configuration: Configuration) => void;
};

export const ConfigurationForm = ({ configuration, configurationChange }: Props) => {
  const [isCollapsed, setCollapsed] = useState(true);

  function updateTinctureConfiguration(tinctureConfiguration: TinctureConfiguration) {
    configurationChange({ ...configuration, tinctureConfiguration });
  }

  return (
    <div style={{ border: '1px solid #999', padding: '10px 5px' }}>
      <div style={{ cursor: 'pointer' }} onClick={() => setCollapsed(!isCollapsed)}>
        <span style={{ padding: '3px 10px' }}>{isCollapsed ? '+' : '-'}</span>
        <span style={{ margin: '0 10px', borderBottom: '1px solid #333', padding: '3px 0', fontWeight: 'bold' }}>
          Configuration
        </span>
      </div>
      <div style={{ transition: 'all 0.5s', overflow: 'hidden', height: isCollapsed ? 0 : '100px' }}>
        <TinctureConfigurationForm
          tinctureConfiguration={configuration.tinctureConfiguration}
          tinctureConfigurationChange={updateTinctureConfiguration}
        />
      </div>
    </div>
  );
};
