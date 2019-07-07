import * as React from 'react';

type Props = { blason: string };
export const BlasonDisplay = (props: Props) => {
  return <div>{props.blason}</div>;
};
