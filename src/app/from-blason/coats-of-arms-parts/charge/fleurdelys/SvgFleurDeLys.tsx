import React from 'react';
import { Dimension } from '../../../../model/dimension';
import { SvgPathBuilder } from '../../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../../common/PathFromBuilder';

const SvgFleurDeLys = ({
  dimension,
  stroke,
  mainFill,
}: {
  dimension: Dimension;

  stroke: string;
  mainFill: string;
}) => {
  const leftPart = SvgPathBuilder.start([22.23, 169.17])
    .relativeArcTo([7.88, -64.69], { radius: 33.383, xAxisRotation: 0.17, sweep: 1 })
    .relativeArcTo([40.5, 43.31], { radius: 40.566, xAxisRotation: 178.91, sweep: 1 })
    .relativeArcTo([-27, 42.75], { radius: 42.3, sweep: 1 })
    .relativeArcTo([-4.5, -10.12], { radius: 5.541, sweep: 1, largeArc: 1 })
    .relativeArcTo([20.25, -17.44], { radius: 52.597, xAxisRotation: -180 })
    .relativeArcTo([-16.88, -21.09], { radius: 15.364, xAxisRotation: -180 })
    .relativeArcTo([-20.25, 27.28], { radius: 20.96, xAxisRotation: -180 })
    .close()
    .translate([0, -27])
    .translate([2.16, -2.16]);

  const rightPart = leftPart.verticalMirror(147 / 2);

  const verticalMiddlePart = SvgPathBuilder.start([25.64, 4.5])
    .relativeArcTo([-4.31, 119.07], { radius: 87.416, xAxisRotation: -180 })
    .relativeArcTo([4.31, 67.33], { radius: 48.753, xAxisRotation: -180 })
    .verticalMove(0.17)
    .relativeGoTo([0.09, -0.08])
    .relativeGoTo([0.1, 0.08])
    .verticalMove(-0.17)
    .relativeArcTo([4.31, -67.33], { radius: 48.753, xAxisRotation: -180 })
    .arcTo([25.83, 4.5], { radius: 87.416, xAxisRotation: -180 })
    .verticalMove(-0.18)
    .relativeGoTo([-0.1, 0.09])
    .relativeGoTo([-0.09, -0.09])
    .verticalMove(0.18)
    .close()
    .translate([48.309, 0])
    .translate([2.16, -2.16]);

  const middlePart = SvgPathBuilder.start([40.5, 191.07])
    .relativeArcTo([9, -9], { radius: 9, xAxisRotation: -180 })
    .verticalMove(-1.12)
    .relativeArcTo([-9, -9], { radius: 9, xAxisRotation: -180 })
    .goTo([9, 171.95])
    .relativeArcTo([-9, 9], { radius: 9, xAxisRotation: -180 })
    .verticalMove(1.12)
    .relativeArcTo([9, 9], { radius: 9, xAxisRotation: -180 })
    .horizontalMove(31.5)
    .close()
    .translate([49.293, -49.5])
    .translate([2.16, -2.16]);

  return (
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
      <PathFromBuilder pathBuilder={leftPart} fill={mainFill} stroke={stroke} />
      <PathFromBuilder pathBuilder={rightPart} fill={mainFill} stroke={stroke} />
      <PathFromBuilder pathBuilder={verticalMiddlePart} fill={mainFill} stroke={stroke} />
      <PathFromBuilder pathBuilder={middlePart} fill={mainFill} stroke={stroke} />
    </svg>
  );
};

export default SvgFleurDeLys;
