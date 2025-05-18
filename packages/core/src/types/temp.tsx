import type { FieldValues } from "react-hook-form";

import type { FormBuilderConfig } from "./config";
import type { GetInputsImpl } from "./input";

type Item<TConfig extends FormBuilderConfig, TFields extends FieldValues> =
  | ((props?: { deps: never }) => GetInputsImpl<TConfig, TFields, false, true>)
  | GetInputsImpl<TConfig, TFields>;

type List<TConfig extends FormBuilderConfig, TFields extends FieldValues> =
  | ((api: {
      define: <TDeps extends FieldValues>(
        func: (props?: {
          deps: TDeps;
        }) => GetInputsImpl<TConfig, TFields, false, true>
      ) => (props?: {
        deps: TDeps;
      }) => GetInputsImpl<TConfig, TFields, false, true>;
    }) => Array<Item<TConfig, TFields>>)
  | Array<Item<TConfig, TFields>>;

const config = {
  card: {
    simple: {
      paper: () => <></>,
    },
  },
  input: {
    components: {
      text: ({ label }: { label?: string }) => <>{label}</>,
    },
    defaultValues: {
      text: "",
    },
  },
  layout: {
    field: () => <></>,
    "grid-container": () => <></>,
    "grid-item": () => <></>,
  },
} satisfies FormBuilderConfig;

console.log(config);
type Config = typeof config;

type TestForm = {
  a: string;
  b: number;
  c: {
    a: string;
    b: number;
  };
};
const list_1: List<Config, TestForm> = [
  {
    name: "test-1",
    props: {},
    type: "text",
  },
];

const list_2: List<Config, TestForm> = (api) => [
  {
    name: "test-1",
    props: {},
    type: "text",
  },
  api.define<{ is_multiple: boolean }>((props) => ({
    dependsOn: [],
    name: "test-2",
    props: {
      label: props?.deps.is_multiple ? "Multiple" : "Single",
    },
    type: "text",
  })),
  api.define<{ label: string }>((props) => ({
    dependsOn: [],
    name: "test-2",
    props: {
      label: props?.deps.label ? "Multiple" : "Single",
    },
    type: "text",
  })),
];

const resolve = (list: List<Config, TestForm>) => {
  if (typeof list === "function") {
    return list({
      define: <TDeps extends FieldValues>(
        func: (props?: {
          deps: TDeps;
        }) => GetInputsImpl<Config, TestForm, false, true>
      ) => func,
    });
  } else {
    return list;
  }
};
const main = (list: List<Config, TestForm>) => {
  const resolvedList = resolve(list);

  resolvedList.forEach((item) => {
    if (typeof item === "function") {
      const resolvedItem = item({
        deps: {
          is_multiple: Math.random() < 0.6,
        } as never,
      });
      console.log("function: ", resolvedItem);
    } else {
      console.log("object: ", item);
    }
  });
};

main(list_1);
main(list_2);
