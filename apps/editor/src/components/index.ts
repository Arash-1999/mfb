import type { FormBuilderConfig } from "@mfb/core";

import { FormBuilder } from "@mfb/core";
import { getConfig } from "@mfb/plugin-mui";

type FormId = `form-${number}`;

const config = getConfig() satisfies FormBuilderConfig;

type MuiConfig = typeof config;

const MuiFB = new FormBuilder<MuiConfig, FormId>(config);

export { MuiFB };
export type { MuiConfig };
