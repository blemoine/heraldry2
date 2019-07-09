import * as React from 'react';

type Props = { fill: string };
export const Plain: React.FunctionComponent<Props> = (props) => {
  return <path d="M0 0 H200 V80 A197 199.2 90 0 1 100 240 A197 199.2 -90 0 1 0 80 Z" fill={props.fill} stroke="#333" />;
};
