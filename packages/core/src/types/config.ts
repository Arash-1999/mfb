import type { GroupCardComponent, SimpleCardBase } from "./card";
import type { InputObject } from "./input";
import type { BaseComponent, LayoutKey } from "./utils";

interface FormBuilderConfig {
  card: {
    group?: Record<PropertyKey, GroupCardComponent>;
    simple: Record<PropertyKey, SimpleCardBase>;
  };
  input: {
    components: InputObject;
    defaultValues: Record<PropertyKey, unknown>;
  };
  layout: Record<LayoutKey, BaseComponent>;
}

// TODO: use generic type for all valid form IDs
interface FormBuilderContext {
  id: string;
}

export type { FormBuilderConfig, FormBuilderContext };
