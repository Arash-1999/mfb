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
import type { FieldValues } from "react-hook-form";

import { useMfbFieldArray, useMfbGlobalEvent } from "@/hooks";
import { listInputGuard, mergeName } from "@/utils";
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
  }: BasicBuilderProps<TConfig>) => {
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
            <InputMapper formMethods={formMethods} inputs={inputs} />
          </GridContainer>
          {/* TODO: remove this submit button as configurable option */}
          <button type="submit">SUBMIT</button>
        </form>
      </FormProvider>
    );
  };

  public Builder = <TFields extends FieldValues>({
    cards,
  }: BuilderProps<TConfig>) => {
    const formMethods = useForm<TFields>();
    const {
      layout: { "grid-container": GridContainer },
    } = this.config;
    // const { InputMapper } = this;

    const onSubmit = (value: TFields) => {
      console.log(value);
    };

    return (
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <GridContainer>
            {cards.map((card, index) => {
              if (card.isGroup) {
                return <Fragment key={index}></Fragment>;
              } else {
                return <Fragment key={index}></Fragment>;
              }
            })}
          </GridContainer>
          {/* <GridContainer> */}
          {/*   <InputMapper formMethods={formMethods} inputs={inputs} /> */}
          {/* </GridContainer> */}
        </form>
      </FormProvider>
    );
  };

  private FieldArray = <TFields extends FieldValues>({
    gridContainerProps = {},
    gridProps = {},
    inputs,
    name,
  }: FieldArrayProps<TConfig, TFields>) => {
    const formMethods = useFormContext<TFields>();
    const {
      layout: { "grid-container": GridContainer, "grid-item": GridItem },
    } = this.config;
    const { InputMapper } = this;
    const { action, fields } = useMfbFieldArray<TFields>({ name });

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

    return (
      <GridItem {...gridProps}>
        <GridContainer {...gridContainerProps}>
          {fields.map((field, i) => (
            <InputMapper
              formMethods={formMethods}
              inputs={inputs}
              key={field.id}
              name={`${name}.${i}`}
            />
          ))}
        </GridContainer>
      </GridItem>
    );
  };

  private InputMapper = <TFields extends FieldValues>({
    formMethods,
    inputs,
    name, // should passed in list input. optional in card or flat mode inputs.
  }: InputMapperProps<TConfig, TFields>) => {
    const { "grid-item": GridItem } = this.config.layout;

    return inputs.map((input, i) => (
      <GridItem key={`input-${i}`} {...(input.gridProps || {})}>
        {this.renderInput(
          Object.assign({}, input, {
            name: mergeName(name || "", input.name),
          }),
          { formMethods },
        )}
      </GridItem>
    ));
  };

  private renderInput<TFields extends FieldValues>(
    input: GetInputs<TConfig, true>,
    options: RenderInputOptions<TFields>,
  ) {
    if (listInputGuard<TConfig>(input)) {
      const { FieldArray } = this;

      return (
        <FieldArray
          gridContainerProps={input.gridContainerProps}
          gridProps={input.gridProps}
          inputs={input.inputs}
          name={input.name}
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
