import type { BaseComponent, FbComponent, LayoutKey } from "./utils";

interface FormBuilderConfig {
  field: BaseComponent;
  input: FbComponent;
  layout: Record<LayoutKey, BaseComponent>;
}

export type { FormBuilderConfig };
