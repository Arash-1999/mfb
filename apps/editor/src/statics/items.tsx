import type { ReactNode } from "react";

import { RadioForm } from "@/builder/components/input/radio";
import { MuiConfig } from "@mfb/plugin-mui";
import { Input } from "@mui/icons-material";

type Category = '' | 'input' | 'list-group-card' | 'normal-group-card' | 'simple-card';

interface CategoryChild<TKey extends string> {
  options: Array<{ name: TKey; }>;
  render: (type: TKey) => ReactNode;
};

interface CategoryDict {
  input: CategoryChild<InputKey>;
  'list-group-card': CategoryChild<string>;
  'normal-group-card': CategoryChild<string>;
  'simple-card': CategoryChild<string>;
}

interface CategoryItem {
  icon: ReactNode;
  key: Category;
}

type InputKey = keyof MuiConfig['input']['components'];

const categories: Array<CategoryItem> = [
  { icon: <Input />, key: 'input' },
  { icon: <Input />, key: 'simple-card' },
  { icon: <Input />, key: 'normal-group-card' },
  { icon: <Input />, key: 'list-group-card' },
];

const renderInputForm = (type: InputKey) => {
  switch (type) {
    case "checkbox":
      return <></>
    case "radio":
      return <RadioForm />;
    case "rating":
      return <></>;
    case "select":
      return <></>;
    case "slider":
      return <></>;
    case "switch":
      return <></>;
    case "text":
      return <></>;
  }
};

const categoryDict: CategoryDict = {
  input: {
    options: [
      { name: 'checkbox' },
      { name: 'radio' },
      { name: 'rating' },
      { name: 'select' },
      { name: 'slider' },
      { name: 'switch' },
      { name: 'text' },
    ], render: renderInputForm,
  },
  "list-group-card": {
    options: [
      { name: 'accordion' },
      { name: 'paper' },
    ],
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

export {
  categories,
  categoryDict,
  renderInputForm,
};

export type { Category, CategoryDict } 
