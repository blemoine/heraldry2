import * as React from 'react';
type Props = { width: number; height: number };
export const Ermine = ({ width, height }: Props) => {
  // thanks to wikipedia https://upload.wikimedia.org/wikipedia/commons/2/21/Fourrure_h%C3%A9raldique_Hermine.svg
  return (
    <>
      <rect width="100%" height="100%" fill="white" />
      <g transform={`translate(${width / 2}, ${height})`}>
        <path
          d={`M0,${height * -0.725} C ${(width * -15) / 200},${(height * -30) / 240} ${(width * -29) / 200},${(height *
            -35) /
            240} ${(width * -55) / 200},0 L ${(width * -15) / 200},${(height * -28) / 240} 0,0 ${(width * 15) /
            200},${(height * -28) / 240} ${(width * 55) / 200},0 C ${(width * 28) / 200},${(height * -35) /
            240} ${(width * 15) / 200},${(height * -30) / 240} 0,${(height * -174) / 240} Z`}
        />
        <circle cy={(height * -226) / 240} r="14" />
        <circle cy={(height * -194) / 240} cx={(width * -32) / 200} r={(width * 14) / 200} />
        <circle cy={(height * -194) / 240} cx={(width * 32) / 200} r={(width * 14) / 200} />
      </g>
    </>
  );
};
