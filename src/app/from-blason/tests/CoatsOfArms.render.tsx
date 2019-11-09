import { parseBlason } from '../../blason-parser/blasonParser';
import renderer from 'react-test-renderer';
import { CoatsOfArmsDisplay } from '../CoatsOfArmsDisplay';
import * as React from 'react';
import { Dimension } from '../../model/dimension';

const dimension: Dimension = {
  height: 266.6666666666667,
  width: 200,
};

export function snapshotTest(blason: string) {
  it(`should render '${blason}'`, () => {
    const maybeBlason = parseBlason(blason);
    if ('error' in maybeBlason) {
      fail(maybeBlason.error);
      return;
    }

    const component = renderer.create(
      <CoatsOfArmsDisplay blason={maybeBlason} dimension={dimension} selectBlasonPart={() => {}} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
}
