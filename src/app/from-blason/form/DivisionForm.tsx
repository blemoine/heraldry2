import * as React from 'react';
import { availableDivisions, Blason } from '../../model/blason';
import { SelectScalar } from '../../common/SelectScalar';
import { cannotHappen } from '../../../utils/cannot-happen';
type Props = { blason: Blason; blasonChange: (blason: Blason) => void };
export const DivisionForm = function DivisionForm({ blason, blasonChange }: Props) {
  function changeBlasonKind(kind: Blason['kind']) {
    if (blason.kind === 'simple') {
      if (kind === 'quarterly') {
        blasonChange({ kind, blasons: [blason, blason, blason, blason] });
      } else if (blason.kind !== kind) {
        cannotHappen(kind);
      }
    } else if (blason.kind === 'quarterly') {
      if (kind === 'simple') {
        blasonChange(blason.blasons[0]);
      } else if (blason.kind !== kind) {
        cannotHappen(kind);
      }
    } else {
      cannotHappen(blason);
    }
  }
  return (
    <div className="form-group field-division-select">
      <label>Division of the field</label>
      <SelectScalar options={availableDivisions} value={blason.kind} valueChange={changeBlasonKind} />
    </div>
  );
};
