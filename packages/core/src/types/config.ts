import type { GroupCardComponent, SimpleCardObject } from "./card";
import type { InputObject } from "./input";
import type { BaseComponent, LayoutKey } from "./utils";

interface FormBuilderConfig {
  card: {
    group?: Record<PropertyKey, GroupCardComponent>;
    simple: SimpleCardObject;
  };
  input: {
    components: InputObject;
    defaultValues: Record<PropertyKey, unknown>;
  };
  layout: Record<LayoutKey, BaseComponent>;
}

interface FormBuilderContext<TFormId extends string = string> {
  id: TFormId;
}

export type { FormBuilderConfig, FormBuilderContext };

