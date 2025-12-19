import type { MuiConfig } from "@/builder/builder";
import type { GetInputsImpl } from "@mfb/core";

import type { AccordionOptionsForm } from "./type";

const accordionOptions: Array<GetInputsImpl<MuiConfig, AccordionOptionsForm>> =
  [
    {
      gridProps: { size: 12 },
      name: "defaultExpanded",
      props: {
        defaultValue: false,
        label: "defaultExpanded",
      },
      type: "checkbox",
    },
    {
      gridProps: { size: 12 },
      name: "square",
      props: {
        defaultValue: false,
        label: "square",
      },
      type: "checkbox",
    },
    {
      gridProps: { size: 12 },
      name: "disableGutters",
      props: {
        defaultValue: false,
        label: "disableGutters",
      },
      type: "checkbox",
    },
  ];

export { accordionOptions };
