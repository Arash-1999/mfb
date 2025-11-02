import type { FormBuilderConfig } from "@mfb/core";

import {
  FormField,
  getInputComponents,
  getConfig,
  getGroupCards,
} from "@mfb/plugin-mui";
import { getSimpleCards } from "@mfb/plugin-mui";
import { createElement } from "react";

import { MfbButton } from "./button";
import { MfbSidebarStepper } from "./card/group";
import { DraggableGridContainer, GridItemEdit } from "./layout";

const editableConfig = {
  button: {
    component: MfbButton,
  },
  card: {
    group: {
      ...getGroupCards(),
    },
    simple: {
      ...getSimpleCards(),
    },
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
      slider: "",
    },
  },
  layout: {
    field: FormField,
    "grid-container": DraggableGridContainer,
    "grid-item": GridItemEdit,
  },
} satisfies FormBuilderConfig;

type EditableMuiConfig = typeof editableConfig;

export { editableConfig };
export type { EditableMuiConfig };
