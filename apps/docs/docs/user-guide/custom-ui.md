---
description: Implement your ui kit and components
---

# Custom UI

If the provided plugins do not meet your requirements, you have the option to extend existing plugins to better fit your needs.
see [Plugin user guide](/docs/user-guide/plugins#extending-plugins) to learn how you can do that.

For scenarios where ui plugins are inadequate, developers can create custom components from scratch, allowing for complete control over functionality and appearance.

Here is a simple example of different components that should passed in Mfb config. for detailed explaination of each compoment see [here](/docs/category/components).

## Basic Example

#### Input

Inputs are the smallest block of forms, Mfb used them for data-entry. see [Inputs guide](/docs/guides/components/input) for more examples.

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
}: MfbTextFieldProps<TFields>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue as never}
      name={name}
      render={({ field }) => (
        <label>
          {label}
          <input type="text" {...field} />
        </label>
      )}
    />
  );
};
```

### Action

Actions are simply a button that supports `useFieldArray` methods for example append or remove items in [field array](/docs/guides/field-array).

```tsx
import type { ButtonComponentProps } from "@mfb/core";
import type { ReactNode } from "react";

interface MfbButtonProps extends ButtonComponentProps {
  icon?: ReactNode;
  text?: string;
}

const MfbButton = ({ icon, text, ...props }: MfbButtonProps) => {
  return (
    <button {...props}>
      <span>{text}</span> <span>{icon}</span>
    </button>
  );
};
```

### Card

Cards are components for grouping inputs and actions. you can use them in Normal and Advanced [builders](/docs/guides/builders).

Here is simple example of card implementation, but cards could be more complex see [card guide](/docs/guides/components/card) to learn about different scenarios.

```tsx
import type { SimpleCardPropsBase } from "@mfb/core";

interface YourCardProps {}

const MfbBox = ({
  children,
  header,
  paperProps,
  disabled,
}: SimpleCardProps<MfbPaperProps>) => {
  return (
    <div aria-disabled={disabled}>
      <div>
        {typeof header === "string" ? (
          <p>{header}</p>
        ) : (
          <p>{header.left || header.center || header.right}</p>
        )}
      </div>

      {children}
    </div>
  );
};
```
