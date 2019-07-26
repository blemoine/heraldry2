import React from 'react';
import { Dimension } from '../../../../model/dimension';

const SvgFleurDeLys = ({
  dimension,
  stroke,
  mainFill,
}: {
  dimension: Dimension;

  stroke: string;
  mainFill: string;
}) => (
  <svg
    width={dimension.width}
    height={dimension.height}
    viewBox="0 0 152.407 191.07"
    xmlSpace="preserve"
    colorInterpolationFilters="sRGB"
    fill="none"
    fillRule="evenodd"
    fontSize={12}
    overflow="visible"
    strokeLinecap="square"
    strokeMiterlimit={3}
  >
    <style type="text/css" id="style6">
      {`.Fleur-de-Lys_svg__st1{fill:${mainFill};stroke:${stroke};stroke-linecap:round;stroke-linejoin:round;stroke-width:2.16}`}
    </style>
    <g id="Fleur-de-Lys_svg__g8">
      <g id="Fleur-de-Lys_svg__group2-1" transform="translate(2.16 -2.16)">
        <g id="Fleur-de-Lys_svg__group3-2" transform="translate(0 -27)">
          <g id="Fleur-de-Lys_svg__shape4-3">
            <path
              d="M22.23 169.17a33.383 33.383.17 0 1 7.88-64.69 40.566 40.566 178.91 0 1 40.5 43.31 42.3 42.3 0 0 1-27 42.75 5.541 5.541 0 1 1-4.5-10.12 52.597 52.597-180 0 0 20.25-17.44 15.364 15.364-180 0 0-16.88-21.09 20.96 20.96-180 0 0-20.25 27.28z"
              className="Fleur-de-Lys_svg__st1"
              id="Fleur-de-Lys_svg__path21"
            />
          </g>
          <g id="Fleur-de-Lys_svg__shape5-5" transform="matrix(-1 0 0 1 148.087 0)">
            <path
              d="M22.23 169.17a33.383 33.383.17 0 1 7.88-64.69 40.566 40.566 178.91 0 1 40.5 43.31 42.3 42.3 0 0 1-27 42.75 5.541 5.541 0 1 1-4.5-10.12 52.597 52.597-180 0 0 20.25-17.44 15.364 15.364-180 0 0-16.88-21.09 20.96 20.96-180 0 0-20.25 27.28z"
              className="Fleur-de-Lys_svg__st1"
              id="Fleur-de-Lys_svg__path26"
            />
          </g>
        </g>
        <g id="Fleur-de-Lys_svg__shape6-7" transform="translate(48.309)">
          <path
            d="M25.64 4.5a87.416 87.416-180 0 0-4.31 119.07 48.753 48.753-180 0 0 4.31 67.33v.17l.09-.08.1.08v-.17a48.753 48.753-180 0 0 4.31-67.33A87.416 87.416-180 0 0 25.83 4.5v-.18l-.1.09-.09-.09v.18z"
            className="Fleur-de-Lys_svg__st1"
            id="Fleur-de-Lys_svg__path31"
          />
        </g>
        <g id="Fleur-de-Lys_svg__shape7-9" transform="translate(49.293 -49.5)">
          <path
            d="M40.5 191.07a9 9-180 0 0 9-9v-1.12a9 9-180 0 0-9-9H9a9 9-180 0 0-9 9v1.12a9 9-180 0 0 9 9h31.5z"
            className="Fleur-de-Lys_svg__st1"
            id="Fleur-de-Lys_svg__path36"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default SvgFleurDeLys;
