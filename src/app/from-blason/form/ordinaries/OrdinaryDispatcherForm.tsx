import * as React from 'react';
import { Ordinary } from '../../../model/ordinary';
import { PaleForm } from './PaleForm';
import { StandardOrdinaryForm } from './StandardOrdinaryForm';
import { ChevronForm } from './ChevronForm';
import { TinctureConfiguration } from '../../../model/tincture-configuration';
import { ChapePloyeForm } from './ChapePloyeForm';

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  ordinary: Ordinary;
  ordinaryChange: (ordinary: Ordinary) => void;
};
export const OrdinaryDispatcherForm = ({ tinctureConfiguration, ordinary, ordinaryChange }: Props) => {
  if (ordinary.name === 'pale') {
    return (
      <PaleForm tinctureConfiguration={tinctureConfiguration} ordinary={ordinary} ordinaryChange={ordinaryChange} />
    );
  } else if (ordinary.name === 'chape-ploye') {
    return (
      <ChapePloyeForm
        tinctureConfiguration={tinctureConfiguration}
        ordinary={ordinary}
        ordinaryChange={ordinaryChange}
      />
    );
  } else if (ordinary.name === 'chevron' || ordinary.name === 'chevronel') {
    return (
      <ChevronForm tinctureConfiguration={tinctureConfiguration} ordinary={ordinary} ordinaryChange={ordinaryChange} />
    );
  } else {
    return (
      <StandardOrdinaryForm
        tinctureConfiguration={tinctureConfiguration}
        ordinary={ordinary}
        ordinaryChange={ordinaryChange}
      />
    );
  }
};
