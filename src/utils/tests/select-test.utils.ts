import { fireEvent } from '@testing-library/dom';
import { Tincture } from '../../app/model/tincture';

export function selectTincture(topSelector: string, tincture: Tincture): Promise<void> {
  return selectInReactSelect(topSelector, 'tincture-select', tincture.name);
}

export function selectInReactSelect(topSelector: string, classNamePrefix: string, value: string): Promise<void> {
  fireEvent.focus(selectElement(`${topSelector} .${classNamePrefix}__input input`));
  fireEvent.mouseDown(selectElement(`${topSelector} .${classNamePrefix}__control`));

  const tinctures = Array.from(document.querySelectorAll(`.${classNamePrefix}__option`));
  const selectedOption = tinctures.find((e) => e.innerHTML.includes(value));
  if (!selectedOption) {
    const msg = `There should be an option named ${value}`;
    fail(msg);
    return Promise.reject(msg);
  }

  fireEvent.click(selectedOption);

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1);
  });
}

function selectElement(selector: string): Element {
  const el = document.querySelector(selector);
  if (!el) {
    throw new Error(`'${selector} select should be defined`);
  } else {
    return el;
  }
}
