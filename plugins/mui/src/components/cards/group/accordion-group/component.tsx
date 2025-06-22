import type { GroupCardProps } from "@mfb/core";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Fragment, useLayoutEffect, useState } from "react";

import type { MfbAccordionGroupProps } from "./type";

import CardHeader from "../../header";

const MfbAccordionGroup = ({
  accordionDetailsProps,
  accordionProps,
  accordionSummaryProps,
  addGrid,
  disabled,
  nodes,
}: GroupCardProps<MfbAccordionGroupProps>) => {
  const [active, setActive] = useState<number>(-1);

  const handleChange = (index: number) => () => {
    setActive(index);
  };

  useLayoutEffect(() => {
    setActive((s) => {
      if (s > nodes.length - 1) return -1;
      return s;
    });
  }, [nodes.length]);

  return (
    <Fragment>
      {nodes
        .map((node, index) => (
          <Accordion
            {...accordionProps}
            disabled={disabled}
            expanded={active === index}
            key={`accordion-item-${index}`}
            onChange={handleChange(index)}
          >
            <AccordionSummary
              {...accordionSummaryProps}
              // expandIcon={<ExpandMoreOutlined />}
            >
              <CardHeader header={node.title} />
            </AccordionSummary>
            <AccordionDetails {...accordionDetailsProps}>
              {node.children}
            </AccordionDetails>
          </Accordion>
        ))
        .map(addGrid)}
    </Fragment>
  );
};

export { MfbAccordionGroup };
