import type { FormBuilderConfig } from "@mfb/core";

import { FormField, getInputComponents } from "@mfb/plugin-mui";
import { createElement } from "react";

import { MfbButton } from "./button";
import { MfbSidebarStepper } from "./card/group";
import { DraggableGridContainer, GridItemEdit } from "./layout";

const draggableConfig = {
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
    "grid-item": GridItemEdit,
  },
} satisfies FormBuilderConfig;

type DraggableMuiConfig = typeof draggableConfig;

export { draggableConfig };
export type { DraggableMuiConfig };
