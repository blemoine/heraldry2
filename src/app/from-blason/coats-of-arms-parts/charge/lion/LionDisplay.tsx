import { Lion, LionHead } from '../../../../model/charge';
import SvgLionRampant from './SvgLionRampant';
import * as React from 'react';
import { Tincture } from '../../../../model/tincture';
import { cannotHappen } from '../../../../../utils/cannot-happen';
import { DefaultLionHead } from './SvgDefaultLionHead';
import { ReactNode } from 'react';
import SvgGuardantLionHead from './SvgGuardantLionHead';
import SvgRegardantLionHead from './SvgRegardantLionHead';

type Props = { charge: Lion; width: number; height: number; fillFromTincture: (tincture: Tincture) => string };
export const LionDisplay = ({ charge, width, height, fillFromTincture }: Props) => {
  if (charge.attitude === 'rampant') {
    const armedAndLanguedFill = fillFromTincture(charge.armedAndLangued);
    const mainFill = fillFromTincture(charge.tincture);
    const head = lionHead(charge.head, armedAndLanguedFill, mainFill);

    return (
      <SvgLionRampant
        width={width * 0.8}
        height={height * 0.8}
        x={width * 0.1}
        y={0}
        mainFill={mainFill}
        head={head}
        clawFill={armedAndLanguedFill}
      />
    );
  } else if (charge.attitude === 'passant') {
    throw new Error('TODO unsupported' + charge.attitude);
  } else if (charge.attitude === 'statant') {
    throw new Error('TODO unsupported' + charge.attitude);
  } else if (charge.attitude === 'salient') {
    throw new Error('TODO unsupported' + charge.attitude);
  } else if (charge.attitude === 'sejant') {
    throw new Error('TODO unsupported' + charge.attitude);
  } else if (charge.attitude === 'sejant-erect') {
    throw new Error('TODO unsupported' + charge.attitude);
  } else if (charge.attitude === 'couchant') {
    throw new Error('TODO unsupported' + charge.attitude);
  } else if (charge.attitude === 'dormant') {
    throw new Error('TODO unsupported' + charge.attitude);
  } else {
    return cannotHappen(charge.attitude);
  }
};

function lionHead(head: LionHead | null, armedAndLanguedFill: string, mainFill: string): ReactNode {
  if (head === null) {
    return <DefaultLionHead tongueFill={armedAndLanguedFill} mainFill={mainFill} />;
  } else if (head === 'guardant') {
    return <SvgGuardantLionHead tongueFill={armedAndLanguedFill} mainFill={mainFill} />;
  } else if (head === 'regardant') {
    return <SvgRegardantLionHead tongueFill={armedAndLanguedFill} mainFill={mainFill} />;
  } else {
    return cannotHappen(head);
  }
}
