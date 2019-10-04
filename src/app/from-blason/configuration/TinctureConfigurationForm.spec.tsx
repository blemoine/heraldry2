import * as React from 'react';
import { TinctureConfigurationForm } from './TinctureConfigurationForm';
import { defaultTinctureConfiguration, wappenWikiConfiguration } from '../../model/tincture-configuration';
import { cleanup, fireEvent, render } from '@testing-library/react';

function clickOnConfElement(name: string) {
  const randomSelector = document.querySelector('.tincture-wrapper-' + name);
  if (!randomSelector) {
    throw new Error(name + ' should exists');
  }
  fireEvent.click(randomSelector);
}

function expectInputToBeChecked(name: string) {
  const randomInput = document.querySelector<HTMLInputElement>('.tincture-wrapper-' + name + ' input');
  if (!randomInput) {
    throw new Error(name + ' should exists');
  }
  expect(randomInput.checked).toBe(true);
}
describe('TinctureConfigurationForm', () => {
  it('should keep select a color if the user click on it', () => {
    const tinctureConfigurationChange = jest.fn();
    render(
      <TinctureConfigurationForm
        tinctureConfiguration={defaultTinctureConfiguration}
        tinctureConfigurationChange={tinctureConfigurationChange}
      />
    );

    expectInputToBeChecked(defaultTinctureConfiguration.name);

    clickOnConfElement(wappenWikiConfiguration.name);

    expect(tinctureConfigurationChange.mock.calls.length).toBe(1);
    expect(tinctureConfigurationChange.mock.calls[0][0]).toBe(wappenWikiConfiguration);
  });
  it('should keep the same color if the user click on random', () => {
    const tinctureConfigurationChange = jest.fn();
    render(
      <TinctureConfigurationForm
        tinctureConfiguration={defaultTinctureConfiguration}
        tinctureConfigurationChange={tinctureConfigurationChange}
      />
    );

    clickOnConfElement('random');

    expect(tinctureConfigurationChange.mock.calls.length).toBe(1);
    const randomConfiguration = tinctureConfigurationChange.mock.calls[0][0];
    cleanup();
    render(
      <TinctureConfigurationForm
        tinctureConfiguration={randomConfiguration}
        tinctureConfigurationChange={tinctureConfigurationChange}
      />
    );

    expectInputToBeChecked('random');
    clickOnConfElement('random');

    expect(tinctureConfigurationChange.mock.calls.length).toBe(2);
    expect(tinctureConfigurationChange.mock.calls[1][0]).toEqual(randomConfiguration);
  });
  it('should load new color AND apply then if the user click on reload', () => {
    const tinctureConfigurationChange = jest.fn();
    render(
      <TinctureConfigurationForm
        tinctureConfiguration={defaultTinctureConfiguration}
        tinctureConfigurationChange={tinctureConfigurationChange}
      />
    );

    clickOnConfElement('random');

    expect(tinctureConfigurationChange.mock.calls.length).toBe(1);
    const randomConfiguration = tinctureConfigurationChange.mock.calls[0][0];
    cleanup();
    render(
      <TinctureConfigurationForm
        tinctureConfiguration={randomConfiguration}
        tinctureConfigurationChange={tinctureConfigurationChange}
      />
    );

    expectInputToBeChecked('random');

    const reloadElement = document.querySelector('.reload-random');
    if (!reloadElement) {
      throw new Error('there must be a reload button');
    }
    fireEvent.click(reloadElement);

    expect(tinctureConfigurationChange.mock.calls.length).toBe(2);
    expect(tinctureConfigurationChange.mock.calls[1][0]).not.toEqual(randomConfiguration);

    cleanup();
    render(
      <TinctureConfigurationForm
        tinctureConfiguration={randomConfiguration}
        tinctureConfigurationChange={tinctureConfigurationChange}
      />
    );

    expectInputToBeChecked('random');
  });
});
