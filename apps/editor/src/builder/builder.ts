import type { FormBuilderConfig } from "@mfb/core";

import { FormBuilder } from "@mfb/core";
import { FormField, getInputComponents } from "@mfb/plugin-mui";
import { createElement } from "react";

import { MfbButton } from "./config/button";
import { MfbSidebarStepper } from "./config/card/group";
import { DraggableGridContainer, DraggableGridItem } from "./config/layout";

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
    defaultValues: {
      checkbox: false,
      radio: "",
      text: "",
    },
  },
  layout: {
    field: FormField,
    "grid-container": DraggableGridContainer,
    "grid-item": DraggableGridItem,
  },
} satisfies FormBuilderConfig;

type MuiConfig = typeof config;

const MuiFB = new FormBuilder<MuiConfig, FormId>(config);

export { config, MuiFB };
export type { MuiConfig };
