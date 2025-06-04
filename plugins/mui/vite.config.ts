import react from "@vitejs/plugin-react-swc";
import { join, resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import { peerDependencies } from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, join("src", "index.ts")),
      fileName: "index",
      name: "@mfb/plugin-mui",
    },
    minify: false,
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
      output: {
        globals: {
          "@emotion/styled": "EmStyled",
          "@mui/material": "Mui",
          react: "React",
          "react-dom": "ReactDOM",
          "react-hook-form": "RHF",
        },
      },
    },
    target: "esnext",
  },
  plugins: [react(), dts({ rollupTypes: true })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
