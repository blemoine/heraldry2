import * as React from 'react';
import { combine, isError } from '~/utils/result';
import { FocusablePathFromBuilder } from '~/app/common/PathFromBuilder';
import { SvgPathBuilder } from '~/app/svg-path-builder/svg-path-builder';

type Props = {
  topLimb: SvgPathBuilder;
  center: readonly [number, number];
  fill: string;
  stroke: string;
  onClick: () => void;
};

export const FromLimb = ({ topLimb, center, fill, stroke, onClick }: Props) => {
  const maybePathBuilder = combine(
    [topLimb, topLimb.rotate(center, 90), topLimb.rotate(center, 180), topLimb.rotate(center, 270)],
    (a, b) => a.concat(b)
  );

  if (isError(maybePathBuilder)) {
    throw new Error(maybePathBuilder.error.join('\n'));
  } else {
    return <FocusablePathFromBuilder pathBuilder={maybePathBuilder} fill={fill} stroke={stroke} onClick={onClick} />;
  }
};
