import type { BaseComponent, FbComponent, LayoutKey } from "./utils";

interface FormBuilderConfig {
  field: BaseComponent;
  input: {
    components: FbComponent;
    defaultValues: Record<PropertyKey, unknown>;
  };
  layout: Record<LayoutKey, BaseComponent>;
}

export type { FormBuilderConfig };
