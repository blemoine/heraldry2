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

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  blason: SimpleBlason;
  blasonChange: (blason: SimpleBlason) => void;
};
export function SimpleBlasonForm({ tinctureConfiguration, blason, blasonChange }: Props) {
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
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
          Field
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <FieldForm tinctureConfiguration={tinctureConfiguration} field={blason.field} fieldChange={fieldChange} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
          Ordinary
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
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
        <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
          Charge
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="2">
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
