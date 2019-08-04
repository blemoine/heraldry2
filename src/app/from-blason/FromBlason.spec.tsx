import * as React from 'react';
import { FromBlason } from './FromBlason';
import { render } from '@testing-library/react';
import { selectInReactSelect, selectTincture } from '../../utils/tests/select-test.utils';
import { argent, azure, ermine, gules, murrey, purpure, vair } from '../model/tincture';

describe('From Blason', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('should reflect the change of field tincture in the blason', () => {
    const fromBlason = render(<FromBlason />);

    return selectTincture('.field-tincture-select', ermine).then(() => {
      const blason = (fromBlason.getByPlaceholderText('Enter the blason here') as HTMLTextAreaElement).value;
      expect(blason).toBe('Ermine');
    });
  });

  it('should reflect the change of the field type in the blason', () => {
    const fromBlason = render(<FromBlason />);

    return selectInReactSelect('.field-type-select', 'field-type', 'chequy')
      .then(() => selectTincture('.field-first-tincture-select', vair))
      .then(() => selectTincture('.field-second-tincture-select', gules))
      .then(() => {
        const blason = (fromBlason.getByPlaceholderText('Enter the blason here') as HTMLTextAreaElement).value;
        expect(blason).toBe('Chequy vair and gules');
      });
  });

  it('should reflect the change of the charge type in the blason', () => {
    const fromBlason = render(<FromBlason />);

    return selectInReactSelect('.field-type-select', 'field-type', 'paly')
      .then(() => selectTincture('.field-first-tincture-select', argent))
      .then(() => selectTincture('.field-second-tincture-select', purpure))
      .then(() => selectInReactSelect('.charge-type-select', 'charge-name', 'lion'))
      .then(() => selectTincture('.charge-lion-tincture-select', azure))
      .then(() => {
        const blason = (fromBlason.getByPlaceholderText('Enter the blason here') as HTMLTextAreaElement).value;
        expect(blason).toBe('Paly argent and purpure, a lion rampant azure');
      });
  });

  it('should reflect the change of the ordinary type in the blason', () => {
    const fromBlason = render(<FromBlason />);

    return selectInReactSelect('.field-type-select', 'field-type', 'barry')
      .then(() => selectTincture('.field-first-tincture-select', argent))
      .then(() => selectTincture('.field-second-tincture-select', purpure))
      .then(() => selectInReactSelect('.ordinary-type-select', 'ordinary-name', 'bend'))
      .then(() => selectTincture('.ordinary-tincture-select', murrey))
      .then(() => {
        const blason = (fromBlason.getByPlaceholderText('Enter the blason here') as HTMLTextAreaElement).value;
        expect(blason).toBe('Barry of ten argent and purpure, a bend murrey');
      });
  });
});
