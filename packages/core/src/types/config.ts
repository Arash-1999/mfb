import type { GroupCardComponent, SimpleCardBase } from "./card";
import type { BaseComponent, FbComponent, LayoutKey } from "./utils";

interface FormBuilderConfig {
  card: {
    group?: Record<PropertyKey, GroupCardComponent>;
    simple: Record<PropertyKey, SimpleCardBase>;
  };
  input: {
    components: FbComponent;
    defaultValues: Record<PropertyKey, unknown>;
  };
  layout: Record<LayoutKey, BaseComponent>;
}

export type { FormBuilderConfig };
