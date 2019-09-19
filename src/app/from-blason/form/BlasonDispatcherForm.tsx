import * as React from 'react';
import { TinctureConfiguration } from '../../model/tincture-configuration';
import { Blason, SimpleBlason } from '../../model/blason';
import { cannotHappen } from '../../../utils/cannot-happen';
import { SimpleBlasonForm } from './SimpleBlasonForm';
import { useCallback } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { BlasonPath } from '../../model/blason-path';

type Props = {
  tinctureConfiguration: TinctureConfiguration;
  blason: Blason;
  blasonChange: (blason: Blason) => void;
  blasonPath: BlasonPath | null;
  setBlasonPath: (path: BlasonPath | null) => void;
};
export const BlasonDispatcherForm = React.memo(function BlasonForm({
  blason,
  blasonChange,
  tinctureConfiguration,
  blasonPath,
  setBlasonPath,
}: Props) {
  if (blason.kind === 'simple') {
    return (
      <SimpleBlasonForm
        tinctureConfiguration={tinctureConfiguration}
        blason={blason}
        blasonChange={blasonChange}
        blasonPath={Array.isArray(blasonPath) ? null : blasonPath}
        setBlasonPath={setBlasonPath}
      />
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
        <Accordion activeKey={Array.isArray(blasonPath) ? blasonPath[0].toString() : undefined}>
          <Card>
            <Card.Header onClick={() => setBlasonPath([0, null])}>Quarter 1</Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="top-card-body">
                <SimpleBlasonForm
                  tinctureConfiguration={tinctureConfiguration}
                  blason={blason.blasons[0]}
                  blasonChange={quarterlyBlasonChange(0)}
                  blasonPath={Array.isArray(blasonPath) && blasonPath[0] === 0 ? blasonPath[1] : null}
                  setBlasonPath={(path) => (path ? setBlasonPath([0, path]) : setBlasonPath(null))}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header onClick={() => setBlasonPath([1, null])}>Quarter 2</Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body className="top-card-body">
                <SimpleBlasonForm
                  tinctureConfiguration={tinctureConfiguration}
                  blason={blason.blasons[1]}
                  blasonChange={quarterlyBlasonChange(1)}
                  blasonPath={Array.isArray(blasonPath) && blasonPath[0] === 1 ? blasonPath[1] : null}
                  setBlasonPath={(path) => (path ? setBlasonPath([1, path]) : setBlasonPath(null))}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header onClick={() => setBlasonPath([2, null])}>Quarter 3</Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body className="top-card-body">
                <SimpleBlasonForm
                  tinctureConfiguration={tinctureConfiguration}
                  blason={blason.blasons[2]}
                  blasonChange={quarterlyBlasonChange(2)}
                  blasonPath={Array.isArray(blasonPath) && blasonPath[0] === 2 ? blasonPath[1] : null}
                  setBlasonPath={(path) => (path ? setBlasonPath([2, path]) : setBlasonPath(null))}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header onClick={() => setBlasonPath([3, null])}>Quarter 4</Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body className="top-card-body">
                <SimpleBlasonForm
                  tinctureConfiguration={tinctureConfiguration}
                  blason={blason.blasons[3]}
                  blasonChange={quarterlyBlasonChange(3)}
                  blasonPath={Array.isArray(blasonPath) && blasonPath[0] === 3 ? blasonPath[1] : null}
                  setBlasonPath={(path) => (path ? setBlasonPath([3, path]) : setBlasonPath(null))}
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
