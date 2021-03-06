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
import { CrossFlory } from './CrossFlory';
import { SimpleBlasonShape } from '../../blasonDisplay.helper';
import { getStrokeColor } from '../../../blason.helpers';

type Props = {
  charge: Cross;
  dimension: Dimension;
  shape: SimpleBlasonShape;
  fillFromTincture: (tincture: Tincture) => string;
  onClick: () => void;
};
export const CrossDisplay = ({ charge, dimension: { width, height }, fillFromTincture, shape, onClick }: Props) => {
  const stroke = getStrokeColor(charge.tincture);
  const fill = fillFromTincture(charge.tincture);

  const { count, disposition } = charge.countAndDisposition;
  const { cellWidth, cellHeight, positions } = getChargePositions(count, disposition, shape);

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
              onClick={onClick}
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
              onClick={onClick}
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
              onClick={onClick}
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
              onClick={onClick}
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
              onClick={onClick}
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
              onClick={onClick}
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
              onClick={onClick}
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
              onClick={onClick}
            />
          );
        } else if (charge.limbs === 'flory') {
          return (
            <CrossFlory
              key={i}
              fill={fill}
              stroke={stroke}
              center={center}
              crossWidth={crossWidth}
              crossRadius={radius}
              onClick={onClick}
            />
          );
        } else {
          return cannotHappen(charge.limbs);
        }
      })}
    </>
  );
};
