import type { FormBuilderConfig } from "@mfb/core";

// import { FormBuilder } from "@mfb/core";
import {
  MfbCheckbox,
  MfbRadioGroup,
  MfbRating,
  MfbSelect,
  MfbSlider,
  MfbSwitch,
  MfbTextField,
} from "./components/inputs";
import { getLayoutConfig } from "./components/layout";

const config = {
  card: {
    simple: {
      paper: () => <></>,
    },
  },
  input: {
    components: {
      checkbox: MfbCheckbox,
      radio: MfbRadioGroup,
      rating: MfbRating,
      select: MfbSelect,
      slider: MfbSlider,
      switch: MfbSwitch,
      text: MfbTextField,
    },
    defaultValues: { text: "" },
  },
  layout: getLayoutConfig(),
} satisfies FormBuilderConfig;

type MuiConfig = typeof config;

const getConfig = () => {
  return config;
};

export { getConfig };
export type { MuiConfig };
