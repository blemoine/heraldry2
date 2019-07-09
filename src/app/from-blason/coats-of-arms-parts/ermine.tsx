import * as React from 'react';

export const Ermine = () => {
  // thanks to wikipedia https://upload.wikimedia.org/wikipedia/commons/2/21/Fourrure_h%C3%A9raldique_Hermine.svg
  return (
    <>
      <rect width="100%" height="100%" fill="white" />
      <g transform="translate(100,240)">
        <path d="M0,-174 C -15,-30 -28,-35 -55,0 L -15,-28 0,0 15,-28 55,0 C 28,-35 15,-30 0,-174z" />
        <circle cy="-226" r="14" />
        <circle cy="-194" cx="-32" r="14" />
        <circle cy="-194" cx="32" r="14" />
      </g>
    </>
  );
};
