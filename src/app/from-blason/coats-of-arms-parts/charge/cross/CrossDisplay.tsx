import * as React from 'react';
import { Dimension } from '../../../../model/dimension';
import { Tincture } from '../../../../model/tincture';
import { Cross } from '../../../../model/charge';
import { cannotHappen } from '../../../../../utils/cannot-happen';
import { getChargePositions } from '../charge.helper';
import { CrossHummetty } from './CrossHummetty';
import { CrossPotent } from './CrossPotent';
import { CrossPatty } from './CrossPatty';
import { CrossCercelee } from './CrossCercelee';
import { CrossMoline } from './CrossMoline';
import { CrossBottony } from './CrossBottony';
import { CrossCrosselet } from './CrossCrosselet';
import { CrossMaltese } from './CrossMaltese';

type Props = { charge: Cross; dimension: Dimension; fillFromTincture: (tincture: Tincture) => string };
export const CrossDisplay = ({ charge, dimension: { width, height }, fillFromTincture }: Props) => {
  const stroke = charge.tincture.name === 'sable' ? '#777' : '#000';
  const fill = fillFromTincture(charge.tincture);

  const { count, disposition } = charge.countAndDisposition;
  const { cellWidth, cellHeight, positions } = getChargePositions(count, disposition);

  const radius = Math.min(width * cellWidth * 0.9, height * cellHeight * 0.45);
  const crossWidth = radius / 10;

  return (
    <>
      {positions.map(([cx, cy], i) => {
        const center = [cx * width, cy * height] as const;
        if (charge.limbs === 'hummetty') {
          return (
            <CrossHummetty
              key={i}
              fill={fill}
              stroke={stroke}
              center={center}
              crossWidth={crossWidth}
              crossRadius={radius}
            />
          );
        } else if (charge.limbs === 'bottony') {
          return (
            <CrossBottony
              key={i}
              fill={fill}
              stroke={stroke}
              center={center}
              crossWidth={crossWidth}
              crossRadius={radius}
            />
          );
        } else if (charge.limbs === 'cercelée') {
          return (
            <CrossCercelee
              key={i}
              fill={fill}
              stroke={stroke}
              center={center}
              crossWidth={crossWidth}
              crossRadius={radius * 0.85}
            />
          );
        } else if (charge.limbs === 'moline') {
          return (
            <CrossMoline
              key={i}
              fill={fill}
              stroke={stroke}
              center={center}
              crossWidth={crossWidth}
              crossRadius={radius * 0.85}
            />
          );
        } else if (charge.limbs === 'potent') {
          return (
            <CrossPotent
              key={i}
              fill={fill}
              stroke={stroke}
              center={center}
              crossWidth={crossWidth}
              crossRadius={radius}
            />
          );
        } else if (charge.limbs === 'pattée') {
          return (
            <CrossPatty
              key={i}
              fill={fill}
              stroke={stroke}
              center={center}
              crossWidth={crossWidth}
              crossRadius={radius}
            />
          );
        } else if (charge.limbs === 'crosselet') {
          return (
            <CrossCrosselet
              key={i}
              fill={fill}
              stroke={stroke}
              center={center}
              crossWidth={crossWidth * 0.7}
              crossRadius={radius}
            />
          );
        } else if (charge.limbs === 'maltese') {
          return (
            <CrossMaltese
              key={i}
              fill={fill}
              stroke={stroke}
              center={center}
              crossWidth={crossWidth * 0.7}
              crossRadius={radius}
            />
          );
        } else {
          return cannotHappen(charge.limbs);
        }
      })}
    </>
  );
};
