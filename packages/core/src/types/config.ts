import type { BaseComponent, FbComponent, LayoutKey } from "./utils";

interface FormBuilderConfig {
  card: {
    group?: FbComponent;
    simple: FbComponent;
  };
  input: {
    components: FbComponent;
    defaultValues: Record<PropertyKey, unknown>;
  };
  layout: Record<LayoutKey, BaseComponent>;
}

export type { FormBuilderConfig };
