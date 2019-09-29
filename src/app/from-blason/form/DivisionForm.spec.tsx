import { render } from '@testing-library/react';
import * as React from 'react';
import { DivisionForm } from './DivisionForm';
import { QuarterlyBlason, SimpleBlason } from '../../model/blason';
import { ermine } from '../../model/tincture';
import { selectInDefaultSelect } from '../../../utils/tests/select-test.utils';

describe('DivisionForm', () => {
  const blason: SimpleBlason = {
    kind: 'simple',
    field: { kind: 'plain', tincture: ermine },
  };
  const quaterlyBlason: QuarterlyBlason = {
    kind: 'quarterly',
    blasons: [blason, blason, blason, blason],
  };
  it('should keep the first quarter if changes from quarter to simple', () => {
    const blasonChange = jest.fn();
    render(<DivisionForm blason={blason} blasonChange={blasonChange} />);

    return selectInDefaultSelect('.field-division-select', 'quarterly').then(() => {
      expect(blasonChange.mock.calls.length).toBe(1);
      expect(blasonChange.mock.calls[0][0]).toEqual(quaterlyBlason);
    });
  });
  it('should keep the copy four times the blason if changes from simple to quarter', () => {
    const blasonChange = jest.fn();
    render(<DivisionForm blason={quaterlyBlason} blasonChange={blasonChange} />);

    return selectInDefaultSelect('.field-division-select', 'simple').then(() => {
      expect(blasonChange.mock.calls.length).toBe(1);
      expect(blasonChange.mock.calls[0][0]).toEqual(blason);
    });
  });
});
