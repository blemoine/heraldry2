import renderer from 'react-test-renderer';
import * as React from 'react';
import { CoatsOfArmsDisplay } from './CoatsOfArmsDisplay';
import { Blason } from '../model/blason';
import { azure, ermine, gules, or, purpure, vair } from '../model/tincture';
import { parseBlason } from '../blason-parser/blasonParser';
import { defaultTinctureConfiguration } from '../model/tincture-configuration';
import { Configuration } from '../model/configuration';
import { Dimension } from '../model/dimension';

let value = 1;
jest.mock('../../utils/uuid', () => {
  return {
    uuid: () => value++,
  };
});

const dimension: Dimension = {
  height: 266.6666666666667,
  width: 200,
};
const configuration: Configuration = { tinctureConfiguration: defaultTinctureConfiguration, shieldShape: 'heater' };

describe('CoatsOfArms', () => {
  beforeEach(() => {
    value = 0;
  });
  it('should render a plain blason', () => {
    const blason: Blason = { kind: 'simple', field: { kind: 'plain', tincture: gules } };
    const component = renderer.create(
      <CoatsOfArmsDisplay
        blason={blason}
        dimension={dimension}
        configuration={configuration}
        selectBlasonPart={() => {}}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render a fur blason', () => {
    const blason: Blason = { kind: 'simple', field: { kind: 'plain', tincture: ermine } };
    const component = renderer.create(
      <CoatsOfArmsDisplay
        blason={blason}
        dimension={dimension}
        configuration={configuration}
        selectBlasonPart={() => {}}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render a party blason', () => {
    const blason: Blason = {
      kind: 'simple',
      field: { kind: 'party', per: { name: 'bend', tinctures: [vair, azure], line: 'straight' } },
    };
    const component = renderer.create(
      <CoatsOfArmsDisplay
        blason={blason}
        dimension={dimension}
        configuration={configuration}
        selectBlasonPart={() => {}}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render a party blason with some ordinary', () => {
    const blason: Blason = {
      kind: 'simple',
      field: { kind: 'party', per: { name: 'bend', tinctures: [vair, azure], line: 'straight' } },
      ordinary: { name: 'chief', tincture: purpure, line: 'straight' },
    };
    const component = renderer.create(
      <CoatsOfArmsDisplay
        blason={blason}
        dimension={dimension}
        configuration={configuration}
        selectBlasonPart={() => {}}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render a the england royal arms', () => {
    const blason: Blason = {
      kind: 'simple',
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
    const component = renderer.create(
      <CoatsOfArmsDisplay
        blason={blason}
        dimension={dimension}
        configuration={configuration}
        selectBlasonPart={() => {}}
      />
    );
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
  snapshotTest('Barry pily counter ermine and potent en point');
  snapshotTest('Gules, three crosses pattée argent');
  snapshotTest('Argent, three crosses potent vair');
  snapshotTest('Sable, a cross maltese argent');
  snapshotTest('Azure, two crosses crosselet vert');
  snapshotTest('Azure, two crosses moline counter ermine');
  snapshotTest('Vert, two crosses hummetty counter potent');
  snapshotTest('Purpure, four crosses crosselet or');
  snapshotTest('Erminois, four crosses bottony argent');
  snapshotTest(
    'Quarterly, 1st: Bendy or and purpure, a bordure argent;2nd: Bendy of eight azure and or, a bordure argent;3rd: Bendy of eight or and vert, a bordure argent;4th: Bendy of eight or and gules, a bordure argent'
  );
  snapshotTest(
    'Quarterly, 1st ermine, a bordure indented gules; 2nd ermine, a bordure engrailed gules; 3rd ermine, a chief engrailed vert; 4th ermine, a bordure invected gules'
  );
});

function snapshotTest(blason: string) {
  it(`should render '${blason}'`, () => {
    const maybeBlason = parseBlason(blason);
    if ('error' in maybeBlason) {
      fail(maybeBlason.error);
      return;
    }

    const component = renderer.create(
      <CoatsOfArmsDisplay
        blason={maybeBlason}
        dimension={dimension}
        configuration={configuration}
        selectBlasonPart={() => {}}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
}
