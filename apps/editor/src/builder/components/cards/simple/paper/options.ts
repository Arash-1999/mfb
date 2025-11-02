import type { MuiConfig } from "@/builder/builder";
import type { GetInputsImpl } from "@mfb/core";

import type { PaperOptionsForm } from "./type";

const paperOptions: Array<GetInputsImpl<MuiConfig, PaperOptionsForm>> = [
  {
    gridProps: { size: 12 },
    name: "variant",
    props: {
      defaultValue: "elevation",
      options: ["elevation", "outlined"],
    },
    type: "radio",
  },
  {
    gridProps: { size: 12 },
    name: "elevation",
    props: {
      defaultValue: "1",
    },
    type: "text",
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
];

export { paperOptions };
