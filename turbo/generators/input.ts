import type { PlopTypes } from "@turbo/gen";

import { readdirSync } from "fs";

import { directorySelect } from "./core";

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
  prompts: async (inquirer) => {
    const result = { name: "", path: "" };

    const path = await directorySelect({
      basePath: "./src",
      message: "Choose Your Page: ",
      validate: (path: string) => {
        const dir = readdirSync(path, { withFileTypes: true });
        return dir.findIndex((dirent) => dirent.name === "index.ts") !== -1;
      },
    });
    result.path = path;
    const filename = path.split("/").at(-1);

    if (filename) {
      result.name = filename;
    } else {
      const name = await inquirer.prompt({
        name: "name",
        type: "input",
      });

      result.name = name.name;
    }

    return Promise.resolve(result);
  },
};

const inputGen: Parameters<PlopTypes.NodePlopAPI["setGenerator"]> = [
  NAME,
  CONFIG,
];

export { inputGen };
