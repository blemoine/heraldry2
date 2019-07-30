import * as React from 'react';
import { Line, lines } from '../../model/line';
import { SelectScalar } from '../../common/SelectScalar';

type Props = { line: Line; lineChange: (line: Line) => void };
export const LineSelect = (props: Props) => {
  return <SelectScalar options={lines} value={props.line} valueChange={props.lineChange} />;
};
