import { fireEvent } from '@testing-library/dom';
import { Tincture } from '../../app/model/tincture';

export function selectTincture(topSelector: string, tincture: Tincture): Promise<void> {
  fireEvent.focus(selectElement(`${topSelector} .tincture-select__input input`));
  fireEvent.mouseDown(selectElement(`${topSelector} .tincture-select__control`));

  const tinctures = Array.from(document.querySelectorAll('.tincture-select__option'));
  const selectedTincture = tinctures.find((e) =>
    (e.querySelector('.tincture-option') as HTMLSpanElement).innerHTML.includes(tincture.name)
  );
  if (!selectedTincture) {
    return Promise.reject(`There should be an option named ${tincture.name}`);
  }

  fireEvent.click(selectedTincture);

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
