import type { FormBuilderConfig } from "@mfb/core";

import { MfbAccordion, MfbAccordionGroup, MfbPaper } from "./components/cards";
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
  button: {
    // TODO: use button in playground
    component: () => <></>,
  },
  card: {
    group: {
      "accordion-group": MfbAccordionGroup,
    },
    simple: {
      accordion: MfbAccordion,
      paper: MfbPaper,
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

const getGroupCards = () => ({
  "accordion-group": MfbAccordionGroup,
});

const getInputComponents = () => ({
  checkbox: MfbCheckbox,
  radio: MfbRadioGroup,
  rating: MfbRating,
  select: MfbSelect,
  slider: MfbSlider,
  switch: MfbSwitch,
  text: MfbTextField,
});

const getSimpleCards = () => ({
  accordion: MfbAccordion,
  paper: MfbPaper,
});

export {
  getConfig,
  getGroupCards,
  getInputComponents,
  getLayoutConfig,
  getSimpleCards,
};
export type { MuiConfig };
