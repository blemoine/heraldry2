import renderer from 'react-test-renderer';
import React from 'react';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';
import { Blason } from '../model/blason';
import { azure, ermine, gules, purpure, vair } from '../model/tincture';
jest.mock('../../utils/uuid');

describe('CoatsOfArms', () => {
  it('should render a plain blason', () => {
    const blason: Blason = { field: { kind: 'plain', tincture: gules } };
    const component = renderer.create(<CoatsOfArmsDisplay blason={blason} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render a fur blason', () => {
    const blason: Blason = { field: { kind: 'plain', tincture: ermine } };
    const component = renderer.create(<CoatsOfArmsDisplay blason={blason} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render a party blason', () => {
    const blason: Blason = { field: { kind: 'party', per: { name: 'bend', tinctures: [vair, azure] } } };
    const component = renderer.create(<CoatsOfArmsDisplay blason={blason} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render a party blason with some ordinary', () => {
    const blason: Blason = {
      field: { kind: 'party', per: { name: 'bend', tinctures: [vair, azure] } },
      ordinary: { name: 'chief', tincture: purpure },
    };
    const component = renderer.create(<CoatsOfArmsDisplay blason={blason} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
