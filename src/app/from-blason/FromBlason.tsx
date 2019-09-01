import * as React from 'react';
import { Blason } from '../model/blason';
import { CoatsOfArmsDetail } from './CoatsOfArmsDetail';
import { ConfigurationForm } from './configuration/ConfigurationForm';
import { Configuration } from '../model/configuration';
import { BlasonForm } from './form/BlasonForm';
import { PageState } from '../model/pageState';

type Props = {
  pageState: PageState;
  blason: Blason;
  configuration: Configuration;
  blasonChange: (blason: Blason) => void;
  configurationChange: (conf: Configuration) => void;
};
const headerHeight = '65px';
const minHeight = `calc(100vh - ${headerHeight})`;
export function FromBlason({ pageState, blason, configuration, blasonChange, configurationChange }: Props) {
  return (
    <div style={{ backgroundColor: '#f5f5e0', minHeight: minHeight }}>
      <ConfigurationForm
        isOpen={pageState.configurationOpened}
        configuration={configuration}
        configurationChange={configurationChange}
      />
      <div className="row mt-3 ml-2 mr-2">
        <div className="col-md-12 col-lg-6">
          <CoatsOfArmsDetail configuration={configuration} blason={blason} blasonChange={blasonChange} />
        </div>
        <div className="col-md-12 col-lg-6">
          <BlasonForm
            tinctureConfiguration={configuration.tinctureConfiguration}
            blason={blason}
            blasonChange={blasonChange}
          />
        </div>
      </div>
    </div>
  );
}
