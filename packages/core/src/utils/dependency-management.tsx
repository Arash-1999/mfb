// import type { FormBuilderConfig } from "@/types";
import type { BaseInputParameters } from "@/types";
import type {
  Condition,
  DependsOn,
  DisableDependency,
  VisibilityDependency,
} from "@/types/dependency-management";
import type { JSX, PropsWithChildren } from "react";
import type { FieldValues } from "react-hook-form";

import { useFormContext, useWatch } from "react-hook-form";

type RenderHoCProps<
  // TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = PropsWithChildren<{
  dependency: DependsOn<TFields> & VisibilityDependency;
}>;

const RenderHoC = <
  // TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
>({
  children,
  dependency,
}: RenderHoCProps<TFields>) => {
  const form = useFormContext<TFields>();
  const value = useWatch<TFields>({
    control: form.control,
    name: dependency.path,
  });

  const condition = conditionCalculator(dependency, value);

  return condition ? children : null;
};

type DisableHoCProps<TFields extends FieldValues> = {
  dependency: DependsOn<TFields> & DisableDependency;
  render: (props: BaseInputParameters) => JSX.Element;
};

const DisabledHoC = <TFields extends FieldValues>({
  dependency,
  render,
}: DisableHoCProps<TFields>) => {
  const form = useFormContext<TFields>();
  const value = useWatch<TFields>({
    control: form.control,
    name: dependency.path,
  });

  const condition = conditionCalculator(dependency, value);

  return render({ disabled: condition });
};

const conditionCalculator = (
  { condition, value }: Condition,
  currentValue: number | string,
): boolean => {
  let result: boolean = false;

  switch (condition) {
    case "eq":
      result = value === currentValue;
      break;
    case "not-eq":
      result = value !== currentValue;
      break;
  }
  return result;
};

export { conditionCalculator, DisabledHoC, RenderHoC };
