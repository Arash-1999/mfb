import type { PlopTypes } from "@turbo/gen";

import { inputGen } from "./input";

// Learn more about Turborepo Generators at https://turborepo.com/docs/guides/generating-code

const PREFIX = "mfb-";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  register(plop, inputGen);
}

function register(
  plop: PlopTypes.NodePlopAPI,
  item: Parameters<PlopTypes.NodePlopAPI["setGenerator"]>,
) {
  const [name, config] = item;

  plop.setGenerator(`${PREFIX}${name}`, config);
}
