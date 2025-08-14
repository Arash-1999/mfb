import type { ReactNode } from "react";

import { RadioForm } from "@/builder/components/input/radio";
import { RatingForm } from "@/builder/components/input/rating";
import { MuiConfig } from "@mfb/plugin-mui";
import { Input } from "@mui/icons-material";
import { BuilderMode } from "@/types/builder";
import { CheckboxForm } from "@/builder/components/input/checkbox";
import { SelectForm } from "@/builder/components/input/select";
import { SliderForm } from "@/builder/components/input/slider";
import { SwitchForm } from "@/builder/components/input/switch";
import { TextFieldsForm } from "@/builder/components/input/text-field";

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
  "list-group-card": CategoryChild<string>;
  "normal-group-card": CategoryChild<string>;
  "simple-card": CategoryChild<string>;
}

interface CategoryItem {
  icon: ReactNode;
  key: Category;
}

type InputKey = keyof MuiConfig["input"]["components"];

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
    options: [{ name: "accordion" }, { name: "paper" }],
    render: () => <></>,
  },
  "normal-group-card": {
    options: [],
    render: () => <></>,
  },
  "simple-card": {
    options: [],
    render: () => <></>,
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
    case "Advanced": {
      return categoryDict;
    }
    case "Basic": {
      return getInputCategories(categoryDict);
    }
    case "Normal": {
      if (path === "") {
        return getCardCategories(categoryDict);
      } else {
        return getInputCategories(categoryDict);
      }
    }
  }
};

export { categories, categoryDict, renderInputForm, getCategoriesByMode };

export type { Category, CategoryDict };
