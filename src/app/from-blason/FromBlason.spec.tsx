import * as React from 'react';
import { FromBlason } from './FromBlason';
import { render } from '@testing-library/react';
import { selectTincture } from '../../utils/tests/select-test.utils';
import { ermine } from '../model/tincture';

describe('From Blason', () => {
  it('should reflect the change of the form in the blason', () => {
    const fromBlason = render(<FromBlason />);

    return selectTincture('.field-tincture-select', ermine).then(() => {
      const blason = (fromBlason.getByPlaceholderText('Enter the blason here') as HTMLTextAreaElement).value;
      expect(blason).toBe('Ermine');
    });
  });
});
