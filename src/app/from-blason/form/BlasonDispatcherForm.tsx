import * as React from 'react';
import { TinctureConfiguration } from '../../model/tincture-configuration';
import { Blason, SimpleBlason } from '../../model/blason';
import { cannotHappen } from '../../../utils/cannot-happen';
import { SimpleBlasonForm } from './SimpleBlasonForm';
import { useCallback } from 'react';
import { Accordion, Card } from 'react-bootstrap';

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  blason: Blason;
  blasonChange: (blason: Blason) => void;
};
export const BlasonDispatcherForm = React.memo(function BlasonForm({
  blason,
  blasonChange,
  tinctureConfiguration,
}: Props) {
  if (blason.kind === 'simple') {
    return (
      <SimpleBlasonForm tinctureConfiguration={tinctureConfiguration} blason={blason} blasonChange={blasonChange} />
    );
  } else if (blason.kind === 'quarterly') {
    const quarterlyBlasonChange = useCallback(
      (i: 0 | 1 | 2 | 3) => (newBlason: SimpleBlason) => {
        const blasons = [
          i === 0 ? newBlason : blason.blasons[0],
          i === 1 ? newBlason : blason.blasons[1],
          i === 2 ? newBlason : blason.blasons[2],
          i === 3 ? newBlason : blason.blasons[3],
        ] as const;

        blasonChange({
          ...blason,
          blasons,
        });
      },
      [blasonChange]
    );
    return (
      <div>
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
              Quarter 1
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="top-card-body">
                <SimpleBlasonForm
                  tinctureConfiguration={tinctureConfiguration}
                  blason={blason.blasons[0]}
                  blasonChange={quarterlyBlasonChange(0)}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
              Quarter 2
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body className="top-card-body">
                <SimpleBlasonForm
                  tinctureConfiguration={tinctureConfiguration}
                  blason={blason.blasons[1]}
                  blasonChange={quarterlyBlasonChange(1)}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
              Quarter 3
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body className="top-card-body">
                <SimpleBlasonForm
                  tinctureConfiguration={tinctureConfiguration}
                  blason={blason.blasons[2]}
                  blasonChange={quarterlyBlasonChange(2)}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
              Quarter 4
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body className="top-card-body">
                <SimpleBlasonForm
                  tinctureConfiguration={tinctureConfiguration}
                  blason={blason.blasons[3]}
                  blasonChange={quarterlyBlasonChange(3)}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  } else {
    return cannotHappen(blason);
  }
});
