import type { FormBuilderConfig } from "@mfb/core";

import { FormBuilder } from "@mfb/core";
import { getInputComponents, getLayoutConfig } from "@mfb/plugin-mui";
import { createElement } from "react";

import { MfbButton } from "./config/button";
import { MfbSidebarStepper } from "./config/card/group";

type FormId = `form-${number}`;

const config = {
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
    defaultValues: {},
  },
  layout: getLayoutConfig(),
} satisfies FormBuilderConfig;

type MuiConfig = typeof config;

const MuiFB = new FormBuilder<MuiConfig, FormId>(config);

export { MuiFB };
export type { MuiConfig };
