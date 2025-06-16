interface TextFieldOptions {
  color: "error" | "info" | "primary" | "secondary" | "success" | "warning";
  fullWidth: boolean;
  helperText: string;
  id: string;
  label: string;
  margin: "dense" | "none" | "normal";
  maxRows: number | string;
  minRows: number | string;
  multiline: boolean;
  placeholder: string;
  rows: number | string;
  size: "medium" | "small";
  variant: "filled" | "outlined" | "standard";
}

interface TextFieldOptionsForm {
  props: TextFieldOptions;
}

export type { TextFieldOptions, TextFieldOptionsForm };
