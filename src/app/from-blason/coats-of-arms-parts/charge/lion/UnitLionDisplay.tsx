import { Lion, LionHead } from '../../../../model/charge';
import SvgLionRampant from './SvgLionRampant';
import * as React from 'react';
import { Tincture } from '../../../../model/tincture';
import { cannotHappen } from '../../../../../utils/cannot-happen';
import { DefaultLionHead } from './SvgDefaultLionHead';
import { ReactNode } from 'react';
import SvgGuardantLionHead from './SvgGuardantLionHead';
import SvgRegardantLionHead from './SvgRegardantLionHead';
import SvgLionPassant from './SvgLionPassant';
import SvgLionDormant from './SvgLionDormant';
import SvgLionCouchant from './SvgLionCouchant';
import SvgLionStatant from './SvgLionStatant';
import SvgLionSalient from './SvgLionSalient';
import SvgLionSejant from './SvgLionSejant';
import SvgLionSejantErect from './SvgLionSejantErect';
import { Dimension } from '../../../../model/dimension';
import { useState } from 'react';
import { getStrokeColor } from '../../../blason.helpers';

type Props = {
  charge: Lion;
  dimension: Dimension;
  fillFromTincture: (tincture: Tincture) => string;
  onClick: () => void;
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
  if (head === null) {
    return (
      <DefaultLionHead
        tongueFill={armedAndLanguedFill}
        mainFill={mainFill}
        stroke={stroke}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        strokeWidth={strokeWidth}
      />
    );
  } else if (head === 'guardant') {
    return (
      <SvgGuardantLionHead
        tongueFill={armedAndLanguedFill}
        mainFill={mainFill}
        stroke={stroke}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        strokeWidth={strokeWidth}
      />
    );
  } else if (head === 'regardant') {
    return (
      <SvgRegardantLionHead
        tongueFill={armedAndLanguedFill}
        mainFill={mainFill}
        stroke={stroke}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        strokeWidth={strokeWidth}
      />
    );
  } else {
    return cannotHappen(head);
  }
}

export const UnitLionDisplay = ({ charge, dimension, fillFromTincture, onClick }: Props) => {
  const [strokeWidth, setStrokeWidth] = useState(1);
  const onMouseDown = () => setStrokeWidth(1 + 2);
  const onMouseUp = () => setStrokeWidth(1);

  const armedAndLanguedFill = fillFromTincture(charge.armedAndLangued);
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
  if (charge.attitude === 'rampant') {
    return (
      <SvgLionRampant
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
  } else if (charge.attitude === 'passant') {
    return (
      <SvgLionPassant
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
  } else if (charge.attitude === 'statant') {
    return (
      <SvgLionStatant
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
  } else if (charge.attitude === 'salient') {
    return (
      <SvgLionSalient
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
  } else if (charge.attitude === 'sejant') {
    return (
      <SvgLionSejant
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
  } else if (charge.attitude === 'sejant-erect') {
    return (
      <SvgLionSejantErect
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
  } else if (charge.attitude === 'couchant') {
    return (
      <SvgLionCouchant
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
  } else if (charge.attitude === 'dormant') {
    return (
      <SvgLionDormant
        dimension={dimension}
        stroke={stroke}
        mainFill={mainFill}
        clawFill={armedAndLanguedFill}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        strokeWidth={strokeWidth}
      />
    );
  } else {
    return cannotHappen(charge.attitude);
  }
};
