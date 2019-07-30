import * as React from 'react';
import { Ordinary } from '../../../model/ordinary';
import { PaleForm } from './PaleForm';
import { StandardOrdinaryForm } from './StandardOrdinaryForm';

type Props = { ordinary: Ordinary; ordinaryChange: (ordinary: Ordinary) => void };
export const OrdinaryDispatcherForm = ({ ordinary, ordinaryChange }: Props) => {
  if (ordinary.name === 'pale') {
    return <PaleForm ordinary={ordinary} ordinaryChange={ordinaryChange} />;
  } else {
    return <StandardOrdinaryForm ordinary={ordinary} ordinaryChange={ordinaryChange} />;
  }
};
