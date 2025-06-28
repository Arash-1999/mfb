import type {
  ActionInput,
  AdvancedBuilderProps,
  AdvancedMapperProps,
  BasicBuilderProps,
  BuilderProps,
  DefaultItem,
  DependencyManagerProps,
  FieldArrayOverrideProps,
  FieldArrayProps,
  FormBuilderConfig,
  FormBuilderContext,
  FormBuilderOptions,
  FormBuilderOverrides,
  GetCardsImpl,
  GetInputsImpl,
  InputMapperProps,
  RenderFnOptions,
} from "@/types";
import type { Context, ReactNode } from "react";
import type { FieldValues } from "react-hook-form";

import { options as defaultOptions } from "@/constants";
import {
  DependencyContext,
  FieldArrayContext,
  useDependencyContext,
  useFieldArrayContext,
} from "@/context";
import { useDependency, useDependsOnField } from "@/hooks";
import {
  convertDepsToObject,
  listActionGuard,
  listInputGuard,
  mergeName,
} from "@/utils";
import { dispatchFieldArray } from "@/utils/events";
import { createContext, createElement, useContext, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import { MfbFieldArray } from "./field-array";

// NOTE: move logic to separate functions in a better folder structure
class FormBuilder<
  TConfig extends FormBuilderConfig,
  TFormId extends string = string,
> {
  private config: TConfig;
  private Context: Context<FormBuilderContext<TFormId> | null>;
  private FieldArrayOverride?: <
    TFields extends FieldValues,
    TFormId extends string,
  >(
    props: FieldArrayOverrideProps<TFields, TFormId>,
  ) => ReactNode;
  private options: FormBuilderOptions;

  constructor(
    config: TConfig,
    options?: Partial<FormBuilderOptions>,
    overrides?: FormBuilderOverrides,
  ) {
    this.config = config;
    this.Context = createContext<FormBuilderContext<TFormId> | null>(null);
    this.options = { ...defaultOptions, ...options };

    if (overrides?.FieldArray) this.FieldArrayOverride = overrides.FieldArray;
  }

  public AdvancedBuilder = <TFields extends FieldValues>({
    gridContainerProps,
    id,
    list,
    onSubmit,
    options,
  }: AdvancedBuilderProps<TConfig, TFields, TFormId>) => {
    const { AdvancedMapper, Context } = this;
    const { "grid-container": GridContainer } = this.config.layout;
    const formMethods = useForm<TFields>(options);

    const resolvedList = useMemo(() => {
      if (typeof list === "function") {
        return list({
          defineCard: this.defineItem<
            GetCardsImpl<TConfig, TFields, false, true> & { mode: "card" }
          >(),
          defineInput: this.defineItem<
            GetInputsImpl<TConfig, TFields, false, true> & { mode: "input" }
          >(),
        });
      }
      return list;
    }, [list]);

    return (
      <Context.Provider
        value={{
          id,
        }}
      >
        <FormProvider {...formMethods}>
          <form id={id} onSubmit={formMethods.handleSubmit(onSubmit)}>
            <GridContainer {...gridContainerProps}>
              <AdvancedMapper list={resolvedList} />
            </GridContainer>
            {/* TODO: remove this submit button as configurable option */}
            <button type="submit">SUBMIT</button>
          </form>
        </FormProvider>
      </Context.Provider>
    );
  };

  public BasicBuilder = <TFields extends FieldValues>({
    gridContainerProps,
    id,
    inputs,
    onSubmit,
    options,
  }: BasicBuilderProps<TConfig, TFields, TFormId>) => {
    const { Context, InputMapper } = this;
    const { "grid-container": GridContainer } = this.config.layout;
    const formMethods = useForm<TFields>(options);

    // TODO: move useMemo into a custom hook with generic type for TItem (and list/inputs)
    const resolvedInputs = useMemo(() => {
      if (typeof inputs === "function") {
        return inputs({
          define:
            this.defineItem<GetInputsImpl<TConfig, TFields, false, true>>(),
        });
      }
      return inputs;
    }, [inputs]);

    return (
      <Context.Provider
        value={{
          id,
        }}
      >
        <FormProvider {...formMethods}>
          <form id={id} onSubmit={formMethods.handleSubmit(onSubmit)}>
            <GridContainer {...gridContainerProps}>
              <InputMapper inputs={resolvedInputs} />
            </GridContainer>
            {/* TODO: remove this submit button as configurable option */}
            <button type="submit">SUBMIT</button>
          </form>
        </FormProvider>
      </Context.Provider>
    );
  };

  public Builder = <TFields extends FieldValues>({
    cards,
    gridContainerProps,
    id,
    onSubmit,
    options,
  }: BuilderProps<TConfig, TFields, TFormId>) => {
    const formMethods = useForm<TFields>(options);
    const {
      layout: { "grid-container": GridContainer },
    } = this.config;
    const { Context, DependencyManager, renderCard } = this;

    // TODO: move useMemo into a custom hook with generic type for TItem (and list/inputs)
    const resolvedCards = useMemo(() => {
      if (typeof cards === "function") {
        return cards({
          defineCard:
            this.defineItem<GetCardsImpl<TConfig, TFields, false, true>>(),
          defineInput:
            this.defineItem<GetInputsImpl<TConfig, TFields, false, true>>(),
        });
      }
      return cards;
    }, [cards]);

    return (
      <Context.Provider
        value={{
          id,
        }}
      >
        <FormProvider {...formMethods}>
          <form id={id} onSubmit={formMethods.handleSubmit(onSubmit)}>
            <GridContainer {...(gridContainerProps || {})}>
              {resolvedCards.map((card, index) => {
                return (
                  <DependencyManager<
                    TFields,
                    | GetCardsImpl<TConfig, TFields, false, true>
                    | GetCardsImpl<TConfig, TFields, false>
                  >
                    component={card}
                    index={index}
                    key={`card-${index}`}
                    render={renderCard}
                    withContext
                  />
                );
              })}
            </GridContainer>
            {/* TODO: remove this submit button as configurable option */}
            <button type="submit">SUBMIT</button>
          </form>
        </FormProvider>
      </Context.Provider>
    );
  };

  private useMfbContext = (): FormBuilderContext<TFormId> => {
    const { Context } = this;
    return useContext(Context) || { id: "" as TFormId };
  };

  private ActionButton = <TFields extends FieldValues>({
    action,
    disabled,
  }: {
    action: ActionInput<TConfig, TFields>;
    disabled: boolean;
  }) => {
    const {
      button: { component: Button },
    } = this.config;
    const { id } = this.useMfbContext() || { id: "" };
    const { index } = useFieldArrayContext();

    const handleClick = () => {
      switch (action.actionType) {
        case "append":
        case "prepend":
          dispatchFieldArray<TFields>(id, action.name, {
            // TODO: use config.input.defaultValues to create correct deafultValue
            params: [{} as never, {}],
            type: "append",
          });
          break;
        case "remove": {
          const removeIndex = index === null ? -1 : index;
          dispatchFieldArray<TFields>(id, action.name, {
            params: [removeIndex],
            type: "remove",
          });
          break;
        }
        default:
          console.log("something");
      }
    };

    return (
      <Button
        disabled={disabled}
        onClick={handleClick}
        type="button"
        {...action.props}
      />
    );
  };
  private AdvancedMapper = <TFields extends FieldValues>({
    list,
    name,
  }: AdvancedMapperProps<TConfig, TFields>) => {
    const { DependencyManager, renderAction, renderCard, renderInput } = this;

    return list.map((item, index) => {
      if (item.mode === "card") {
        return (
          <DependencyManager<
            TFields,
            | GetCardsImpl<TConfig, TFields, true, true>
            | GetCardsImpl<TConfig, TFields, true>
          >
            component={item}
            index={index}
            key={`card-${index}`}
            name={name}
            render={renderCard}
            withContext
          />
        );
      }
      if (item.mode === "input") {
        if (listActionGuard<TConfig, TFields>(item)) {
          return (
            <DependencyManager<TFields, ActionInput<TConfig, TFields>>
              component={item}
              index={index}
              key={`action-${index}`}
              name={name}
              render={renderAction}
              withContext={false}
              withGrid
            />
          );
        }
        const withContext =
          (typeof item === "function" ? item().type : item.type) === "list";
        return (
          <DependencyManager<TFields, GetInputsImpl<TConfig, TFields>>
            component={item}
            index={index}
            key={`input-${index}`}
            name={name}
            render={renderInput}
            withContext={withContext}
            withGrid
          />
        );
      }
      return null;
    });
  };

  private defineItem =
    <TItem,>() =>
    <TDeps extends FieldValues>(func: (props?: { deps: TDeps }) => TItem) => {
      return func;
    };

  private DependencyManager = <
    TFields extends FieldValues,
    TItem extends DefaultItem<TFields>,
  >({
    component,
    index,
    name,
    render,
    withContext,
    withGrid,
  }: DependencyManagerProps<TFields, TItem>) => {
    const {
      layout: { "grid-item": GridItem },
    } = this.config;
    const dependencyContext = useDependencyContext();
    const formMethods = useFormContext<TFields>();
    const dependency = useDependsOnField<TFields, TItem>({
      component,
    });

    const [resolvedComponent, dependencies] = useDependency<TFields, TItem>(
      {
        component,
        dependencyContext,
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

    return withContext ? (
      <DependencyContext.Provider
        value={{
          disable: dependencies.disable,
        }}
      >
        {children}
      </DependencyContext.Provider>
    ) : (
      children
    );
  };

  private FieldArray = <TFields extends FieldValues>({
    disabled,
    name,
    render,
  }: FieldArrayProps<TFields>) => {
    const { FieldArrayOverride } = this;
    const { id } = this.useMfbContext();

    const props = {
      disabled,
      id,
      name,
      render,
    };
    if (FieldArrayOverride) {
      return <FieldArrayOverride<TFields, TFormId> {...props} />;
    } else {
      return <MfbFieldArray<TFields, TFormId> {...props} />;
    }
  };

  private InputMapper = <TFields extends FieldValues>({
    inputs,
    name, // should passed in list input. optional in card or flat mode inputs.
  }: InputMapperProps<TConfig, TFields>) => {
    const { DependencyManager, renderAction, renderInput } = this;

    return inputs.map((input, i) => {
      if (listActionGuard<TConfig, TFields>(input)) {
        return (
          <DependencyManager<TFields, ActionInput<TConfig, TFields>>
            component={input}
            index={i}
            key={`input-${i}`}
            name={name}
            render={renderAction}
            withContext={false}
            withGrid
          />
        );
      }
      const withContext =
        (typeof input === "function" ? input().type : input.type) === "list";
      return (
        <DependencyManager<TFields, GetInputsImpl<TConfig, TFields>>
          component={input}
          index={i}
          key={`input-${i}`}
          name={name}
          render={renderInput}
          withContext={withContext}
          withGrid
        />
      );
    });
  };

  private renderAction = <TFields extends FieldValues>(
    action: ActionInput<TConfig, TFields>,
    { dependsOn }: RenderFnOptions<TFields>,
  ) => {
    const { ActionButton } = this;

    return (
      <ActionButton<TFields> action={action} disabled={dependsOn.disable} />
    );
  };

  private renderCard = <
    TFields extends FieldValues,
    TAdvanced extends boolean = true,
  >(
    card:
      | GetCardsImpl<TConfig, TFields, TAdvanced, true>
      | GetCardsImpl<TConfig, TFields, TAdvanced>,
    { dependsOn, index, name }: RenderFnOptions<TFields>,
  ) => {
    const resolvedName = mergeName(name || "", card.name || "");
    const { "grid-container": GridContainer, "grid-item": GridItem } =
      this.config.layout;
    const { AdvancedMapper, InputMapper } = this;

    if (card.isGroup) {
      const { FieldArray } = this;
      const {
        card: { group },
      } = this.config;

      if (!group) return null;
      const RenderGroupCard = group[card.type];

      /* Card Group List */
      if (card.variant === "list") {
        return (
          <FieldArray<TFields>
            disabled={dependsOn.disable}
            key={`card-${index}`}
            name={resolvedName}
            render={(fields) =>
              createElement(RenderGroupCard, {
                addGrid: (node, index) => (
                  <GridItem key={`grid-item-${index}`} {...card.gridProps}>
                    {node}
                  </GridItem>
                ),
                nodes: fields.map((field, i, { length }) => {
                  return {
                    children: (
                      <FieldArrayContext.Provider value={{ index: i, length }}>
                        <GridContainer {...card.gridContainerProps}>
                          {"list" in card ? (
                            <AdvancedMapper
                              key={field.id}
                              list={card.list}
                              name={`${resolvedName}.${i}`}
                            />
                          ) : (
                            <InputMapper
                              inputs={card.inputs}
                              key={field.id}
                              name={`${resolvedName}.${i}`}
                            />
                          )}
                        </GridContainer>
                      </FieldArrayContext.Provider>
                    ),
                    // TODO: add titleFn to group card(list variant) for generating title
                    title: `List Item ${i + 1}`,
                  };
                }),
                ...card.props,
              })
            }
          />
        );
      }

      /* Card Group Normal*/
      return createElement(RenderGroupCard, {
        addGrid: (node, index) => (
          <GridItem key={`grid-item-${index}`} {...card.gridProps}>
            {node}
          </GridItem>
        ),
        key: `card-${index}`,
        nodes:
          "list" in card
            ? card.list.map(
                ({ gridContainerProps, list, name: itemName, title }) => ({
                  children: (
                    <GridContainer {...gridContainerProps}>
                      <AdvancedMapper
                        list={list}
                        name={mergeName(resolvedName, itemName || "")}
                      />
                    </GridContainer>
                  ),
                  title,
                }),
              )
            : card.inputs.map(
                ({ gridContainerProps, list, name: itemName, title }) => ({
                  children: (
                    <GridContainer {...gridContainerProps}>
                      <InputMapper
                        inputs={list}
                        name={mergeName(resolvedName, itemName || "")}
                      />
                    </GridContainer>
                  ),
                  title,
                }),
              ),
        ...card.props,
      });
    }

    const {
      card: { simple },
    } = this.config;

    const RenderSimpleCard = simple[card.type];

    /* Card Simple */
    if (typeof RenderSimpleCard === "function") {
      return (
        <GridItem key={index} {...(card.gridProps || {})}>
          {createElement(
            RenderSimpleCard,
            {
              header: card.header,
            },
            <GridContainer {...(card.gridContainerProps || {})}>
              {"list" in card ? (
                <AdvancedMapper list={card.list} name={resolvedName} />
              ) : (
                <InputMapper inputs={card.inputs} name={resolvedName} />
              )}
            </GridContainer>,
          )}
        </GridItem>
      );
    }
    return null;
  };

  private renderInput = <TFields extends FieldValues>(
    input: GetInputsImpl<TConfig, TFields, true>,
    { dependsOn, formMethods, name }: RenderFnOptions<TFields>,
  ) => {
    const resolvedName = mergeName(name || "", input.name);
    if (listInputGuard<TConfig, TFields>(input)) {
      const { AdvancedMapper, FieldArray, InputMapper } = this;
      const {
        layout: { "grid-container": GridContainer, "grid-item": GridItem },
      } = this.config;

      return (
        <FieldArray<TFields>
          disabled={dependsOn.disable}
          name={resolvedName}
          render={(fields) => (
            <GridItem {...input.gridProps}>
              <GridContainer {...input.gridContainerProps}>
                {fields.map((field, i, { length }) => {
                  let children = <></>;
                  if ("inputs" in input) {
                    children = (
                      <InputMapper
                        inputs={input.inputs}
                        name={`${resolvedName}.${i}`}
                      />
                    );
                  }
                  if ("list" in input) {
                    children = (
                      <AdvancedMapper
                        list={input.list}
                        name={`${resolvedName}.${i}`}
                      />
                    );
                  }
                  return (
                    <FieldArrayContext.Provider
                      key={field.id}
                      value={{ index: i, length }}
                    >
                      {children}
                    </FieldArrayContext.Provider>
                  );
                })}
              </GridContainer>
            </GridItem>
          )}
        />
      );
    }
    const {
      input: { components },
      layout: { field: Field },
    } = this.config;
    const InputFn = components[input.type];

    if (typeof InputFn === "function" && typeof input.props === "object") {
      const renderedInput = (
        <InputFn
          formMethods={formMethods}
          name={resolvedName}
          {...Object.assign({}, input.props, {
            deps: convertDepsToObject(dependsOn["bind-value"]),
            disabled: dependsOn.disable,
          })}
        />
      );
      return input.field ? (
        <Field {...input.field}>{renderedInput}</Field>
      ) : (
        renderedInput
      );
    }

    return null;
  };
}

export default FormBuilder;
