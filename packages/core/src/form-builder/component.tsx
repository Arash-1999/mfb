import type { FieldValues } from'react-hook-form';

import { Fragment } from "react";
import { useForm } from "react-hook-form";

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
    inputs,
  }: BasicBuilderProps<TConfig>) => {
    const { InputMapper } = this;
    const formMethods = useForm<TFields>();

    const onSubmit = (value: TFields) => {
      console.log(value);
    };

    return (
      <form onSubmit={void formMethods.handleSubmit(onSubmit)}>
        <InputMapper formMethods={formMethods} inputs={inputs} />
        {/* TODO: remove this submit button as configurable option */}
        <button type="submit">SUBMIT</button>
      </form>
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
        <InputMapper formMethods={formMethods}  inputs={inputs}/>
      </GridContainer>
    );
  };
  
  private InputMapper = <TFields extends FieldValues>({
    formMethods,
    inputs,
  }: InputMapperProps<TConfig, TFields>) => {
    return inputs.map((input, i) => (
      <Fragment key={`input-${i}`}>
        {this.renderInput(input, { formMethods })}
      </Fragment>
    ));
  };


  private renderInput<TFields extends FieldValues>(
    input: GetInputs<TConfig, true>,
    options: RenderInputOptions<TFields>,
  ) {
    if (input.type === "list") {
      return "";
    }
    const inputFn = this.config.input[input.type];
    const ThisField = this.config.field;

    if (typeof inputFn === "function" && typeof input.props === "object") {
      const renderedInput = inputFn({
        formMethods: options.formMethods,
        ...input.props,
      });
      return input.field ? (
        <ThisField {...input.field}>{renderedInput}</ThisField>
      ) : (
        renderedInput
      );
    }
    return null;
  }
}

export default FormBuilder;
