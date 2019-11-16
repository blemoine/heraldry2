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
  snapshotTest('Azure, chaussé ployé per pale gules and sable fimbriated or');
  snapshotTest('Barry and per chevron throughout pean and erminois');
  snapshotTest('Barry and per pale sable and argent, chaussé gules');
  snapshotTest('Barry azure and ermine');
  snapshotTest('Barry dancetty argent and azure');
  snapshotTest('Barry ermine and vert');
  snapshotTest('Barry of six or and sable');
  snapshotTest('Barry wavy ermine and sable');

  snapshotTest('Barry wavy vert and argent ermined vert');
  snapshotTest('Bendy and per bend sinister sable and Or');
  snapshotTest('Bendy and per pale sable and argent');
  snapshotTest('Bendy ermine and sable');
  snapshotTest('Bendy or and gules');
  snapshotTest('Bendy sinister and per bend azure and ermine');
  snapshotTest('Bendy sinister embattled or and gules');
  //snapshotTest('Bendy sinister of four, vert, argent, purpure and argent');
  snapshotTest('Bendy sinister sable and gules');

  snapshotTest('Bendy sinister vert and erminois');
  snapshotTest('Bendy wavy argent and sable');
  snapshotTest('Checky sable and ermine');
  //snapshotTest('Chevronelly azure and argent');
  //snapshotTest('Chevronelly erminois and pean');
  //snapshotTest('Chevronelly inverted gules and or');
  //snapshotTest('Chevronelly inverted vert and or');
  //snapshotTest('Gules scaly or');
  //snapshotTest('Gules mailed or');

  //snapshotTest('Gyronny arrondi argent voided sable and sable');
  //snapshotTest('Gyronny arrondy of six gules and argent');
  //snapshotTest('Gyronny arrondy Or and azure');
  //snapshotTest('Gyronny azure and argent scaly sable');
  snapshotTest('Gyronny erminois and pean');
  //snapshotTest('Gyronny gules and lozengy azure and or');
  //snapshotTest('Gyronny of ten ermine and vert');
});
