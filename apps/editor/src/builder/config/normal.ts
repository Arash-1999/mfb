import type { FormBuilderConfig } from "@mfb/core";

import { getInputComponents, getLayoutConfig } from "@mfb/plugin-mui";
import { createElement } from "react";

import { MfbButton } from "./button";
import { MfbSidebarStepper } from "./card/group";


const normalConfig = {
  button: {
    component: MfbButton,
  },
  card: {
    group: {
      "sidebar-stepper": MfbSidebarStepper,
    },
    simple: {},
  },
  input: {
    components: {
      ...getInputComponents(),
      fuck: (props: { fuck: string }) => createElement("div", props),
    },
    defaultValues: {
      checkbox: false,
      radio: "",
      text: "",
    },
  },
  layout: getLayoutConfig(),
} satisfies FormBuilderConfig;

type NormalMuiConfig = typeof normalConfig;

export { normalConfig };
export type { NormalMuiConfig, };
