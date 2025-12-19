---
description: Date-entry components
sidebar_position: 2
---

# Input

## What is Input component?

In Mfb input is simply a react component that accepts `InputProps`.

```tsx
type InputProps<TFields extends FieldValues, TProps> = TProps & {
  formMethods: UseFormReturn<TFields>;
  name: Path<TFields>;

  deps?: Record<PropertyKey, unknown>;
  disabled?: boolean;

  required?: boolean;
  validation?: Validation<string>;
};
```

:::info
Any extra properties you defined in InputProps should be filled when using in builders. other props will be passed by Mfb.
:::

#### `required`, `validation`

If you are using [validation plugins](/docs/guides/validaiton) you can use them for validation visulaization.
for example put \*(asterisk) character for requried fields in their label.

For scenarios without `resolver` you can use them for writting custom validate function or rules in your component.

#### `disabled`

This property will be filled with [Dependencies](/docs/guides/dependencies).

#### `deps`

This property will be used for data binding. see [Dependency `bind-value`](/docs/guides/dependencies#data-binding) for more details.

## Example

You can use any provided api by [react hook form](https://react-hook-form.com/) in your inputs. here you can see basic usage and structure of input component.

```tsx
import type { InputProps } from "@mfb/core";
import type { FieldValues } from "react-hook-form";

import { Controller } from "react-hook-form";

interface YourInputProps {
  label: string;
}

type MfbTextFieldProps<TFields extends FieldValues> = InputProps<
  TFields,
  YourInputProps
>;

const MfbTextField = <TFields extends FieldValues = FieldValues>({
  defaultValue,
  disabled,
  label,
  name,
  required,
}: MfbTextFieldProps<TFields>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue as never}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <label>
          {label} {required ? "*" : null}
          <input type="text" {...field} />
          {error ? <p>{error.message}</p> : null}
        </label>
      )}
    />
  );
};
```

## Configuration

Now you should pass defined inputs to `FormBuilder` [Configuration]().

```tsx
const config = {
  inputs: {
    components: {
      text: MfbTextField,
    },
    defaultValues: {
      text: "",
    },
  },
  // ... other configurations
} satisfies FormBuilderConfig;
```

## Usage

```tsx
<FB.BasicBuilder<FormValue>
  inputs={[
    {
      type: "text",
      name: "key-1",
      props: {
        label: "First Input",
      },
      required: true,
    },
  ]}
  onSubimt={(data) => {
    console.log(data);
  }}
/>
```
