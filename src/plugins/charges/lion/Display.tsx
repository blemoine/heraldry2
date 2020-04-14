import * as React from 'react';
import { ReactNode, useState } from 'react';
import { Lion, LionHead } from './lion';
import { scale } from '~/app/model/dimension';
import { getChargePositions } from '~/app/from-blason/coats-of-arms-parts/charge/charge.helper';
import {
  ChargeDisplayParameters,
  ChargeUnitDisplayParameters,
} from '~/app/from-blason/coats-of-arms-parts/ChargeDisplay';
import { getStrokeColor } from '~/app/from-blason/blason.helpers';
import { cannotHappen } from '~/utils/cannot-happen';
import SvgCouchant from './SvgCouchant';
import SvgDormant from './SvgDormant';
import SvgPassant from './SvgPassant';
import SvgRampant from './SvgRampant';
import SvgSalient from './SvgSalient';
import SvgSejant from './SvgSejant';
import SvgSejantErect from './SvgSejantErect';
import SvgStatant from './SvgStatant';
import SvgDefaultHead from './SvgDefaultHead';
import SvgGuardantHead from './SvgGuardantHead';
import SvgRegardantHead from './SvgRegardantHead';

export const Display = ({ charge, dimension, fillFromTincture, shape, onClick }: ChargeDisplayParameters<Lion>) => {
  const { count, disposition } = charge.countAndDisposition;
  const { cellWidth, cellHeight, positions } = getChargePositions(count, disposition, shape);
  const { width, height } = dimension;
  const computedDimension = scale(dimension, Math.min(2.2 * cellWidth, cellHeight));

  return (
    <>
      {positions.map(([cx, cy], idx) => {
        const centerX = cx * width;
        const centerY = cy * height;
        return (
          <g
            key={idx}
            transform={`translate(${centerX - computedDimension.width / 2} ${centerY - computedDimension.height / 2} )`}
          >
            <UnitDisplay
              charge={charge}
              dimension={computedDimension}
              fillFromTincture={fillFromTincture}
              onClick={onClick}
            />
          </g>
        );
      })}
    </>
  );
};

function lionHead(
  head: LionHead | null,
  armedAndLanguedFill: string,
  mainFill: string,
  stroke: string,
  onClick: () => void,
  onMouseDown: () => void,
  onMouseUp: () => void,
  strokeWidth: number
): ReactNode {
  let Svg;
  if (head === null) {
    Svg = SvgDefaultHead;
  } else if (head === 'guardant') {
    Svg = SvgGuardantHead;
  } else if (head === 'regardant') {
    Svg = SvgRegardantHead;
  } else {
    return cannotHappen(head);
  }
  return (
    <Svg
      tongueFill={armedAndLanguedFill}
      mainFill={mainFill}
      stroke={stroke}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      strokeWidth={strokeWidth}
    />
  );
}

const UnitDisplay = ({ charge, dimension, fillFromTincture, onClick }: ChargeUnitDisplayParameters<Lion>) => {
  const [strokeWidth, setStrokeWidth] = useState(1);
  const onMouseDown = () => setStrokeWidth(1 + 2);
  const onMouseUp = () => setStrokeWidth(1);

  const armedAndLanguedFill = fillFromTincture(charge.secondaryTincture);
  const mainFill = fillFromTincture(charge.tincture);
  const stroke = getStrokeColor(charge.tincture);
  const head = lionHead(
    charge.head,
    armedAndLanguedFill,
    mainFill,
    stroke,
    onClick,
    onMouseDown,
    onMouseUp,
    strokeWidth
  );

  let Svg;
  if (charge.attitude === 'rampant') {
    Svg = SvgRampant;
  } else if (charge.attitude === 'passant') {
    Svg = SvgPassant;
  } else if (charge.attitude === 'statant') {
    Svg = SvgStatant;
  } else if (charge.attitude === 'salient') {
    Svg = SvgSalient;
  } else if (charge.attitude === 'sejant') {
    Svg = SvgSejant;
  } else if (charge.attitude === 'sejant-erect') {
    Svg = SvgSejantErect;
  } else if (charge.attitude === 'couchant') {
    Svg = SvgCouchant;
  } else if (charge.attitude === 'dormant') {
    Svg = SvgDormant;
  } else {
    return cannotHappen(charge.attitude);
  }

  return (
    <Svg
      dimension={dimension}
      mainFill={mainFill}
      head={head}
      clawFill={armedAndLanguedFill}
      stroke={stroke}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      strokeWidth={strokeWidth}
    />
  );
};
