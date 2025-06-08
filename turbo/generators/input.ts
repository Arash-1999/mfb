import type { PlopTypes } from "@turbo/gen";

import { readdirSync } from "fs";

import { directorySelect } from "./core";

const NAME = "input";
const CONFIG: PlopTypes.PlopGeneratorConfig = {
  actions: [
    {
      path: "{{path}}/{{kebabCase name}}/index.ts",
      templateFile: "templates/input/index.hbs",
      type: "add",
    },
    {
      path: "{{path}}/{{kebabCase name}}/component.tsx",
      templateFile: "templates/input/component.hbs",
      type: "add",
    },
    {
      path: "{{path}}/{{kebabCase name}}/type.ts",
      templateFile: "templates/input/type.hbs",
      type: "add",
    },
    // TODO: append new created input to main config
  ],
  description: "",
  prompts: async (inquirer) => {
    const result = { name: "", path: "", plugin: "" };

    result.plugin = await directorySelect({
      basePath: "./plugins",
      message: "Choose Your Plugin: ",
      validate: (plugin: string) => {
        const dir = readdirSync(plugin, { withFileTypes: true });
        return dir.findIndex((dirent) => dirent.name === "package.json") !== -1;
      },
    });

    result.path = await directorySelect({
      basePath: result.plugin,
      default: `${result.plugin}/src/components/inputs`,
      message: "select your inputs directory",
    });

    result.name = await inquirer
      .prompt({
        message: "What is your input name? ",
        name: "name",
        type: "input",
      })
      .then((res) => res.name);

    return Promise.resolve(result);
  },
};

const inputGen: Parameters<PlopTypes.NodePlopAPI["setGenerator"]> = [
  NAME,
  CONFIG,
];

export { inputGen };
