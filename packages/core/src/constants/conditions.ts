import type { ConditionsMap } from "@mfb/types";

const defaultConditions: ConditionsMap = {
  eq: (target, value) => target === value,
  "is-first-index": (target) => target === 0,
  "is-last-index": (target, value) => {
    if (typeof value === "number") return target === value - 1;
    else return false;
  },
  "not-eq": (target, value) => target !== value,
  "not-first-index": (target) => target !== 0,
  "not-last-index": (target, value) => {
    if (typeof value === "number") return target !== value - 1;
    else return false;
  },
};

export { defaultConditions };
