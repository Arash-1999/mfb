import type {
  BasicBuilderProps,
  BuilderProps,
  FieldArrayEvent,
  FieldArrayProps,
  FormBuilderConfig,
  FormBuilderProps,
  GetInputs,
  InputMapperProps,
  RenderInputOptions,
} from "@/types";
import type { ArrayPath, FieldValues } from "react-hook-form";

import { useMfbFieldArray, useMfbGlobalEvent } from "@/hooks";
import { DisabledHoC, listInputGuard, mergeName, RenderHoC } from "@/utils";
import { eventNames } from "@/utils/events";
import { Fragment, useCallback } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

// NOTE: move logic to separate functions in a better folder structure
class FormBuilder<TConfig extends FormBuilderConfig>
  implements FormBuilderProps<TConfig>
{
  config: TConfig;

  constructor(config: TConfig) {
    this.config = config;
  }

  BasicBuilder = <TFields extends FieldValues>({
    gridContainerProps,
    inputs,
  }: BasicBuilderProps<TConfig, TFields>) => {
    const { InputMapper } = this;
    const { "grid-container": GridContainer } = this.config.layout;
    const formMethods = useForm<TFields>();

    const onSubmit = (value: TFields) => {
      console.log(value);
    };

    return (
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <GridContainer {...gridContainerProps}>
            <InputMapper inputs={inputs} />
          </GridContainer>
          {/* TODO: remove this submit button as configurable option */}
          <button type="submit">SUBMIT</button>
        </form>
      </FormProvider>
    );
  };

  public Builder = <TFields extends FieldValues>({
    cards,
    gridProps,
  }: BuilderProps<TConfig, TFields>) => {
    const formMethods = useForm<TFields>();
    const {
      layout: { "grid-container": GridContainer, "grid-item": GridItem },
    } = this.config;
    const { FieldArray, InputMapper } = this;

    const onSubmit = (value: TFields) => {
      console.log(value);
    };

    return (
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
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
                            <GridItem key={`grid-item-${index}`} {...gridProps}>
                              {node}
                            </GridItem>
                          ),
                          nodes: fields.map((field, i) => ({
                            children: (
                              <GridContainer>
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
                      nodes: card.inputs.map(({ list, title }) => ({
                        children: (
                          <GridContainer>
                            <InputMapper inputs={list} />
                          </GridContainer>
                        ),
                        title,
                      })),
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
                          <InputMapper inputs={card.inputs} name={card.name} />
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
    );
  };

  private FieldArray = <TFields extends FieldValues>({
    name,
    render,
  }: FieldArrayProps<TFields>) => {
    const { action, fields } = useMfbFieldArray<TFields>({
      name: name as ArrayPath<TFields>,
    });

    const handler = useCallback(
      (event: CustomEventInit<FieldArrayEvent<TFields>>) => {
        const { detail } = event;
        // FIX: check form id (it will have conflict in multiple mounted form in one page)
        if (detail && detail.name === name) {
          action(detail.action);
        }
      },

      [action, name],
    );

    useMfbGlobalEvent({ eventName: eventNames["field-array"], handler });

    return render(fields);
  };

  private InputMapper = <TFields extends FieldValues>({
    inputs,
    name, // should passed in list input. optional in card or flat mode inputs.
  }: InputMapperProps<TConfig, TFields>) => {
    const formMethods = useFormContext<TFields>();
    const { "grid-item": GridItem } = this.config.layout;

    return inputs.map((input, i) => {
      // TODO: handle dependency logic
      const dependency = input.dependsOn;
      const key = `input-${i}`;

      const node = (
        <GridItem key={key} {...(input.gridProps || {})}>
          {this.renderInput(
            Object.assign({}, input, {
              name: mergeName(name || "", input.name),
            }),
            { formMethods },
          )}
        </GridItem>
      );
      if (typeof dependency === "undefined") {
        return node;
      } else if (dependency.type === "visibility") {
        return (
          <RenderHoC dependency={dependency} key={key}>
            {node}
          </RenderHoC>
        );
      }
      return node;
    });
  };

  private renderInput<TFields extends FieldValues>(
    input: GetInputs<TConfig, TFields, true>,
    options: RenderInputOptions<TFields>,
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
                  const dependency = input.dependsOn;

                  if (typeof dependency === "undefined") {
                    return (
                      <InputMapper
                        inputs={input.inputs}
                        key={field.id}
                        name={`${input.name}.${i}`}
                      />
                    );
                  } else if (dependency.type === "disable") {
                    return (
                      <InputMapper
                        inputs={input.inputs.map((item) => ({
                          ...item,
                          dependsOn: input.dependsOn,
                        }))}
                        key={field.id}
                        name={`${input.name}.${i}`}
                      />
                    );
                  }
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
      const dependency = input.dependsOn;

      if (typeof dependency !== "undefined" && dependency.type === "disable") {
        return (
          <DisabledHoC
            dependency={dependency}
            render={(props) =>
              inputFn({
                formMethods: options.formMethods,
                name: input.name,
                ...input.props,
                ...props,
              })
            }
          />
        );
      }

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
