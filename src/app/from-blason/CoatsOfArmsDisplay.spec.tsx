import renderer from 'react-test-renderer';
import React from 'react';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';
import { Blason } from '../model/blason';
import { azure, ermine, gules, or, purpure, vair } from '../model/tincture';
jest.mock('../../utils/uuid');

describe('CoatsOfArms', () => {
  it('should render a plain blason', () => {
    const blason: Blason = { field: { kind: 'plain', tincture: gules } };
    const component = renderer.create(<CoatsOfArmsDisplay blason={blason} height={266.6666666666667} width={200} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render a fur blason', () => {
    const blason: Blason = { field: { kind: 'plain', tincture: ermine } };
    const component = renderer.create(<CoatsOfArmsDisplay blason={blason} height={266.6666666666667} width={200} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render a party blason', () => {
    const blason: Blason = { field: { kind: 'party', per: { name: 'bend', tinctures: [vair, azure] } } };
    const component = renderer.create(<CoatsOfArmsDisplay blason={blason} height={266.6666666666667} width={200} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render a party blason with some ordinary', () => {
    const blason: Blason = {
      field: { kind: 'party', per: { name: 'bend', tinctures: [vair, azure] } },
      ordinary: { name: 'chief', tincture: purpure },
    };
    const component = renderer.create(<CoatsOfArmsDisplay blason={blason} height={266.6666666666667} width={200} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render a the england royal arms', () => {
    const blason: Blason = {
      field: { kind: 'plain', tincture: gules },
      charge: {
        name: 'lion',
        tincture: or,
        armedAndLangued: azure,
        attitude: 'passant',
        tail: null,
        head: 'guardant',
        countAndDisposition: { count: 3, disposition: 'pale' },
      },
    };
    const component = renderer.create(<CoatsOfArmsDisplay blason={blason} height={266.6666666666667} width={200} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
