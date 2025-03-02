import { GroupCardComponentProps } from "@mfb/core";
import { ExpandMoreOutlined } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Paper,
    Tab,
    Tabs,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import CardHeader from "./header";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const TabsGroup = ({ nodes }: GroupCardComponentProps) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //   const active = useMemo(() => {
  //     return nodes[value].children;
  //   }, [value, nodes]);

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        {nodes.map((node, index) => {
          const title =
            typeof node.title === "string" ? node.title : node.title.left;
          return (
            <Tab
              label={title}
              key={`tab-item-${index}`}
              {...a11yProps(index)}
            />
          );
        })}
      </Tabs>

      <Paper sx={{ p: 2, mt: 2 }}>{nodes[value].children}</Paper>
    </>
  );
};

const AccordionGroup = ({ nodes, addGrid }: GroupCardComponentProps) => {
  const [active, setActive] = useState<number>(-1);

  const handleChange = (index: number) => () => {
    setActive((s) => (s === index ? -1 : index));
  };

  return (
    <Fragment>
      {nodes
        .map((node, index) => (
          <Accordion
            key={`accordion-item-${index}`}
            expanded={active === index}
            onChange={handleChange(index)}
          >
            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
              <CardHeader header={node.title} />
            </AccordionSummary>
            <AccordionDetails>{node.children}</AccordionDetails>
          </Accordion>
        ))
        .map(addGrid)}
    </Fragment>
  );
};

export { AccordionGroup, TabsGroup };
