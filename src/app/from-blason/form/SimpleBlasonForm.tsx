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
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

const wrapperStyle = { border: '1px solid #CCC' /*, padding: '5px'  */ };

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
    <div style={wrapperStyle}>
      <Accordion allowMultipleExpanded={true} allowZeroExpanded={true}>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Field</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <FieldForm tinctureConfiguration={tinctureConfiguration} field={blason.field} fieldChange={fieldChange} />
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Ordinary</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <OrdinaryForm
              tinctureConfiguration={tinctureConfiguration}
              ordinary={blason.ordinary || null}
              ordinaryChange={ordinaryChange}
            />
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Charge</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <ChargeForm
              tinctureConfiguration={tinctureConfiguration}
              charge={blason.charge || null}
              chargeChange={chargeChange}
            />
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
