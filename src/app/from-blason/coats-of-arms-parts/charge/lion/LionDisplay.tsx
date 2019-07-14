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

type Props = { charge: Lion; width: number; height: number; fillFromTincture: (tincture: Tincture) => string };
export const LionDisplay = ({ charge, width, height, fillFromTincture }: Props) => {
  const armedAndLanguedFill = fillFromTincture(charge.armedAndLangued);
  const mainFill = fillFromTincture(charge.tincture);
  const stroke = charge.tincture.name === 'sable' ? '#777' : '#000';
  const head = lionHead(charge.head, armedAndLanguedFill, mainFill, stroke);
  if (charge.attitude === 'rampant') {
    return (
      <SvgLionRampant
        width={width * 0.8}
        height={height * 0.8}
        x={width * 0.1}
        y={0}
        mainFill={mainFill}
        head={head}
        clawFill={armedAndLanguedFill}
        stroke={stroke}
      />
    );
  } else if (charge.attitude === 'passant') {
    return (
      <SvgLionPassant
        width={width * 0.8}
        height={height * 0.8}
        x={width * 0.1}
        y={0}
        mainFill={mainFill}
        head={head}
        clawFill={armedAndLanguedFill}
        stroke={stroke}
      />
    );
  } else if (charge.attitude === 'statant') {
    return (
      <SvgLionStatant
        width={width * 0.8}
        height={height * 0.8}
        x={width * 0.1}
        y={0}
        mainFill={mainFill}
        head={head}
        clawFill={armedAndLanguedFill}
        stroke={stroke}
      />
    );

  } else if (charge.attitude === 'salient') {
    throw new Error('TODO unsupported' + charge.attitude);
  } else if (charge.attitude === 'sejant') {
    throw new Error('TODO unsupported' + charge.attitude);
  } else if (charge.attitude === 'sejant-erect') {
    throw new Error('TODO unsupported' + charge.attitude);
  } else if (charge.attitude === 'couchant') {
    return (
      <SvgLionCouchant
        width={width * 0.8}
        height={height * 0.8}
        x={width * 0.1}
        y={0}
        mainFill={mainFill}
        head={head}
        clawFill={armedAndLanguedFill}
        stroke={stroke}
      />
    );

  } else if (charge.attitude === 'dormant') {
    return (
      <SvgLionDormant
        width={width * 0.8}
        height={height * 0.8}
        x={width * 0.1}
        y={0}
        stroke={stroke}
        mainFill={mainFill}
        clawFill={armedAndLanguedFill}
      />
    );
  } else {
    return cannotHappen(charge.attitude);
  }
};

function lionHead(head: LionHead | null, armedAndLanguedFill: string, mainFill: string, stroke: string): ReactNode {
  if (head === null) {
    return <DefaultLionHead tongueFill={armedAndLanguedFill} mainFill={mainFill} stroke={stroke} />;
  } else if (head === 'guardant') {
    return <SvgGuardantLionHead tongueFill={armedAndLanguedFill} mainFill={mainFill} stroke={stroke} />;
  } else if (head === 'regardant') {
    return <SvgRegardantLionHead tongueFill={armedAndLanguedFill} mainFill={mainFill} stroke={stroke} />;
  } else {
    return cannotHappen(head);
  }
}
