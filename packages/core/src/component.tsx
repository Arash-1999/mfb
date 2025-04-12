import type {
  BasicBuilderProps,
  BuilderProps,
  DependencyManagerProps,
  FieldArrayEvent,
  FieldArrayProps,
  FormBuilderConfig,
  FormBuilderContext,
  FormBuilderProps,
  GetInputs,
  InputMapperProps,
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
  Fragment,
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

  BasicBuilder = <TFields extends FieldValues>({
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
    gridProps,
    id,
    onSubmit,
    options,
  }: BuilderProps<TConfig, TFields, TFormId>) => {
    const formMethods = useForm<TFields>(options);
    const {
      layout: { "grid-container": GridContainer, "grid-item": GridItem },
    } = this.config;
    const { Context, FieldArray, InputMapper } = this;

    return (
      <Context.Provider
        value={{
          id,
        }}
      >
        <FormProvider {...formMethods}>
          <form id={id} onSubmit={formMethods.handleSubmit(onSubmit)}>
            <GridContainer {...(gridProps || {})}>
              {cards.map((card, index) => {
                if (card.isGroup) {
                  const {
                    card: { group },
                  } = this.config;

                  if (!group) return null;
                  const renderGroup = group[card.type];

                  if (card.variant === "list") {
                    return (
                      <FieldArray<TFields>
                        key={index}
                        name={card.name}
                        render={(fields) => {
                          return renderGroup({
                            addGrid: (node, index) => (
                              <GridItem
                                key={`grid-item-${index}`}
                                {...card.gridProps}
                              >
                                {node}
                              </GridItem>
                            ),
                            nodes: fields.map((field, i) => ({
                              children: (
                                <GridContainer {...card.gridContainerProps}>
                                  <InputMapper
                                    inputs={card.inputs}
                                    key={field.id}
                                    name={`${card.name}.${i}`}
                                  />
                                </GridContainer>
                              ),
                              // TODO: add titleFn to group card(list variant) for generating title
                              title: `List Item ${i + 1}`,
                            })),
                          });
                        }}
                      />
                    );
                  }

                  // TODO: move this logic to another function and use it for list variant
                  return (
                    <Fragment key={index}>
                      {renderGroup({
                        addGrid: (node, index) => (
                          <GridItem
                            key={`grid-item-${index}`}
                            {...card.gridProps}
                          >
                            {node}
                          </GridItem>
                        ),
                        nodes: card.inputs.map(
                          ({ gridContainerProps, list, title }) => ({
                            // TODO: add gridContainerProps
                            children: (
                              <GridContainer {...gridContainerProps}>
                                <InputMapper inputs={list} />
                              </GridContainer>
                            ),
                            title,
                          })
                        ),
                      })}
                    </Fragment>
                  );
                } else {
                  const {
                    card: { simple },
                  } = this.config;

                  const renderCard = simple[card.type];

                  return (
                    <GridItem key={index} {...(card.gridProps || {})}>
                      {renderCard({
                        children: (
                          <GridContainer {...(card.gridContainerProps || {})}>
                            <InputMapper
                              inputs={card.inputs}
                              name={card.name}
                            />
                          </GridContainer>
                        ),
                        header: card.header,
                      })}
                    </GridItem>
                  );
                }
              })}
            </GridContainer>
            {/* TODO: remove this submit button as configurable option */}
            <button type="submit">SUBMIT</button>
          </form>
        </FormProvider>
      </Context.Provider>
    );
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

  private InputMapper = <TFields extends FieldValues>({
    inputs,
    name, // should passed in list input. optional in card or flat mode inputs.
  }: InputMapperProps<TConfig, TFields>) => {
    const { DependencyManager } = this;
    const formMethods = useFormContext<TFields>();
    const { "grid-item": GridItem } = this.config.layout;

    return inputs.map((input, i) => {
      const dependency = input.dependsOn;
      const key = `input-${i}`;

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
    });
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
    const inputFn = components[input.type];

    if (typeof inputFn === "function" && typeof input.props === "object") {
      const renderedInput = inputFn({
        formMethods: options.formMethods,
        name: input.name,
        ...input.props,
      });
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
