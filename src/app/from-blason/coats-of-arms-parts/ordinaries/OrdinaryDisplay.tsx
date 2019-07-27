import * as React from 'react';
import { Ordinary } from '../../../model/ordinary';
import { cannotHappen } from '../../../../utils/cannot-happen';
import { Dimension } from '../../../model/dimension';
import { range } from '../../../../utils/range';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { ordinary: Ordinary; fill: string; dimension: Dimension };

export const OrdinaryDisplay = ({ ordinary, fill, dimension: { width, height } }: Props) => {
  if (ordinary.name === 'chief') {
    const chiefHeight = height / 5;
    return <rect x={0} y={0} width={width} height={chiefHeight} fill={fill} stroke="#333" />;
  } else if (ordinary.name === 'fess') {
    return <rect x={0} y={height / 3} width={width} height={height / 3} fill={fill} stroke="#333" />;
  } else if (ordinary.name === 'bend') {
    const basePoint = height / (8 * Math.sqrt(2));
    const length = Math.sqrt(width ** 2 + height ** 2);

    const pathBuilder = SvgPathBuilder.start([basePoint, -basePoint])
      .goTo([-basePoint, basePoint])
      .goTo([length - basePoint, length + basePoint])
      .goTo([length + basePoint, length - basePoint])
      .close();

    return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke="#333" />;
  } else if (ordinary.name === 'pale') {
    return (
      <g>
        {range(0, ordinary.count).map((i) => {
          return (
            <rect
              key={i}
              x={((i * 2 + 1) * width) / (2 * ordinary.count + 1)}
              y={0}
              width={width / (2 * ordinary.count + 1)}
              height={height}
              fill={fill}
              stroke="#333"
            />
          );
        })}
      </g>
    );
  } else if (ordinary.name === 'cross') {
    const pathBuilder = SvgPathBuilder.start([(2 * width) / 5, 0])
      .goTo([(3 * width) / 5, 0])
      .goTo([(3 * width) / 5, (2 * height) / 5])
      .goTo([width, (2 * height) / 5])
      .goTo([width, (3 * height) / 5])
      .goTo([(3 * width) / 5, (3 * height) / 5])
      .goTo([(3 * width) / 5, height])
      .goTo([(2 * width) / 5, height])
      .goTo([(2 * width) / 5, (3 * height) / 5])
      .goTo([0, (3 * height) / 5])
      .goTo([0, (2 * height) / 5])
      .goTo([(2 * width) / 5, (2 * height) / 5])
      .close();

    return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke="#333" />;
  } else if (ordinary.name === 'saltire') {
    const basePointW = width / (10 * Math.sqrt(2));
    const basePointH = height / (10 * Math.sqrt(2));

    const w = width / 2;
    const h = height / 2;

    const pathBuilder = SvgPathBuilder.start([w, h - basePointH])
      .goTo([2 * w, -basePointH])
      .goTo([2 * w + basePointW, h - (w * basePointH) / basePointW])
      .goTo([w + basePointW, h])
      .goTo([2 * w + basePointW, h + (w * basePointH) / basePointW])
      .goTo([2 * w, 2 * h + basePointH])
      .goTo([w, h + basePointH])
      .goTo([(h * basePointW) / basePointH - w, 2 * h + basePointH])
      .goTo([-basePointW, h + (w * basePointH) / basePointW])
      .goTo([w - basePointW, h])
      .goTo([-basePointW, h - (w * basePointH) / basePointW])
      .goTo([(h * basePointW) / basePointH - w, -basePointH])
      .close();

    return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke="#333" />;
  } else if (ordinary.name === 'chevron') {
    const basePoint = height / 5;

    return (
      <path
        d={`M${width / 2} ${height / 3} L0 ${height / 3 + width / 2} L0 ${height / 3 + width / 2 - basePoint} L${width /
          2} ${height / 3 - basePoint} L${width} ${height / 3 + width / 2 - basePoint} L${width}  ${height / 3 +
          width / 2} Z`}
        fill={fill}
        stroke="#333"
      />
    );
  } else if (ordinary.name === 'bordure') {
    const bordureWidth = width / 10;
    return (
      <path
        d={`M 0 0 H${width} V${height / 3} A${width} ${width} 90 0 1 ${width /
          2} ${height} A${width} ${width} -90 0 1 0 ${height / 3} V 0 0 L ${bordureWidth} ${bordureWidth} H ${width -
          bordureWidth} V ${height / 3}  A${width} ${width} 90 0 1 ${width / 2} ${height -
          bordureWidth}  A${width} ${width} -90 0 1 ${bordureWidth} ${height / 3} V ${bordureWidth} Z`}
        fill={fill}
        stroke="transparent"
        fillRule={'evenodd'}
      />
    );
  } else {
    return cannotHappen(ordinary);
  }
};
