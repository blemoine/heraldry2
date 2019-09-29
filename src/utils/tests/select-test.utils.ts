import { fireEvent } from '@testing-library/dom';
import { Tincture } from '../../app/model/tincture';
import { act } from 'react-dom/test-utils';

export function selectElement(selector: string): Element {
  const el = document.querySelector(selector);
  if (!el) {
    throw new Error(`'${selector} select should be defined`);
  } else {
    return el;
  }
}

export function selectTincture(topSelector: string, tincture: Tincture): Promise<void> {
  act(() => {
    fireEvent.click(selectElement(topSelector + ' .tincture-select-popover-opener'));
  });
  act(() => {
    fireEvent.click(selectElement(`.popover div[title=${tincture.name}]`));
  });

  // Needs to be longer than the transition duration of the popover fade in/out
  const timeoutDuration = 200;
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeoutDuration);
  });
}

export function selectInDefaultSelect(topSelector: string, value: string): Promise<void> {
  const select = selectElement(`${topSelector} select`);
  fireEvent.change(select, { target: { value } });

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1);
  });
}
