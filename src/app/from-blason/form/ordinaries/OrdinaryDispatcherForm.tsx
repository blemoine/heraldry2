import * as React from 'react';
import { Ordinary } from '../../../model/ordinary';
import { PaleForm } from './PaleForm';
import { StandardOrdinaryForm } from './StandardOrdinaryForm';
import { ChevronForm } from './ChevronForm';

type Props = { ordinary: Ordinary; ordinaryChange: (ordinary: Ordinary) => void };
export const OrdinaryDispatcherForm = ({ ordinary, ordinaryChange }: Props) => {
  if (ordinary.name === 'pale') {
    return <PaleForm ordinary={ordinary} ordinaryChange={ordinaryChange} />;
  } else if (ordinary.name === 'chevron' || ordinary.name === 'chevronel') {
    return <ChevronForm ordinary={ordinary} ordinaryChange={ordinaryChange} />;
  } else {
    return <StandardOrdinaryForm ordinary={ordinary} ordinaryChange={ordinaryChange} />;
  }
};
