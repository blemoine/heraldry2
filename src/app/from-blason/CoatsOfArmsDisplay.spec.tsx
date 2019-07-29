import renderer from 'react-test-renderer';
import React from 'react';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';
import { Blason } from '../model/blason';
import { azure, ermine, gules, or, purpure, vair } from '../model/tincture';
import { parseBlason } from '../blason-parser/blasonParser';
jest.mock('../../utils/uuid');

const dimension = {
  height: 266.6666666666667,
  width: 200,
};

describe('CoatsOfArms', () => {
  it('should render a plain blason', () => {
    const blason: Blason = { field: { kind: 'plain', tincture: gules } };
    const component = renderer.create(<CoatsOfArmsDisplay blason={blason} dimension={dimension} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render a fur blason', () => {
    const blason: Blason = { field: { kind: 'plain', tincture: ermine } };
    const component = renderer.create(<CoatsOfArmsDisplay blason={blason} dimension={dimension} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render a party blason', () => {
    const blason: Blason = {
      field: { kind: 'party', per: { name: 'bend', tinctures: [vair, azure], line: 'straight' } },
    };
    const component = renderer.create(<CoatsOfArmsDisplay blason={blason} dimension={dimension} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render a party blason with some ordinary', () => {
    const blason: Blason = {
      field: { kind: 'party', per: { name: 'bend', tinctures: [vair, azure], line: 'straight' } },
      ordinary: { name: 'chief', tincture: purpure, line: 'straight' },
    };
    const component = renderer.create(<CoatsOfArmsDisplay blason={blason} dimension={dimension} />);
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
    const component = renderer.create(<CoatsOfArmsDisplay blason={blason} dimension={dimension} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render an eagle blason with a saltire', () => {
    snapshotTest('Chequy gules and or, a saltire argent, an eagle displayed sable beaked and armed or');
  });

  it('should render a chief engrailed', () => {
    snapshotTest('Chequy gules and or, a chief engrailed ermine');
  });

  it('should render a chief invected', () => {
    snapshotTest('Chequy gules and or, a chief engrailed azure');
  });

  it('should render a bordure invected', () => {
    snapshotTest('Per fess or and ermine, a bordure engrailed azure');
  });

  it('should render a base engrailed', () => {
    snapshotTest('Or, a base engrailed vair');
  });

  it('should render a fess straight', () => {
    snapshotTest('Or, a fess murrey');
  });

  it('should render a cross', () => {
    snapshotTest('Argent, a cross gules');
  });

  it('should render a chevron', () => {
    snapshotTest('Argent, a chevron sable');
  });

  it('should render a bend invected', () => {
    snapshotTest('Ermine, a bend invected vair');
  });

  it('should render 2 pallets', () => {
    snapshotTest('Ermine, two pallets sable');
  });

  it('should render 3 fleurs de lys', () => {
    snapshotTest('Per chevron Sable and Or, three fleurs de lys argent');
  });

  it('should render a field splitted per saltire', () => {
    snapshotTest('Per saltire or and argent');
  });
  it('should render a field splitted per cross', () => {
    snapshotTest('Per cross or and argent');
  });
  it('should render a lion sejant', () => {
    snapshotTest('Bendy sinister or and argent, a lion sejant regardant gules');
  });
  it('should render a lion dormant', () => {
    snapshotTest('Bendy or and argent, a lion dormant gules');
  });
  it('should render a lion rampant', () => {
    snapshotTest('Bendy or and argent, a lion rampant ermine');
  });
  it('should render a bend sinister invected', () => {
    snapshotTest('Or, a bend sinister invected ermine');
  });
  it('should render a party per pale invected', () => {
    snapshotTest('Per pale invected ermine and or');
  });
});

function snapshotTest(blason: string) {
  const maybeBlason = parseBlason(blason);
  if ('error' in maybeBlason) {
    fail(maybeBlason.error);
    return;
  }

  const component = renderer.create(<CoatsOfArmsDisplay blason={maybeBlason} dimension={dimension} />);
  expect(component.toJSON()).toMatchSnapshot();
}
