import type { ReactNode } from "react";

import { RadioForm } from "@/builder/components/input/radio";
import { RatingForm } from "@/builder/components/input/rating";
import { MuiConfig } from "@mfb/plugin-mui";
import { Input } from "@mui/icons-material";
import { BUILDER_MODE, BuilderMode } from "@/types/builder";
//change it the @/builder/components
import { CheckboxForm } from "@/builder/components/input/checkbox";
import { SelectForm } from "@/builder/components/input/select";
import { SliderForm } from "@/builder/components/input/slider";
import { SwitchForm } from "@/builder/components/input/switch";
import { TextFieldsForm } from "@/builder/components/input/text-field";
import { PaperForm } from "@/builder/components/cards/simple/paper";
import { AccordionForm } from "@/builder/components/cards/simple/accordion";

type Category =
  | ""
  | "input"
  | "list-group-card"
  | "normal-group-card"
  | "simple-card";

interface CategoryChild<TKey extends string> {
  options: Array<{ name: TKey }>;
  render: (type: TKey) => ReactNode;
}

interface CategoryDict {
  input: CategoryChild<InputKey>;
  "list-group-card": CategoryChild<ListGroupCardKey>;
  "normal-group-card": CategoryChild<NormalGroupCardKey>;
  "simple-card": CategoryChild<SimpleCardKey>;
}

interface CategoryItem {
  icon: ReactNode;
  key: Category;
}

type InputKey = keyof MuiConfig["input"]["components"];
type ListGroupCardKey = keyof MuiConfig["card"]["group"];
type NormalGroupCardKey = keyof MuiConfig["card"]["group"];
type SimpleCardKey = keyof MuiConfig["card"]["simple"];
const categories: Array<CategoryItem> = [
  { icon: <Input />, key: "input" },
  { icon: <Input />, key: "simple-card" },
  { icon: <Input />, key: "normal-group-card" },
  { icon: <Input />, key: "list-group-card" },
];

const renderInputForm = (type: InputKey) => {
  switch (type) {
    case "checkbox":
      return <CheckboxForm />;
    case "radio":
      return <RadioForm />;
    case "rating":
      return <RatingForm />;
    case "select":
      return <SelectForm />;
    case "slider":
      return <SliderForm />;
    case "switch":
      return <SwitchForm />;
    case "text":
      return <TextFieldsForm />;
  }
};

const renderListGroupCardForm = (type: NormalGroupCardKey) => {
  switch (type) {
    case "accordion-group":
      return <AccordionForm />;
  }
};
const renderSimpleCardForm = (type: SimpleCardKey) => {
  switch (type) {
    case "accordion":
      return <AccordionForm />;
    case "paper":
      return <PaperForm />;
  }
};
const categoryDict: CategoryDict = {
  input: {
    options: [
      { name: "checkbox" },
      { name: "radio" },
      { name: "rating" },
      { name: "select" },
      { name: "slider" },
      { name: "switch" },
      { name: "text" },
    ],
    render: renderInputForm,
  },
  "list-group-card": {
    options: [{ name: "accordion-group" }],
    render: renderListGroupCardForm,
  },
  "normal-group-card": {
    options: [{ name: "accordion-group" }],
    render: renderListGroupCardForm,
  },
  "simple-card": {
    options: [{ name: "accordion" }, { name: "paper" }],
    render: renderSimpleCardForm,
  },
};

const getCardCategories = ({
  "list-group-card": listGroupCard,
  "normal-group-card": normalGroupCard,
  "simple-card": simpleCard,
}: CategoryDict) => ({
  "list-group-card": listGroupCard,
  "normal-group-card": normalGroupCard,
  "simple-card": simpleCard,
});

const getInputCategories = ({ input }: CategoryDict) => ({
  input,
});

const getCategoriesByMode = (mode: BuilderMode, path: string) => {
  switch (mode) {
    case BUILDER_MODE.ADVANCED: {
      return categoryDict;
    }
    case BUILDER_MODE.BASIC: {
      return getInputCategories(categoryDict);
    }
    case BUILDER_MODE.NORMAL: {
      if (path === "") {
        return getCardCategories(categoryDict);
      } else {
        return getInputCategories(categoryDict);
      }
    }
  }
};

export {
  categories,
  categoryDict,
  renderInputForm,
  getCategoriesByMode,
  renderSimpleCardForm,
};

export type { Category, CategoryDict };
