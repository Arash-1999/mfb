import { Fragment } from "react";
import type {
  BasicBuilderProps,
  BuilderProps,
  FormBuilderConfig,
  FormBuilderProps,
  GetInputs,
  InputMapperProps,
  RenderInputOptions,
} from "./types";
import type { FieldValues } from'react-hook-form';
import { useForm } from "react-hook-form";

// PERF: move logic to separate functions in a better folder structure
class FormBuilder<TConfig extends FormBuilderConfig>
  implements FormBuilderProps<TConfig>
{
  config: TConfig;

  constructor(config: TConfig) {
    this.config = config;
  }

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
        <InputMapper inputs={inputs} formMethods={formMethods} />
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

  BasicBuilder = <TFields extends FieldValues>({
    inputs,
  }: BasicBuilderProps<TConfig>) => {
    const { InputMapper } = this;
    const formMethods = useForm<TFields>();

    const onSubmit = (value: TFields) => {
      console.log(value);
    };
    return (
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <InputMapper inputs={inputs} formMethods={formMethods} />
        {/* TODO: remove this submit button as configurable option */}
        <button type="submit">SUBMIT</button>
      </form>
    );
  };
}

export default FormBuilder;
