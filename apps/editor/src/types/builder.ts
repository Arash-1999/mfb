const BUILDER_MODE = {
  ADVANCED: "advanced",
  BASIC: "basic",
  NORMAL: "normal",
} as const;

type BuilderModeKeys = keyof typeof BUILDER_MODE;
type BuilderMode = (typeof BUILDER_MODE)[BuilderModeKeys];

export { BUILDER_MODE };
export type { BuilderMode };
