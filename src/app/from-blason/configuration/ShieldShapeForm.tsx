import * as React from 'react';
import { ShieldShape, shieldShapes } from '../../model/configuration';
import { EscutcheonDisplay } from '../coats-of-arms-parts/escutcheon/EscutcheonDisplay';

const dimension = { width: 40, height: 56 };

type Props = { shieldShape: ShieldShape; shieldShapeChange: (shieldShape: ShieldShape) => void };
export const ShieldShapeForm = ({ shieldShape, shieldShapeChange }: Props) => {
  return (
    <div style={{ display: 'flex' }}>
      {shieldShapes.map((shape) => {
        return (
          <div
            key={shape}
            style={{
              padding: '10px 20px',
              margin: '5px',
              textAlign: 'center',
              cursor: 'pointer',
              minWidth: dimension.width * 3,
              border: shape === shieldShape ? '3px solid rgb(0, 123, 255)' : '1px solid #333',
            }}
            onClick={() => shieldShapeChange(shape)}
          >
            <div>
              <svg width={dimension.width} height={dimension.height}>
                <EscutcheonDisplay dimension={dimension} shieldShape={shape} />
              </svg>
            </div>
            <span>{shape}</span>
          </div>
        );
      })}
    </div>
  );
};
