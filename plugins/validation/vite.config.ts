import { join, resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import { peerDependencies } from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, join("src", "index.ts")),
      fileName: "index",
      name: "@mfb/valibot",
    },
    minify: false,
    rollupOptions: {
      // external: [...Object.keys(peerDependencies)],
      //   output: {
      //     globals: { },
      //   },
    },
    target: "esnext",
  },
  plugins: [dts({ rollupTypes: true })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
