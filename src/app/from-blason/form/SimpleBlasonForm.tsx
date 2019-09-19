import { FieldForm } from './FieldForm';
import { OrdinaryForm } from './OrdinaryForm';
import { ChargeForm } from './ChargeForm';
import * as React from 'react';
import { SimpleBlason } from '../../model/blason';
import { Field } from '../../model/field';
import { Ordinary } from '../../model/ordinary';
import { Charge } from '../../model/charge';
import { TinctureConfiguration } from '../../model/tincture-configuration';
import { useCallback } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { SimpleBlasonPath } from '../../model/blason-path';

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  blason: SimpleBlason;
  blasonChange: (blason: SimpleBlason) => void;
  blasonPath: SimpleBlasonPath | null;
  setBlasonPath: (path: SimpleBlasonPath | null) => void;
};
export function SimpleBlasonForm({ tinctureConfiguration, blason, blasonChange, blasonPath, setBlasonPath }: Props) {
  const fieldChange = useCallback(
    function fieldChange(field: Field) {
      blasonChange({ ...blason, field });
    },
    [blason, blasonChange]
  );

  const ordinaryChange = useCallback(
    function ordinaryChange(ordinary: Ordinary | null) {
      if (ordinary) {
        blasonChange({ ...blason, ordinary });
      } else {
        const newBlason = { ...blason };
        delete newBlason.ordinary;
        blasonChange(newBlason);
      }
    },
    [blason, blasonChange]
  );

  const chargeChange = useCallback(
    function(charge: Charge | null) {
      if (charge) {
        blasonChange({ ...blason, charge });
      } else {
        const newBlason = { ...blason };
        delete newBlason.charge;
        blasonChange(newBlason);
      }
    },
    [blason, blasonChange]
  );

  return (
    <Accordion activeKey={blasonPath || undefined}>
      <Card>
        <Card.Header onClick={() => setBlasonPath('field')}>Field</Card.Header>
        <Accordion.Collapse eventKey="field">
          <Card.Body>
            <FieldForm tinctureConfiguration={tinctureConfiguration} field={blason.field} fieldChange={fieldChange} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header onClick={() => setBlasonPath('ordinary')}>Ordinary</Card.Header>
        <Accordion.Collapse eventKey="ordinary">
          <Card.Body>
            <OrdinaryForm
              tinctureConfiguration={tinctureConfiguration}
              ordinary={blason.ordinary || null}
              ordinaryChange={ordinaryChange}
            />
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header onClick={() => setBlasonPath('charge')}>Charge</Card.Header>
        <Accordion.Collapse eventKey="charge">
          <Card.Body>
            <ChargeForm
              tinctureConfiguration={tinctureConfiguration}
              charge={blason.charge || null}
              chargeChange={chargeChange}
            />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
