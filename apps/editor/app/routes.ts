import type { RouteConfig } from "@react-router/dev/routes";

import { index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix('editor', [
    index('routes/editor/index.tsx'),
  ]),

  route("preview", "routes/preview/index.tsx"),
] satisfies RouteConfig;
