import renderer from 'react-test-renderer';
import * as React from 'react';
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

  snapshotTest('Chequy gules and or, a saltire argent, an eagle displayed sable beaked and armed or');
  snapshotTest('Chequy gules and or, a chief engrailed ermine');
  snapshotTest('Chequy gules and or, a chief engrailed azure');
  snapshotTest('Per fess or and ermine, a bordure engrailed azure');
  snapshotTest('Or, a base engrailed vair');
  snapshotTest('Or, a fess murrey');
  snapshotTest('Argent, a cross gules');
  snapshotTest('Argent, a chevron sable');
  snapshotTest('Ermine, a bend invected vair');
  snapshotTest('Ermine, two pallets sable');
  snapshotTest('Per chevron Sable and Or, three fleurs de lys argent');
  snapshotTest('Per saltire or and argent');
  snapshotTest('Per cross or and argent');
  snapshotTest('Bendy sinister or and argent, a lion sejant regardant gules');
  snapshotTest('Bendy or and argent, a lion dormant gules');
  snapshotTest('Bendy or and argent, a lion rampant ermine');
  snapshotTest('Or, a bend sinister invected ermine');
  snapshotTest('Per pale invected ermine and or');
  snapshotTest('Azure, twelve roundels argent');
  snapshotTest('Azure, nineteen annulets argent');
  snapshotTest('Or, thirteen lozenge or');
  snapshotTest('Or, eleven rustres sable');
  snapshotTest('Or, fifteen mascles sable');
  snapshotTest('Potent, a chief gules');
  snapshotTest('Paly pily vair and pean');
  snapshotTest('Paly pily counter ermine and potent en point');
});

function snapshotTest(blason: string) {
  it(`should render '${blason}'`, () => {
    const maybeBlason = parseBlason(blason);
    if ('error' in maybeBlason) {
      fail(maybeBlason.error);
      return;
    }

    const component = renderer.create(<CoatsOfArmsDisplay blason={maybeBlason} dimension={dimension} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
}
