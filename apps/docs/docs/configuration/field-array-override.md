---
description: Dynamic List Component
sidebar_positon: 3
---

# Field array override

## What is Field array override?

As you see in [field array]() page there is 2 scenarios that MFb creates dynamic array.
The default behavior of field array is a `useFieldArray` hook, an event listener for calling its methods and renders fields based on passed items.

FieldArray is a react component that will get props with type `FieldArrayOverrideProps`.

```tsx
interface FielArrayOverrideProps {
  id: TFormId;
  disabled: boolean | undefined;
  fieldArray: FieldArrayValues<TFields>;
  name: string;
  renderItem: (
    item: UseFieldArrayReturn<TFields>["fields"][number],
    index: number,
    array: Array<UseFieldArrayReturn<TFields>["fields"][number]>,
  ) => JSX.Element;
  render: (fields: UseFieldArrayReturn<TFields>["fields"]) => JSX.Element;
}
```

## Example

In simplest form FieldArray component is like this:

```tsx
import { FieldArrayOverrideProps } from "@mfb/core";
import { useEffect } from "react";
import {
  useFieldArray,
  type ArrayPath,
  type FieldValues,
} from "react-hook-form";

const MfbCustomFieldArray = <TFields extends FieldValues>({
  // disabled,
  // id,
  fieldArray,
  name,
  renderItem,
  render,
}: FieldArrayOverrideProps<TFields>) => {
  const { fields, append } = useFieldArray<TFields>({
    name: name as ArrayPath<TFields>,
  });

  return (
    <div>
      <div>
        <button
          onClick={() => {
            append({
              /* ... default value */
            });
          }}
        >
          APPEND
        </button>
      </div>
      {render(fields)}
    </div>
  );
};

export { MfbCustomFieldArray };
```

If you want to render extra element in each filed array item you can use `renderItem` instead of `render`.

```tsx
<div>
  {fields.map((item, index, array) => (
    <div>
      {renderItem(item, index, array)}
      <button onClick={() => remove(index)}>REMOVE</button>
    </div>
  ))}
</div>
```

## Usage

### Component scope

Any field array component described in [field array]() has optional `component` field that accepts `FieldArrayOverride` component.

```tsx
import { FB } from "./path/to/your/instance";

interface FormValues {
  "field-array-1": Array<{
    "field-1": string;
    "field-2": string;
  }>;
}

const Page = () => {
  const handleSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <FB.BaiscBuilder<FormValues>
      id="form-id"
      inputs={[
        {
          component: MfbCustomFieldArray,
          inputs: [
            {
              name: "field-2",
              props: {},
              type: "text",
            },
            {
              name: "field-1",
              props: {},
              type: "text",
            },
          ],
          name: "field-array-1",
          type: "list",
        },
      ]}
      onSubmit={handleSubmit}
    />
  );
};
```

### Global Scope

If you want override all filed array component in your `FormBuilder` instance you can pass it as second argument to its constructor.

```tsx
const FB = new FormBuilder<Config, FormId>(config, {
  FieldArray: MfbCustomFieldArray,
});
```
