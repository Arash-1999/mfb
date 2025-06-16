interface CheckboxOptions {
  color: "error" | "info" | "primary" | "secondary" | "success" | "warning";
  disableRipple: boolean;
  size: "medium" | "small";
}

interface CheckboxOptionsForm {
  props: CheckboxOptions;
}

export type { CheckboxOptions, CheckboxOptionsForm };
