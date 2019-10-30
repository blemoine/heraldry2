import { snapshotTest } from './tests/CoatsOfArms.render';

let value = 1;
jest.mock('../../utils/uuid', () => {
  return {
    uuid: () => value++,
  };
});

// It should render arms from http://blog.wirelizard.ca/2017/10/31/sca-field-only-armoury-project-part-one/

describe('CoatsOfArms', () => {
  beforeEach(() => {
    value = 0;
  });

  snapshotTest('Argent, chapé ployé per pale gules and sable');
  //snapshotTest('Azure, chaussé ployé per pale gules and sable frimbriated or');
  snapshotTest('Barry and per chevron throughout pean and erminois');
  snapshotTest('Barry and per pale sable and argent, chaussé gules');
  snapshotTest('Barry azure and ermine');
  snapshotTest('Barry dancetty argent and azure');
  snapshotTest('Barry ermine and vert');
  snapshotTest('Barry of six or and sable');
  snapshotTest('Barry wavy ermine and sable');
});
