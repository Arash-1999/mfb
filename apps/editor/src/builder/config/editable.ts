import type { FormBuilderConfig } from "@mfb/core";

import { FormField, getInputComponents } from "@mfb/plugin-mui";
import { createElement } from "react";

import { MfbButton } from "./button";
import { MfbSidebarStepper } from "./card/group";
import { DraggableGridContainer, DraggableGridItem } from "./layout";

const editableConfig = {
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

type EditableMuiConfig = typeof editableConfig;

export { editableConfig };
export type { EditableMuiConfig, };
