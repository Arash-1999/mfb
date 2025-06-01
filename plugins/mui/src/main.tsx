import type { FormBuilderConfig, Header } from "@mfb/core";
import type { JSX } from "react";

// import { FormBuilder } from '@mfb/core';
import type { LayoutReturn } from "./components/layout";

import { FormField, GridContainer, GridItem } from "./components/layout";

interface MuiConfig extends FormBuilderConfig {
  card: {
    simple: {
      paper: (props: {
        disabled?: boolean;
        header: Header | string;
      }) => JSX.Element;
    };
  };
  input: {
    components: {
      text: () => JSX.Element;
    };
    defaultValues: { text: string };
  };
  layout: LayoutReturn;
}
const config: MuiConfig = {
  card: {
    simple: {
      paper: () => <></>,
    },
  },
  input: {
    components: { text: () => <></> },
    defaultValues: { text: "" },
  },
  layout: {
    field: FormField,
    "grid-container": GridContainer,
    "grid-item": GridItem,
  },
};

// const FB = new FormBuilder<MuiConfig, "form-1">(config);

const getConfig = () => {
  return config;
};
export { getConfig };
