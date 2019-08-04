import * as React from 'react';
import { FromBlason } from './FromBlason';
import { render } from '@testing-library/react';
import { selectInReactSelect, selectTincture } from '../../utils/tests/select-test.utils';
import { ermine, gules, vair } from '../model/tincture';

describe('From Blason', () => {
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
});
