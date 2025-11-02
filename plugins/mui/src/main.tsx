import type { FormBuilderConfig } from "@mfb/core";

import { MfbAccordion, MfbAccordionGroup, MfbPaper } from "./components/cards";
import { MfbCheckbox } from "./components/inputs/checkbox";
import { MfbRadioGroup } from "./components/inputs/radio";
import { MfbRating } from "./components/inputs/rating";
import { MfbSelect } from "./components/inputs/select";
import { MfbSlider } from "./components/inputs/slider";
import { MfbSwitch } from "./components/inputs/switch";
import { MfbTextField } from "./components/inputs/text-field";
import {
  FormField,
  getLayoutConfig,
  GridContainer,
  GridItem,
} from "./components/layout";

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
  FormField,
  getConfig,
  getGroupCards,
  getInputComponents,
  getLayoutConfig,
  getSimpleCards,
  GridContainer,
  GridItem,
};
export type { MuiConfig };
