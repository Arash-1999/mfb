import type {
  AdvancedBuilderProps,
  AdvancedMapperProps,
  BasicBuilderProps,
  BuilderProps,
  DependencyManagerProps,
  FieldArrayEvent,
  FieldArrayProps,
  FormBuilderConfig,
  FormBuilderContext,
  FormBuilderProps,
  GetInputs,
  InputMapFnOptions,
  InputMapperProps,
  RenderCardProps,
  RenderInputOptions,
} from "@/types";
import type { Context } from "react";
import type { ArrayPath, FieldValues } from "react-hook-form";

import { useMfbFieldArray, useMfbGlobalEvent } from "@/hooks";
import {
  conditionArrayCalculator,
  createDependencyStructure,
  listInputGuard,
  mergeName,
  RenderHoC,
} from "@/utils";
import { eventNames } from "@/utils/events";
import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
} from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";

// NOTE: move logic to separate functions in a better folder structure
class FormBuilder<
  TConfig extends FormBuilderConfig,
  TFormId extends string = string,
> implements FormBuilderProps<TConfig>
{
  config: TConfig;
  Context: Context<FormBuilderContext<TFormId> | null>;

  constructor(config: TConfig) {
    this.config = config;
    this.Context = createContext<FormBuilderContext<TFormId> | null>(null);
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

    return (
      <Context.Provider
        value={{
          id,
        }}
      >
        <FormProvider {...formMethods}>
          <form id={id} onSubmit={formMethods.handleSubmit(onSubmit)}>
            <GridContainer {...gridContainerProps}>
              <InputMapper inputs={inputs} />
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
    const { Context } = this;

    return (
      <Context.Provider
        value={{
          id,
        }}
      >
        <FormProvider {...formMethods}>
          <form id={id} onSubmit={formMethods.handleSubmit(onSubmit)}>
            <GridContainer {...(gridContainerProps || {})}>
              {cards.map((card, index) =>
                this.renderCard({ advanced: false, card, index })
              )}
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
    const { inputMapFn, renderCard } = this;

    return list.map((item, index) => {
      if (item.mode === "card") {
        return renderCard({ advanced: true, card: item, index });
      } else if (item.mode === "input") {
        return inputMapFn(item, index, { formMethods, name });
      }
      return null;
    });
  };

  private DependencyManager = <TFields extends FieldValues>({
    dependsOn,
    input,
  }: DependencyManagerProps<TConfig, TFields>) => {
    const {
      layout: { "grid-item": GridItem },
    } = this.config;
    const formMethods = useFormContext<TFields>();
    const value = useWatch<TFields>({
      control: formMethods.control,
      name: Array.isArray(dependsOn)
        ? dependsOn.map((dep) => dep.path)
        : [dependsOn.path],
    });

    const dependencies = useMemo(() => {
      return createDependencyStructure<TFields>(dependsOn, value);
    }, [value, dependsOn]);

    return (
      <RenderHoC dependency={dependencies["visibility"]}>
        <GridItem {...input.gridProps}>
          {listInputGuard<TConfig, TFields>(input)
            ? this.renderInput(input, { formMethods })
            : this.renderInput(
                Object.assign({}, input, {
                  props: Object.assign({}, input.props, {
                    deps: Array.isArray(dependsOn)
                      ? dependsOn.reduce<Record<string, unknown>>(
                          (acc, cur, i) => ({
                            ...acc,
                            [cur.id]: value[i],
                          }),
                          {}
                        )
                      : {
                          [dependsOn.id]: value[0],
                        },
                    disabled:
                      dependencies["disable"].length > 0 &&
                      conditionArrayCalculator(dependencies["disable"]),
                  }),
                }),
                { formMethods }
              )}
        </GridItem>
      </RenderHoC>
    );
  };

  private useMfbContext = () => {
    const { Context } = this;
    return useContext(Context);
  };

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
      [action, id, name]
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
    { formMethods, name }: InputMapFnOptions<TFields>
  ) => {
    const { DependencyManager } = this;
    const {
      layout: { "grid-item": GridItem },
    } = this.config;

    const dependency = input.dependsOn;
    const key = `input-${index}`;

    const node = (
      <GridItem key={key} {...(input.gridProps || {})}>
        {this.renderInput(
          Object.assign({}, input, {
            name: mergeName(name || "", input.name),
          }),
          { formMethods }
        )}
      </GridItem>
    );

    if (typeof dependency === "undefined") {
      return node;
    } else {
      return (
        <DependencyManager
          dependsOn={dependency}
          input={Object.assign({}, input, {
            name: mergeName(name || "", input.name),
          })}
          key={key}
        />
      );
    }
  };

  private InputMapper = <TFields extends FieldValues>({
    inputs,
    name, // should passed in list input. optional in card or flat mode inputs.
  }: InputMapperProps<TConfig, TFields>) => {
    const formMethods = useFormContext<TFields>();

    return inputs.map((input, i) =>
      this.inputMapFn(input, i, { formMethods, name })
    );
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

      return createElement(RenderGroupCard, {
        addGrid: (node, index) => (
          <GridItem key={`grid-item-${index}`} {...card.gridProps}>
            {node}
          </GridItem>
        ),
        key: `card-${index}`,
        nodes: advanced
          ? card.list.map(({ gridContainerProps, list, title }) => ({
              children: (
                <GridContainer {...gridContainerProps}>
                  <AdvancedMapper list={list} />
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
            </GridContainer>
          )}
        </GridItem>
      );
    }
    return null;
  };

  private renderInput<TFields extends FieldValues>(
    input: GetInputs<TConfig, TFields, true>,
    options: RenderInputOptions<TFields>
  ) {
    if (listInputGuard<TConfig, TFields>(input)) {
      const { FieldArray, InputMapper } = this;
      const {
        layout: { "grid-container": GridContainer, "grid-item": GridItem },
      } = this.config;

      return (
        <FieldArray
          name={input.name}
          render={(fields) => (
            <GridItem {...input.gridProps}>
              <GridContainer {...input.gridContainerProps}>
                {fields.map((field, i) => {
                  // TODO: add options to change InputMapper to AdvancedMapper
                  return (
                    <InputMapper
                      inputs={input.inputs}
                      key={field.id}
                      name={`${input.name}.${i}`}
                    />
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
}

export default FormBuilder;
