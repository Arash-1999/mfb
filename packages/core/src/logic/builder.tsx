import type {
  ActionInput,
  AdvancedBuilderProps,
  AdvancedMapperProps,
  BasicBuilderProps,
  BuilderProps,
  CustomElement,
  FieldArrayOverrideProps,
  FieldArrayProps,
  FormBuilderConfig,
  FormBuilderOverrides,
  FormLayoutProps,
  GetCardsImpl,
  GetInputsImpl,
  InputMapperProps,
  ItemArray,
  RenderCardItemProps,
  RenderFnOptions,
} from "@mfb/types";
import type { PropsWithChildren } from "react";
import type { FieldValues } from "react-hook-form";

import { FieldArrayContext, useFieldArrayContext } from "@/context";
import { MfbItemProvider } from "@/providers";
import {
  convertDepsToObject,
  customElementGuard,
  DefaultValue,
  dispatchFieldArray,
  listActionGuard,
  listInputGuard,
  mergeName,
} from "@/utils";
import { isNullOrUndefined } from "@mfb/utils";
import { createElement, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { DependencyManagement } from "./dependency-management";
import { MfbFieldArray } from "./field-array";

class FormBuilder<
  TConfig extends FormBuilderConfig,
  TFormId extends string = string,
> extends DependencyManagement<TConfig, TFormId> {
  constructor(config: TConfig, overrides?: FormBuilderOverrides) {
    super(config, overrides);
  }

  protected useDefaultValue = <
    TConfig extends FormBuilderConfig,
    TFields extends FieldValues,
  >(
    config: TConfig,
    list: ItemArray<TConfig, TFields>,
  ) => {
    return useMemo(() => {
      const _defaultValues = new DefaultValue<TConfig, TFields>(
        config,
        list,
        this.conditionCalculator,
      );
      return {
        defaultValues: _defaultValues.result,
        fieldArray: _defaultValues.fieldArray,
      };
    }, [config, list]);
  };

  private useValidation = <TFields extends FieldValues>(
    items: ItemArray<TConfig, TFields>,
  ) => {
    const resolver = useMemo(() => {
      if (isNullOrUndefined(this.config.validator)) {
        return undefined;
      }

      return this.config.validator.resolve<TConfig, TFields>(items);
    }, [items]);

    return resolver;
  };

  public AdvancedBuilder = <TFields extends FieldValues>({
    footer,
    gridContainerProps,
    header,
    id,
    list,
    onSubmit,
    options,
  }: AdvancedBuilderProps<TConfig, TFields, TFormId>) => {
    const { AdvancedMapper, Context, FormLayout } = this;
    const { "grid-container": GridContainer } = this.config.layout;

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

    const defaultValues = this.useDefaultValue(this.config, resolvedList);
    const resolver = this.useValidation<TFields>(resolvedList);
    const formMethods = useForm<TFields>({
      defaultValues: this.options.genDefaultValues
        ? defaultValues.defaultValues
        : undefined,
      resolver,
      ...options,
    });

    return (
      <Context.Provider
        value={{
          defaultValues: defaultValues.defaultValues,
          fieldArray: defaultValues.fieldArray,
          id,
        }}
      >
        <FormProvider {...formMethods}>
          <form id={id} onSubmit={formMethods.handleSubmit(onSubmit)}>
            <FormLayout footer={footer} header={header}>
              <MfbItemProvider>
                <GridContainer {...gridContainerProps}>
                  <AdvancedMapper list={resolvedList} />
                </GridContainer>
              </MfbItemProvider>
            </FormLayout>
          </form>
        </FormProvider>
      </Context.Provider>
    );
  };

  public BasicBuilder = <TFields extends FieldValues>({
    footer,
    gridContainerProps,
    header,
    id,
    inputs,
    onSubmit,
    options,
  }: BasicBuilderProps<TConfig, TFields, TFormId>) => {
    const { Context, FormLayout, InputMapper } = this;
    const { "grid-container": GridContainer } = this.config.layout;

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

    const defaultValues = this.useDefaultValue(this.config, resolvedInputs);
    const resolver = this.useValidation<TFields>(resolvedInputs);
    const formMethods = useForm<TFields>({
      defaultValues: this.options.genDefaultValues
        ? defaultValues.defaultValues
        : undefined,
      resolver,
      ...options,
    });

    return (
      <Context.Provider
        value={{
          defaultValues: defaultValues.defaultValues,
          fieldArray: defaultValues.fieldArray,
          id,
        }}
      >
        <FormProvider {...formMethods}>
          <form id={id} onSubmit={formMethods.handleSubmit(onSubmit)}>
            <FormLayout footer={footer} header={header}>
              <MfbItemProvider>
                <GridContainer {...gridContainerProps}>
                  <InputMapper inputs={resolvedInputs} />
                </GridContainer>
              </MfbItemProvider>
            </FormLayout>
          </form>
        </FormProvider>
      </Context.Provider>
    );
  };

  public Builder = <TFields extends FieldValues>({
    cards,
    footer,
    gridContainerProps,
    header,
    id,
    onSubmit,
    options,
  }: BuilderProps<TConfig, TFields, TFormId>) => {
    const {
      layout: { "grid-container": GridContainer },
    } = this.config;
    const {
      Context,
      DependencyManager,
      FormLayout,
      renderCard,
      renderCustomElement,
    } = this;

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

    const resolver = this.useValidation<TFields>(resolvedCards);
    const defaultValues = this.useDefaultValue(this.config, resolvedCards);
    const formMethods = useForm<TFields>({
      defaultValues: this.options.genDefaultValues
        ? defaultValues.defaultValues
        : undefined,
      resolver,
      ...options,
    });

    return (
      <Context.Provider
        value={{
          defaultValues: defaultValues.defaultValues,
          fieldArray: defaultValues.fieldArray,
          id,
        }}
      >
        <FormProvider {...formMethods}>
          <form id={id} onSubmit={formMethods.handleSubmit(onSubmit)}>
            <FormLayout footer={footer} header={header}>
              <MfbItemProvider>
                <GridContainer {...(gridContainerProps || {})}>
                  {resolvedCards.map((item, index) => {
                    if (customElementGuard<TConfig, TFields>(item)) {
                      return (
                        <DependencyManager<
                          TFields,
                          CustomElement<TConfig, TFields>
                        >
                          component={item}
                          getItemInfo={this.childrenPath.customElement}
                          index={index}
                          key={`card-${index}`}
                          render={renderCustomElement}
                        />
                      );
                    }

                    return (
                      <DependencyManager<
                        TFields,
                        | GetCardsImpl<TConfig, TFields, false, true>
                        | GetCardsImpl<TConfig, TFields, false>
                      >
                        component={item}
                        getItemInfo={this.childrenPath.card}
                        index={index}
                        key={`card-${index}`}
                        render={renderCard}
                      />
                    );
                  })}
                </GridContainer>
              </MfbItemProvider>
            </FormLayout>
          </form>
        </FormProvider>
      </Context.Provider>
    );
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
    const { id } = this.useMfbContext<TFields>();
    const { index } = useFieldArrayContext();

    const handleClick = () => {
      switch (action.actionType) {
        case "append":
        case "prepend":
          dispatchFieldArray<TFields>(id, action.name, {
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
    const {
      DependencyManager,
      renderAction,
      renderCard,
      renderCustomElement,
      renderInput,
    } = this;

    return list.map((_item, index) => {
      if (customElementGuard<TConfig, TFields>(_item)) {
        return (
          <DependencyManager<TFields, CustomElement<TConfig, TFields>>
            component={_item}
            getItemInfo={this.childrenPath.customElement}
            index={index}
            key={`card-${index}`}
            render={renderCustomElement}
          />
        );
      }

      const item = typeof _item === "function" ? _item() : _item;

      if (item.mode === "card") {
        return (
          <DependencyManager<
            TFields,
            | GetCardsImpl<TConfig, TFields, true, true>
            | GetCardsImpl<TConfig, TFields, true>
          >
            component={item}
            getItemInfo={this.childrenPath.card}
            index={index}
            key={`card-${index}`}
            name={name}
            render={renderCard}
          />
        );
      }
      if (item.mode === "input") {
        if (listActionGuard<TConfig, TFields>(item)) {
          return (
            <DependencyManager<TFields, ActionInput<TConfig, TFields>>
              component={item}
              getItemInfo={this.childrenPath.action}
              index={index}
              key={`action-${index}`}
              name={name}
              render={renderAction}
              withGrid
            />
          );
        }
        return (
          <DependencyManager<TFields, GetInputsImpl<TConfig, TFields>>
            component={item}
            getItemInfo={this.childrenPath.input}
            index={index}
            key={`input-${index}`}
            name={name}
            render={renderInput}
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

  private FieldArray = <TFields extends FieldValues>({
    component,
    disabled,
    name,
    render,
    // TODO: remvoe omit and create a new type for internal field array
  }: Omit<FieldArrayProps<TFields>, "fieldArray">) => {
    const { FieldArrayOverride } = this;
    const { fieldArray, id } = this.useMfbContext<TFields>();

    const props: FieldArrayOverrideProps<TFields, TFormId> = {
      disabled,
      fieldArray,
      id,
      name,
      render,
    };

    if (component) {
      return createElement(component<TFields, TFormId>, props);
    }

    if (FieldArrayOverride) {
      return <FieldArrayOverride<TFields, TFormId> {...props} />;
    } else {
      return <MfbFieldArray<TFields, TFormId> {...props} />;
    }
  };

  private FormLayout = ({
    children,
    footer,
    header,
  }: PropsWithChildren<FormLayoutProps>) => {
    return (
      <>
        {!isNullOrUndefined(header) ? createElement(header) : null}

        {children}

        {!isNullOrUndefined(footer) ? createElement(footer) : null}
      </>
    );
  };

  private InputMapper = <TFields extends FieldValues>({
    inputs,
    name, // should passed in list input. optional in card or flat mode inputs.
  }: InputMapperProps<TConfig, TFields>) => {
    const {
      DependencyManager,
      renderAction,
      renderCustomElement,
      renderInput,
    } = this;

    return inputs.map((input, i) => {
      if (customElementGuard<TConfig, TFields>(input)) {
        return (
          <DependencyManager<TFields, CustomElement<TConfig, TFields>>
            component={input}
            getItemInfo={this.childrenPath.customElement}
            index={i}
            key={`card-${i}`}
            render={renderCustomElement}
          />
        );
      }
      if (listActionGuard<TConfig, TFields>(input)) {
        return (
          <DependencyManager<TFields, ActionInput<TConfig, TFields>>
            component={input}
            getItemInfo={this.childrenPath.action}
            index={i}
            key={`input-${i}`}
            name={name}
            render={renderAction}
            withGrid
          />
        );
      }
      return (
        <DependencyManager<TFields, GetInputsImpl<TConfig, TFields>>
          component={input}
          getItemInfo={this.childrenPath.input}
          index={i}
          key={`input-${i}`}
          name={name}
          render={renderInput}
          withGrid
        />
      );
    });
  };

  private renderAction = <TFields extends FieldValues>(
    action: ActionInput<TConfig, TFields>,
    { dependsOn }: RenderFnOptions<TConfig, TFields>,
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
    { dependsOn, index, name }: RenderFnOptions<TConfig, TFields>,
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
            component={card.element}
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
                required: card.required,
                validation: card.validation,
                ...card.props,
              })
            }
          />
        );
      }

      const { DependencyManager, renderCardItem } = this;
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
            ? card.list.map((component, cardIndex) => ({
                children: (
                  <DependencyManager<
                    TFields,
                    RenderCardItemProps<TConfig, TFields>
                  >
                    component={{ advanced: true, ...component }}
                    getItemInfo={() => this.childrenPath.cardItem(true)}
                    index={cardIndex}
                    name={name}
                    render={renderCardItem}
                  />
                ),
                title: component.title,
              }))
            : card.inputs.map((component, cardIndex) => ({
                children: (
                  <DependencyManager<
                    TFields,
                    RenderCardItemProps<TConfig, TFields>
                  >
                    component={{ advanced: false, ...component }}
                    getItemInfo={() => this.childrenPath.cardItem(true)}
                    index={cardIndex}
                    name={resolvedName}
                    render={renderCardItem}
                  />
                ),
                required: component.required,
                title: component.title,
                validation: component.validation,
              })),
        required: card.required,
        validation: card.validation,
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
              required: card.required,
              validation: card.validation,
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

  private renderCardItem = <TFields extends FieldValues>(
    cardItem: RenderCardItemProps<TConfig, TFields>,
    { name }: RenderFnOptions<TConfig, TFields>,
  ) => {
    const {
      layout: { "grid-container": GridContainer },
    } = this.config;
    const { AdvancedMapper, InputMapper } = this;

    return (
      <GridContainer {...cardItem.gridContainerProps}>
        {cardItem.advanced ? (
          <AdvancedMapper
            list={cardItem.list}
            name={mergeName(name || "", cardItem.name || "")}
          />
        ) : (
          <InputMapper
            inputs={cardItem.list}
            name={mergeName(name || "", cardItem.name || "")}
          />
        )}
      </GridContainer>
    );
  };

  private renderCustomElement = <TFields extends FieldValues>(
    element: CustomElement<TConfig, TFields>,
    { dependsOn, formMethods, index, name }: RenderFnOptions<TConfig, TFields>,
  ) => {
    const resolvedName = mergeName(name || "", element.name);

    const children = createElement(element.element<TFields>, {
      deps: convertDepsToObject(dependsOn["bind-value"]),
      disabled: dependsOn.disable,
      formMethods,
      index: index,
      name: resolvedName,
      required: element.required,
      validation: element.validation,
    });

    if (element.gridProps) {
      const {
        layout: { "grid-item": GridItem },
      } = this.config;

      return <GridItem {...element.gridProps}>{children}</GridItem>;
    }

    return children;
  };

  private renderInput = <TFields extends FieldValues>(
    input: GetInputsImpl<TConfig, TFields, true>,
    { dependsOn, formMethods, name }: RenderFnOptions<TConfig, TFields>,
  ) => {
    const resolvedName = mergeName(name || "", input.name);
    if (listInputGuard<TConfig, TFields>(input)) {
      const { AdvancedMapper, FieldArray, InputMapper } = this;
      const {
        layout: { "grid-container": GridContainer, "grid-item": GridItem },
      } = this.config;

      return (
        <FieldArray<TFields>
          component={input.element}
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
          required={input.required}
          validation={input.validation}
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
