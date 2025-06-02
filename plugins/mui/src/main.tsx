import type { FormBuilderConfig, Header } from "@mfb/core";
import type { JSX } from "react";

// import { FormBuilder } from '@mfb/core';
import type { MfbCheckboxProps } from "./components/inputs/checkbox";
import type { MfbRadioGroupProps } from "./components/inputs/radio";
import type { MfbTextFieldProps } from "./components/inputs/text-field";
import type { LayoutReturn } from "./components/layout";

import { getInputsConfig } from "./components/inputs";
import { getLayoutConfig } from "./components/layout";

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
      checkbox: (props: Prettify<MfbCheckboxProps>) => JSX.Element;
      radio: (props: Prettify<MfbRadioGroupProps>) => JSX.Element;
      text: (props: Prettify<MfbTextFieldProps>) => JSX.Element;
    };
    defaultValues: { text: string };
  };
  layout: LayoutReturn;
}

type Prettify<T> = {
  [Key in keyof T]: T[Key];
} & {};
const config: MuiConfig = {
  card: {
    simple: {
      paper: () => <></>,
    },
  },
  input: {
    components: getInputsConfig(),
    defaultValues: { text: "" },
  },
  layout: getLayoutConfig(),
};

// const FB = new FormBuilder<MuiConfig, "form-1">(config);

const getConfig = () => {
  return config;
};
export { getConfig };
