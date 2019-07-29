import * as React from 'react';
import { FromBlason } from './FromBlason';
import { fireEvent, render } from '@testing-library/react';
//import { Simulate } from 'react-dom/test-utils';

describe('From Blason', () => {
  it('should reflect the change of the form in the blason', () => {
    const fromBlason = render(<FromBlason />);

    fireEvent.focus(selectElement('.field-tincture-select .tincture-select__input input'));
    fireEvent.mouseDown(selectElement('.field-tincture-select .tincture-select__control'));
    const tinctures = Array.from(document.querySelectorAll('.tincture-select__option'));
    const ermineOption = tinctures.find((e) =>
      (e.querySelector('.tincture-option') as HTMLSpanElement).innerHTML.includes('ermine')
    );
    if (!ermineOption) {
      fail('There should be an option named ermine');
      return;
    }
    fireEvent.click(ermineOption);

    const blason = (fromBlason.getByPlaceholderText('Enter the blason here') as HTMLTextAreaElement).value;
    expect(blason).toBe('Ermine');
  });
});

function selectElement(selector: string): Element {
  const tinctureSelect = document.querySelector(selector);
  if (!tinctureSelect) {
    throw new Error('Tincture select should be defined');
  } else {
    return tinctureSelect;
  }
}
