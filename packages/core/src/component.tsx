import type {
  AdvancedBuilderProps,
  AdvancedMapperProps,
  BasicBuilderProps,
  BuilderProps,
  DefaultItem,
  DependencyContextValue,
  DependencyManagerProps,
  FieldArrayEvent,
  FieldArrayProps,
  FormBuilderConfig,
  FormBuilderContext,
  FormBuilderOptions,
  FormBuilderProps,
  GetCardsImpl,
  GetInputsImpl,
  InputMapperProps,
  RenderFnOptions,
} from "@/types";
import type { Context } from "react";
import type { ArrayPath, FieldValues } from "react-hook-form";

import {
  useDependency,
  useDependsOnField,
  useMfbFieldArray,
  useMfbGlobalEvent,
} from "@/hooks";
import {
  conditionArrayCalculator,
  convertDepsToObject,
  listInputGuard,
  mergeName,
} from "@/utils";
import { eventNames } from "@/utils/events";
import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { options as defaultOptions } from "@/constants";

// NOTE: move logic to separate functions in a better folder structure
class FormBuilder<
  TConfig extends FormBuilderConfig,
  TFormId extends string = string,
> implements FormBuilderProps<TConfig>
{
  config: TConfig;
  Context: Context<FormBuilderContext<TFormId> | null>;
  DependencyContext: Context<DependencyContextValue | null>;
  options: FormBuilderOptions;

  constructor(config: TConfig, options?: FormBuilderOptions) {
    this.config = config;
    this.Context = createContext<FormBuilderContext<TFormId> | null>(null);
    this.DependencyContext = createContext<DependencyContextValue | null>(null);
    this.options = { ...defaultOptions, ...options };
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

  private AdvancedMapper = <TFields extends FieldValues>({
    list,
    name,
  }: AdvancedMapperProps<TConfig, TFields>) => {
    const { DependencyManager, renderCard, renderInput } = this;

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
    const { DependencyContext } = this;
    const {
      layout: { "grid-item": GridItem },
    } = this.config;
    const dependencyContext = useContext(DependencyContext) || { disable: [] };
    const formMethods = useFormContext<TFields>();
    const dependency = useDependsOnField<TFields, TItem>({
      component,
    });

    const [resolvedComponent, dependencies] = useDependency<TFields, TItem>(
      {
        component,
        name,
        dependencyContext,
        dependsOn: dependency,
      },
      {
        dependencyShouldReset: this.options.dependencyShouldReset,
      }
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

  private useMfbContext = () => {
    const { Context } = this;
    return useContext(Context);
  };

  private FieldArray = <TFields extends FieldValues>({
    disabled,
    name,
    render,
  }: FieldArrayProps<TFields>) => {
    const { action, fields } = useMfbFieldArray<TFields>({
      name: name as ArrayPath<TFields>,
    });
    const { id } = this.useMfbContext() || { id: "" };

    const handler = useCallback(
      (event: CustomEventInit<FieldArrayEvent<TFields, TFormId>>) => {
        const { detail } = event;
        if (detail && detail.id === id && detail.name === name) {
          action(detail.action);
        }
      },
      [action, id, name]
    );

    useMfbGlobalEvent<TFields, TFormId>({
      disabled,
      eventName: eventNames["field-array"],
      handler,
    });

    return render(fields);
  };

  private InputMapper = <TFields extends FieldValues>({
    inputs,
    name, // should passed in list input. optional in card or flat mode inputs.
  }: InputMapperProps<TConfig, TFields>) => {
    const { DependencyManager, renderInput } = this;

    return inputs.map((input, i) => {
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

  private renderCard = <
    TFields extends FieldValues,
    TAdvanced extends boolean = true,
  >(
    card:
      | GetCardsImpl<TConfig, TFields, TAdvanced, true>
      | GetCardsImpl<TConfig, TFields, TAdvanced>,
    { dependsOn, index, name }: RenderFnOptions<TFields>
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
            disabled={
              dependsOn.disable.length > 0 &&
              conditionArrayCalculator(dependsOn.disable)
            }
            key={`card-${index}`}
            name={resolvedName}
            render={(fields) =>
              createElement(RenderGroupCard, {
                addGrid: (node, index) => (
                  <GridItem key={`grid-item-${index}`} {...card.gridProps}>
                    {node}
                  </GridItem>
                ),
                nodes: fields.map((field, i) => ({
                  children: (
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
                  ),
                  // TODO: add titleFn to group card(list variant) for generating title
                  title: `List Item ${i + 1}`,
                })),
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
            ? card.list.map(({ gridContainerProps, list, name, title }) => ({
                children: (
                  <GridContainer {...gridContainerProps}>
                    <AdvancedMapper
                      list={list}
                      name={mergeName(resolvedName, name || "")}
                    />
                  </GridContainer>
                ),
                title,
              }))
            : card.inputs.map(({ gridContainerProps, list, title }) => ({
                children: (
                  <GridContainer {...gridContainerProps}>
                    <InputMapper
                      inputs={list}
                      name={mergeName(resolvedName, name || "")}
                    />
                  </GridContainer>
                ),
                title,
              })),
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
            </GridContainer>
          )}
        </GridItem>
      );
    }
    return null;
  };

  private renderInput = <TFields extends FieldValues>(
    input: GetInputsImpl<TConfig, TFields, true>,
    { dependsOn, formMethods, name }: RenderFnOptions<TFields>
  ) => {
    const resolvedName = mergeName(name || "", input.name);
    if (listInputGuard<TConfig, TFields>(input)) {
      const { AdvancedMapper, FieldArray, InputMapper } = this;
      const {
        layout: { "grid-container": GridContainer, "grid-item": GridItem },
      } = this.config;

      return (
        <FieldArray<TFields>
          disabled={
            dependsOn.disable.length > 0 &&
            conditionArrayCalculator(dependsOn.disable)
          }
          name={resolvedName}
          render={(fields) => (
            <GridItem {...input.gridProps}>
              <GridContainer {...input.gridContainerProps}>
                {fields.map((field, i) => {
                  if ("inputs" in input) {
                    return (
                      <InputMapper
                        inputs={input.inputs}
                        key={field.id}
                        name={`${resolvedName}.${i}`}
                      />
                    );
                  }
                  if ("list" in input) {
                    return (
                      <AdvancedMapper
                        key={field.id}
                        list={input.list}
                        name={`${resolvedName}.${i}`}
                      />
                    );
                  }
                  return null;
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
            disabled:
              dependsOn.disable.length > 0 &&
              conditionArrayCalculator(dependsOn.disable),
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
