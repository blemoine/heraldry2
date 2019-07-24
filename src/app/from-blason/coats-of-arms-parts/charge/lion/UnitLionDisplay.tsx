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

type Props = {
  charge: Lion;
  dimension: Dimension;
  fillFromTincture: (tincture: Tincture) => string;
};
export const UnitLionDisplay = ({ charge, dimension, fillFromTincture }: Props) => {
  const armedAndLanguedFill = fillFromTincture(charge.armedAndLangued);
  const mainFill = fillFromTincture(charge.tincture);
  const stroke = charge.tincture.name === 'sable' ? '#777' : '#000';
  const head = lionHead(charge.head, armedAndLanguedFill, mainFill, stroke);
  if (charge.attitude === 'rampant') {
    return (
      <SvgLionRampant
        dimension={dimension}
        mainFill={mainFill}
        head={head}
        clawFill={armedAndLanguedFill}
        stroke={stroke}
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
      />
    );
  } else if (charge.attitude === 'dormant') {
    return <SvgLionDormant dimension={dimension} stroke={stroke} mainFill={mainFill} clawFill={armedAndLanguedFill} />;
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
