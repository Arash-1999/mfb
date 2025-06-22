import type { SimpleCardProps } from "@mfb/core";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import type { MfbAccordionProps } from "./type";

import CardHeader from "../../header";

const MfbAccordion = ({
  accordionDetailsProps,
  accordionProps,
  accordionSummaryProps,
  children,
  disabled,
  header,
}: SimpleCardProps<MfbAccordionProps>) => {
  return (
    <Accordion {...accordionProps} disabled={disabled}>
      <AccordionSummary
        {...accordionSummaryProps}
        // expandIcon={<ExpandMoreOutlined />}
      >
        <CardHeader header={header} />
      </AccordionSummary>
      <AccordionDetails {...accordionDetailsProps}>{children}</AccordionDetails>
    </Accordion>
  );
};

export { MfbAccordion };
