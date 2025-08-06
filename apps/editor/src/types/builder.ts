const BUILDER_MODE = {
  ADVANCED: "Advanced",
  BASIC: "Basic",
  NORMAL: "Normal",
} as const;

type BuilderModeKeys = keyof typeof BUILDER_MODE;
type BuilderMode = (typeof BUILDER_MODE)[BuilderModeKeys];

export { BUILDER_MODE };
export type { BuilderMode };
