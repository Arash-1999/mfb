import { MfbValidator } from "@/index";
import { test } from "vitest";

const mfbTest = test.extend({
  validator: new MfbValidator(),
});

export { mfbTest };
