import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { selectElement, selectInDefaultSelect, selectTincture } from '../utils/tests/select-test.utils';
import { argent, azure, ermine, gules, murrey, purpure, vair } from './model/tincture';
import { App } from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('should reflect the change of field tincture in the blason', () => {
    const app = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    return selectTincture('.field-tincture-select', ermine).then(() => {
      const blason = (app.getByPlaceholderText('Enter the blason here') as HTMLTextAreaElement).value;
      expect(blason).toBe('Ermine');
    });
  });

  it('should reflect the change of the field type in the blason', () => {
    const app = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    return selectInDefaultSelect('.field-type-select', 'chequy')
      .then(() => selectTincture('.field-first-tincture-select', vair))
      .then(() => selectTincture('.field-second-tincture-select', gules))
      .then(() => {
        const blason = (app.getByPlaceholderText('Enter the blason here') as HTMLTextAreaElement).value;
        expect(blason).toBe('Chequy vair and gules');
      });
  });

  it('should reflect the change of the charge type in the blason', () => {
    const app = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    return selectInDefaultSelect('.field-type-select', 'paly')
      .then(() => selectTincture('.field-first-tincture-select', argent))
      .then(() => selectTincture('.field-second-tincture-select', purpure))
      .then(() => selectInDefaultSelect('.charge-type-select', 'lion'))
      .then(() => selectTincture('.charge-lion-tincture-select', azure))
      .then(() => {
        const blason = (app.getByPlaceholderText('Enter the blason here') as HTMLTextAreaElement).value;
        expect(blason).toBe('Paly argent and purpure, a lion rampant azure');
      });
  });

  it('should reflect the change of the ordinary type in the blason', () => {
    const app = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    return selectInDefaultSelect('.field-type-select', 'barry')
      .then(() => selectTincture('.field-first-tincture-select', argent))
      .then(() => selectTincture('.field-second-tincture-select', purpure))
      .then(() => selectInDefaultSelect('.ordinary-type-select', 'bend'))
      .then(() => selectTincture('.ordinary-tincture-select', murrey))
      .then(() => {
        const blason = (app.getByPlaceholderText('Enter the blason here') as HTMLTextAreaElement).value;
        expect(blason).toBe('Barry of ten argent and purpure, a bend murrey');
      });
  });

  it('should reflect the change of the blason string in the form', () => {
    const app = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const blason = app.getByPlaceholderText('Enter the blason here') as HTMLTextAreaElement;
    fireEvent.change(blason, {
      target: { value: 'Ermine, three eagles displayed in pale azure beaked and armed argent' },
    });

    const field = selectElement('.field-tincture-select .tincture-select-label') as HTMLDivElement;
    const fieldValue = field.innerHTML;
    expect(fieldValue).toBe('ermine');

    const charge = selectElement('.charge-type-select select') as HTMLSelectElement;
    expect(charge.value).toBe('eagle');
  });
});
