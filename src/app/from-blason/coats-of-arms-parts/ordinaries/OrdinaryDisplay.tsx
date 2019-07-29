import * as React from 'react';
import { Ordinary } from '../../../model/ordinary';
import { cannotHappen } from '../../../../utils/cannot-happen';
import { Dimension } from '../../../model/dimension';
import { range } from '../../../../utils/range';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { computeLineOptions } from '../blasonDisplay.helper';

type Props = { ordinary: Ordinary; fill: string; dimension: Dimension };

export const OrdinaryDisplay = ({ ordinary, fill, dimension }: Props) => {
  const { width, height } = dimension;
  if (ordinary.name === 'chief') {
    const chiefHeight = height / 5;
    const lineOptions = computeLineOptions(ordinary.line, dimension);

    const pathBuilder = SvgPathBuilder.start([0, 0])
      .goTo([0, chiefHeight])
      .goTo([width, chiefHeight], lineOptions)
      .goTo([width, 0])
      .close();

    return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke="#333" />;
  } else if (ordinary.name === 'base') {
    const baseHeight = height / 4;
    const lineOptions = computeLineOptions(ordinary.line, dimension);

    const pathBuilder = SvgPathBuilder.start([0, height])
      .goTo([width, height])
      .goTo([width, height - baseHeight])
      .goTo([0, height - baseHeight], lineOptions)
      .close();

    return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke="#333" />;
  } else if (ordinary.name === 'fess') {
    const lineOptions = computeLineOptions(ordinary.line, dimension);

    const pathBuilder = SvgPathBuilder.start([0, height / 3])
      .goTo([0, (2 * height) / 3])
      .goTo([width, (2 * height) / 3], lineOptions)
      .goTo([width, height / 3])
      .goTo([0, height / 3], lineOptions);

    return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke="#333" />;
  } else if (ordinary.name === 'bend') {
    const basePoint = height / (8 * Math.sqrt(2));
    const length = Math.sqrt(width ** 2 + height ** 2);

    const lineOptions = computeLineOptions(ordinary.line, dimension);

    const pathBuilder = SvgPathBuilder.start([basePoint, -basePoint])
      .goTo([-basePoint, basePoint])
      .goTo([length - basePoint, length + basePoint], lineOptions)
      .goTo([length + basePoint, length - basePoint])
      .goTo([basePoint, -basePoint], lineOptions);

    return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke="#333" />;
  } else if (ordinary.name === 'bendSinister') {
    return (
      <g transform={`scale(-1,1) translate(-${width} 0)`}>
        <OrdinaryDisplay ordinary={{ ...ordinary, name: 'bend' }} fill={fill} dimension={dimension} />
      </g>
    );
  } else if (ordinary.name === 'pale') {
    const lineOptions = computeLineOptions(ordinary.line, dimension);
    return (
      <g>
        {range(0, ordinary.count).map((i) => {
          const startX = ((i * 2 + 1) * width) / (2 * ordinary.count + 1);
          const paleWidth = width / (2 * ordinary.count + 1);
          const pathBuilder = SvgPathBuilder.start([startX, 0])
            .goTo([startX, 0])
            .goTo([startX, height], lineOptions)
            .goTo([startX + paleWidth, height])
            .goTo([startX + paleWidth, 0], lineOptions);

          return <PathFromBuilder key={i} pathBuilder={pathBuilder} fill={fill} stroke="#333" />;
        })}
      </g>
    );
  } else if (ordinary.name === 'cross') {
    const lineOptions = computeLineOptions(ordinary.line, dimension);

    const pathBuilder = SvgPathBuilder.start([(2 * width) / 5, 0])
      .goTo([(2 * width) / 5, (2 * height) / 5], lineOptions)
      .goTo([0, (2 * height) / 5], lineOptions)
      .goTo([0, (3 * height) / 5])
      .goTo([(2 * width) / 5, (3 * height) / 5], lineOptions)
      .goTo([(2 * width) / 5, height], lineOptions)
      .goTo([(3 * width) / 5, height])
      .goTo([(3 * width) / 5, (3 * height) / 5], lineOptions)
      .goTo([width, (3 * height) / 5], lineOptions)
      .goTo([width, (2 * height) / 5])
      .goTo([(3 * width) / 5, (2 * height) / 5], lineOptions)
      .goTo([(3 * width) / 5, 0], lineOptions)
      .goTo([(2 * width) / 5, 0]);

    return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke="#333" />;
  } else if (ordinary.name === 'saltire') {
    const lineOptions = computeLineOptions(ordinary.line, dimension);
    const basePointW = width / (10 * Math.sqrt(2));
    const basePointH = height / (10 * Math.sqrt(2));

    const w = width / 2;
    const h = height / 2;

    const pathBuilder = SvgPathBuilder.start([w, h - basePointH])
      .goTo([(h * basePointW) / basePointH - w, -basePointH], lineOptions)
      .goTo([-basePointW, h - (w * basePointH) / basePointW])
      .goTo([w - basePointW, h], lineOptions)
      .goTo([-basePointW, h + (w * basePointH) / basePointW], lineOptions)
      .goTo([(h * basePointW) / basePointH - w, 2 * h + basePointH])
      .goTo([w, h + basePointH], lineOptions)
      .goTo([2 * w, 2 * h + basePointH], lineOptions)
      .goTo([2 * w + basePointW, h + (w * basePointH) / basePointW])
      .goTo([w + basePointW, h], lineOptions)
      .goTo([2 * w + basePointW, h - (w * basePointH) / basePointW], lineOptions)
      .goTo([2 * w, -basePointH])
      .goTo([w, h - basePointH], lineOptions);

    return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke="#333" />;
  } else if (ordinary.name === 'chevron') {
    const lineOptions = computeLineOptions(ordinary.line, dimension);
    const basePoint = height / 5;

    const pathBuilder = SvgPathBuilder.start([width / 2, height / 3])
      .goTo([width, height / 3 + width / 2], lineOptions)
      .goTo([width, height / 3 + width / 2 - basePoint])
      .goTo([width / 2, height / 3 - basePoint], lineOptions)
      .goTo([0, height / 3 + width / 2 - basePoint], lineOptions)
      .goTo([0, height / 3 + width / 2])
      .goTo([width / 2, height / 3], lineOptions);

    return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke="#333" />;
  } else if (ordinary.name === 'bordure') {
    const bordureWidth = width / 10;

    const lineOptions = computeLineOptions(ordinary.line, dimension);

    const pathBuilder = SvgPathBuilder.start([0, 0])
      .goTo([width, 0])
      .goTo([width, height / 3])
      .arcTo([width / 2, height], { radius: width, xAxisRotation: 90, sweep: 1 })
      .arcTo([0, height / 3], { radius: width, xAxisRotation: -90, sweep: 1 })
      .goTo([0, 0])
      .goTo([bordureWidth, bordureWidth])
      .goTo([width - bordureWidth, bordureWidth], lineOptions)
      .goTo([width - bordureWidth, height / 3], lineOptions)
      .arcTo([width / 2, height - bordureWidth], { radius: width, xAxisRotation: 90, sweep: 1 }, lineOptions)
      .arcTo([bordureWidth, height / 3], { radius: width, xAxisRotation: -90, sweep: 1 }, lineOptions)
      .goTo([bordureWidth, bordureWidth], lineOptions)
      .close();

    return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke="transparent" fillRule={'evenodd'} />;
  } else {
    return cannotHappen(ordinary);
  }
};
