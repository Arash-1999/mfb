import type { FieldOptionsForm, GridItemOptionsForm } from "../../layout";

interface TestForm extends FieldOptionsForm, GridItemOptionsForm {
  props: TextFieldOptionsForm;
}

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
  textFieldProps: Partial<TextFieldOptions>;
}

export type { TestForm, TextFieldOptions, TextFieldOptionsForm };
