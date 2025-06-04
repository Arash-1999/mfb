import type { FormBuilderConfig } from "@mfb/core";

import { FormBuilder } from "@mfb/core";
import { getConfig } from "@mfb/plugin-mui";

import type { FormId } from "./id";

const config = getConfig() satisfies FormBuilderConfig;

type MuiConfig = typeof config;

const MuiFB = new FormBuilder<MuiConfig, FormId>(config);

export { MuiFB };
export type { MuiConfig };
