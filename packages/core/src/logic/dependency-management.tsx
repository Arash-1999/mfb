import type {
  DefaultItem,
  DependencyManagerProps,
  FormBuilderConfig,
  FormBuilderOptions,
  FormBuilderOverrides,
} from "@/types";
import type { FieldValues } from "react-hook-form";

import { useMfbItemContext } from "@/context";
import { useDependency, useDependsOnField } from "@/hooks";
import { MfbItemProvider } from "@/providers";
import { useFormContext } from "react-hook-form";

import { Configuration } from "./configuration";

class DependencyManagement<
  TConfig extends FormBuilderConfig,
  TFormId extends string,
> extends Configuration<TConfig, TFormId> {
  constructor(
    config: TConfig,
    options?: Partial<FormBuilderOptions>,
    overrides?: FormBuilderOverrides,
  ) {
    super(config, options, overrides);
  }

  protected DependencyManager = <
    TFields extends FieldValues,
    TItem extends DefaultItem<TFields>,
  >({
    component,
    getItemInfo,
    index,
    name,
    render,
    withGrid,
  }: DependencyManagerProps<TFields, TItem>) => {
    const {
      layout: { "grid-item": GridItem },
    } = this.config;
    const { deps: parentDeps } = useMfbItemContext();
    const formMethods = useFormContext<TFields>();
    const dependency = useDependsOnField<TFields, TItem>({
      component,
    });

    const [resolvedComponent, dependencies] = useDependency<TFields, TItem>(
      {
        component,
        dependencyContext: parentDeps,
        dependsOn: dependency,
        name,
      },
      {
        dependencyShouldReset: this.options.dependencyShouldReset,
      },
    );

    if (resolvedComponent === null) return null;

    const renderedComponent = render(resolvedComponent, {
      dependsOn: dependencies,
      formMethods,
      index,
      name,
    });

    const children =
      withGrid || "gridProps" in resolvedComponent ? (
        <GridItem {...resolvedComponent.gridProps}>
          {renderedComponent}
        </GridItem>
      ) : (
        renderedComponent
      );

    return (
      <MfbItemProvider<TFields, TItem>
        disable={dependencies.disable}
        getItemInfo={getItemInfo}
        index={index}
        item={resolvedComponent}
      >
        {children}
      </MfbItemProvider>
    );
  };
}

export { DependencyManagement };
