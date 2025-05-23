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
  FormBuilderProps,
  GetCardsImpl,
  GetInputs,
  GetInputsImpl,
  InputMapFnOptions,
  InputMapperProps,
  RenderCardProps,
  RenderFnOptions,
  RenderInputOptions,
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

// NOTE: move logic to separate functions in a better folder structure
class FormBuilder<
  TConfig extends FormBuilderConfig,
  TFormId extends string = string,
> implements FormBuilderProps<TConfig> {
  config: TConfig;
  Context: Context<FormBuilderContext<TFormId> | null>;
  DependencyContext: Context<DependencyContextValue | null>;

  constructor(config: TConfig) {
    this.config = config;
    this.Context = createContext<FormBuilderContext<TFormId> | null>(null);
    this.DependencyContext = createContext<DependencyContextValue | null>(null);
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

    return (
      <Context.Provider
        value={{
          id,
        }}
      >
        <FormProvider {...formMethods}>
          <form id={id} onSubmit={formMethods.handleSubmit(onSubmit)}>
            <GridContainer {...gridContainerProps}>
              <AdvancedMapper list={list} />
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
      } else return inputs;
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
    const { Context, DependencyManager, renderCard_v2: renderCard } = this;

    return (
      <Context.Provider
        value={{
          id,
        }}
      >
        <FormProvider {...formMethods}>
          <form id={id} onSubmit={formMethods.handleSubmit(onSubmit)}>
            <GridContainer {...(gridContainerProps || {})}>
              {cards.map((card, index) => {
                return (
                  <DependencyManager<TFields, GetCardsImpl<TConfig, TFields, false>>
                    component={card}
                    index={index}
                    key={`input-${index}`}
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
    const formMethods = useFormContext<TFields>();
    const { inputMapFn } = this;
    // const { inputMapFn, renderCard } = this;

    return list.map((item, index) => {
      if (item.mode === "card") {
        // const resolvedName = name ? mergeName(name, item.name || "") : null;

        return null;
        // return renderCard({
        //   advanced: true,
        //   card: Object.assign({}, item, { name: resolvedName }),
        //   index,
        // });
      } else if (item.mode === "input") {
        return inputMapFn(item, index, { formMethods, name });
      }
      return null;
    });
  };

  // TODO:
  // private cardMapFn = <TFields extends FieldValues>(
  //   card: GetCards<TConfig, TFields>,
  //   index: number,
  //   { deps, formMethods, name }: InputMapFnOptions<TFields>
  // ) => {
  //   const key = `input-${index}`;

  //   const dependency = useDependsOnField<
  //     TFields,
  //     GetCardsImpl<TConfig, TFields>
  //   >({ component: card, deps });

  //   const [component, dependencies] = useDependency<
  //     TFields,
  //     GetCardsImpl<TConfig, TFields>
  //   >({
  //     component: card,
  //     dependsOn: dependency,
  //   });
  // };

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
  }: DependencyManagerProps<TFields, TItem>) => {
    const { DependencyContext } = this;
    const dependencyContext = useContext(DependencyContext) || { disable: [] };
    const formMethods = useFormContext<TFields>();
    const dependency = useDependsOnField<TFields, TItem>({
      component,
    });

    const [resolvedComponent, dependencies] = useDependency<TFields, TItem>({
      component,
      dependencyContext,
      dependsOn: dependency,
    });

    if (resolvedComponent === null) return null;

    const children = render(resolvedComponent, {
      dependsOn: dependencies,
      formMethods,
      index,
      name,
    });
    return withContext ? (
      <DependencyContext.Provider
        value={{
          disable: [...dependencies["disable"], ...dependencyContext.disable],
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

  // TODO: add `disable` props and if it is true disable action handler
  private FieldArray = <TFields extends FieldValues>({
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
      [action, id, name],
    );

    useMfbGlobalEvent<TFields, TFormId>({
      eventName: eventNames["field-array"],
      handler,
    });

    return render(fields);
  };

  private inputMapFn = <TFields extends FieldValues>(
    input: GetInputs<TConfig, TFields>,
    index: number,
    { deps, formMethods, name }: InputMapFnOptions<TFields>,
  ) => {
    const {
      layout: { "grid-item": GridItem },
    } = this.config;

    const key = `input-${index}`;

    const dependency = useDependsOnField<
      TFields,
      GetInputsImpl<TConfig, TFields>
    >({ component: input, deps });

    const [component, dependencies] = useDependency<
      TFields,
      GetInputsImpl<TConfig, TFields>
    >({
      component: input,
      dependencyContext: { disable: [] },
      dependsOn: dependency,
    });

    if (component === null) return null;

    let node = null;

    if (listInputGuard<TConfig, TFields>(component)) {
      node = this.renderInput(
        Object.assign({}, component, {
          name: mergeName(name || "", component.name),
        }),
        { formMethods },
      );
    } else {
      // TODO: use type of deps field in user input components and make path and id type safe.
      const depsField = dependencies["bind-value"].reduce<
        Record<string, unknown>
      >(
        (acc, cur) => ({
          ...acc,
          [cur.id]: cur.current,
        }),
        {},
      );
      node = this.renderInput(
        Object.assign({}, component, {
          name: mergeName(name || "", component.name),
          props: Object.assign({}, component.props, {
            deps: depsField,
            disabled:
              dependencies["disable"].length > 0 &&
              conditionArrayCalculator(dependencies["disable"]),
          }),
        }),
        { formMethods },
      );
    }

    return (
      <GridItem key={key} {...(component.gridProps || {})}>
        {node}
      </GridItem>
    );
  };

  private InputMapper = <TFields extends FieldValues>({
    inputs,
    name, // should passed in list input. optional in card or flat mode inputs.
  }: InputMapperProps<TConfig, TFields>) => {
    const { DependencyManager, renderInput_v2: renderInput } = this;

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
        />
      );
    });
    // return inputs.map((input, i) =>
    //   this.inputMapFn(input, i, { deps, formMethods, name }),
    // );
  };

  private renderCard = <
    TFields extends FieldValues,
  // TAdvanced extends boolean = true,
  >({
    advanced,
    card,
    index,
  }: RenderCardProps<TConfig, TFields>) => {
    // TODO: pass key to each return jsx element (like normal builder)
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
            key={`card-${index}`}
            name={card.name}
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
                      {advanced ? (
                        <AdvancedMapper
                          key={field.id}
                          list={card.list}
                          name={`${card.name}.${i}`}
                        />
                      ) : (
                        <InputMapper
                          inputs={card.inputs}
                          key={field.id}
                          name={`${card.name}.${i}`}
                        />
                      )}
                    </GridContainer>
                  ),
                  // TODO: add titleFn to group card(list variant) for generating title
                  title: `List Item ${i + 1}`,
                })),
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
        nodes: advanced
          ? card.list.map(({ gridContainerProps, list, name, title }) => ({
            children: (
              <GridContainer {...gridContainerProps}>
                <AdvancedMapper list={list} name={name} />
              </GridContainer>
            ),
            title,
          }))
          : card.inputs.map(({ gridContainerProps, list, title }) => ({
            children: (
              <GridContainer {...gridContainerProps}>
                <InputMapper inputs={list} />
              </GridContainer>
            ),
            title,
          })),
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
              {advanced ? (
                <AdvancedMapper list={card.list} name={card.name} />
              ) : (
                <InputMapper inputs={card.inputs} name={card.name} />
              )}
            </GridContainer>,
          )}
        </GridItem>
      );
    }
    return null;
  }

  private renderCard_v2 = <
    TFields extends FieldValues,
    TAdvanced extends boolean = true,
  >(
    card: GetCardsImpl<TConfig, TFields, TAdvanced>,
    { index }: RenderFnOptions<TFields>,
  ) => {
    // TODO: pass key to each return jsx element (like normal builder)
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
            key={`card-${index}`}
            name={card.name}
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
                      {'list' in card ? (
                        <AdvancedMapper
                          key={field.id}
                          list={card.list}
                          name={`${card.name}.${i}`}
                        />
                      ) : (
                        <InputMapper
                          inputs={card.inputs}
                          key={field.id}
                          name={`${card.name}.${i}`}
                        />
                      )}
                    </GridContainer>
                  ),
                  // TODO: add titleFn to group card(list variant) for generating title
                  title: `List Item ${i + 1}`,
                })),
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
        nodes: 'list' in card
          ? card.list.map(({ gridContainerProps, list, name, title }) => ({
            children: (
              <GridContainer {...gridContainerProps}>
                <AdvancedMapper list={list} name={name} />
              </GridContainer>
            ),
            title,
          }))
          : card.inputs.map(({ gridContainerProps, list, title }) => ({
            children: (
              <GridContainer {...gridContainerProps}>
                <InputMapper inputs={list} />
              </GridContainer>
            ),
            title,
          })),
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
              {'list' in card ? (
                <AdvancedMapper list={card.list} name={card.name} />
              ) : (
                <InputMapper inputs={card.inputs} name={card.name} />
              )}
            </GridContainer>,
          )}
        </GridItem>
      );
    }
    return null;
  };;

  private renderInput<TFields extends FieldValues>(
    input: GetInputsImpl<TConfig, TFields, true>,
    options: RenderInputOptions<TFields>,
  ) {
    if (listInputGuard<TConfig, TFields>(input)) {
      const { AdvancedMapper, FieldArray, InputMapper } = this;
      const {
        layout: { "grid-container": GridContainer, "grid-item": GridItem },
      } = this.config;

      return (
        <FieldArray<TFields>
          name={input.name}
          render={(fields) => (
            <GridItem {...input.gridProps}>
              <GridContainer {...input.gridContainerProps}>
                {fields.map((field, i) => {
                  if ("inputs" in input) {
                    const dependesOn = input.dependsOn
                      ? Array.isArray(input.dependsOn)
                        ? input.dependsOn
                        : [input.dependsOn]
                      : [];
                    const resolvedDeps = dependesOn.filter((dep) =>
                      ["disable"].includes(dep.type),
                    );
                    return (
                      <InputMapper
                        deps={
                          resolvedDeps.length > 0 ? resolvedDeps : undefined
                        }
                        inputs={input.inputs}
                        key={field.id}
                        name={`${input.name}.${i}`}
                      />
                    );
                  } else if ("list" in input) {
                    return (
                      <AdvancedMapper
                        key={field.id}
                        list={input.list}
                        name={`${input.name}.${i}`}
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
          formMethods={options.formMethods}
          name={input.name}
          {...input.props}
        />
      );
      return input.field ? (
        <Field {...input.field}>{renderedInput}</Field>
      ) : (
        renderedInput
      );
    }

    return null;
  }
  private renderInput_v2 = <TFields extends FieldValues>(
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
          name={resolvedName}
          render={(fields) => (
            <GridItem {...input.gridProps}>
              <GridContainer {...input.gridContainerProps}>
                {fields.map((field, i) => {
                  if ("inputs" in input) {
                    const dependesOn = input.dependsOn
                      ? Array.isArray(input.dependsOn)
                        ? input.dependsOn
                        : [input.dependsOn]
                      : [];
                    const resolvedDeps = dependesOn.filter((dep) =>
                      ["disable"].includes(dep.type),
                    );
                    return (
                      <InputMapper
                        deps={
                          resolvedDeps.length > 0 ? resolvedDeps : undefined
                        }
                        inputs={input.inputs}
                        key={field.id}
                        name={`${resolvedName}.${i}`}
                      />
                    );
                  } else if ("list" in input) {
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
              dependsOn["disable"].length > 0 &&
              conditionArrayCalculator(dependsOn["disable"]),
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
