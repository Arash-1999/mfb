import type { FormBuilderConfig } from "@mfb/core";

import { FormBuilder } from "@mfb/core";
import { getInputComponents, getLayoutConfig } from "@mfb/plugin-mui";
import { createElement } from "react";

import { MfbSidebarStepper } from "./config/card/group";

type FormId = `form-${number}`;

const config = {
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
// const config = getConfig() satisfies FormBuilderConfig;

const fuck = config.input.components.fuck;
type MuiConfig = typeof config;

const MuiFB = new FormBuilder<MuiConfig, FormId>(config);

export { MuiFB };
export type { MuiConfig };
