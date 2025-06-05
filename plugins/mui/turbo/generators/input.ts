import type { PlopTypes } from "@turbo/gen";

const NAME = "input";
const CONFIG: PlopTypes.PlopGeneratorConfig = {
  actions: [
    {
      path: "src/components/inputs/{{kebabCase name}}/index.ts",
      templateFile: "templates/input/index.hbs",
      type: "add",
    },
    {
      path: "src/components/inputs/{{kebabCase name}}/component.tsx",
      templateFile: "templates/input/component.hbs",
      type: "add",
    },
    {
      path: "src/components/inputs/{{kebabCase name}}/type.ts",
      templateFile: "templates/input/type.hbs",
      type: "add",
    },
  ],
  description: "",
  prompts: [
    {
      message: "What is the name of the component?",
      name: "name",
      type: "input",
    },
  ],
};

const inputGen: Parameters<PlopTypes.NodePlopAPI["setGenerator"]> = [
  NAME,
  CONFIG,
];

export { inputGen };
