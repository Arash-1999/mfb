type Condition = {
  condition:
    | "eq"
    | "is-first-index"
    | "is-last-index"
    | "not-eq"
    | "not-first-index"
    | "not-last-index";
  value: boolean | null | number | string;
};

export type { Condition };
