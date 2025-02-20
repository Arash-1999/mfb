import type { FieldValues } from "react-hook-form";

import { FormProvider, useForm } from "react-hook-form";

import type {
  BasicBuilderProps,
  BuilderProps,
  FormBuilderConfig,
  FormBuilderProps,
  GetInputs,
  InputMapperProps,
  RenderInputOptions,
} from "./types";

// PERF: move logic to separate functions in a better folder structure
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

    console.log(gridContainerProps);
    return (
      <FormProvider {...formMethods}>
        <form onSubmit={void formMethods.handleSubmit(onSubmit)}>
          <GridContainer {...gridContainerProps}>
            <InputMapper formMethods={formMethods} inputs={inputs} />
          </GridContainer>
          {/* TODO: remove this submit button as configurable option */}
          <button type="submit">SUBMIT</button>
        </form>
      </FormProvider>
    );
  };

  public Builder = <TData extends FieldValues>({
    inputs,
  }: BuilderProps<TConfig>) => {
    const {
      layout: { "grid-container": GridContainer },
    } = this.config;
    const { InputMapper } = this;
    const formMethods = useForm<TData>();

    return (
      <GridContainer>
        <InputMapper formMethods={formMethods} inputs={inputs} />
      </GridContainer>
    );
  };

  private InputMapper = <TFields extends FieldValues>({
    formMethods,
    inputs,
  }: InputMapperProps<TConfig, TFields>) => {
    const { "grid-item": GridItem } = this.config.layout;

    return inputs.map((input, i) => (
      <GridItem key={`input-${i}`} {...(input.gridProps || {})}>
        {this.renderInput(input, { formMethods })}
      </GridItem>
    ));
  };

  private renderInput<TFields extends FieldValues>(
    input: GetInputs<TConfig, true>,
    options: RenderInputOptions<TFields>,
  ) {
    if (input.type === "list") {
      return "";
    }
    const {
      layout: { field: Field },
    } = this.config;
    const inputFn = this.config.input[input.type];

    if (typeof inputFn === "function" && typeof input.props === "object") {
      const renderedInput = inputFn({
        formMethods: options.formMethods,
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
