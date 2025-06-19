import type { GroupCardComponent, SimpleCardObject } from "./card";
import type { ButtonComponent, IconComponent } from "./components";
import type { InputObject } from "./input";
import type { BaseComponent, LayoutKey } from "./utils";

interface FormBuilderConfig {
  button: {
    component: ButtonComponent;
    icon: IconComponent;
  };
  card: {
    group?: Record<PropertyKey, GroupCardComponent>;
    simple: SimpleCardObject;
  };
  input: {
    components: InputObject;
    defaultValues: Record<PropertyKey, unknown>;
  };
  layout: Record<LayoutKey, BaseComponent>;
  options?: Partial<FormBuilderOptions>;
}

interface FormBuilderContext<TFormId extends string = string> {
  id: TFormId;
}

interface FormBuilderOptions {
  dependencyShouldReset: boolean;
}

export type { FormBuilderConfig, FormBuilderContext, FormBuilderOptions };
