---
description: How to work with dynamic Array
---

# Field Array

Field array is a special component for working with dyanmic arrays in forms. It's uses `useFieldArray` for handling values and mutating them.

In Mfb cards and inputs can be array.

### 1. Inputs

for field array input you should use `type: 'list'` and pass inputs to it.

:::info
In basic and normal builders inputs should be in `inputs` field. in advanced builder it should passed to `list` field.
:::

basic and normal builder:

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

Advanced builder:

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
    <FB.AdvancedBuilder<FormValues>
      id="form-id"
      list={[
        {
          list: [
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
          mode: "input", // difference is here
          name: "field-array-1",
          type: "list",
        },
      ]}
      onSubmit={handleSubmit}
    />
  );
};
```

### 2. Cards

Only group cards can be field arrays. To do that you should pass `variant: 'list'` to [group card](/docs/guides/components/card) item.

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
    <FB.AdvancedBuilder<FormValues>
      id="form-id"
      list={[
        {
          isGroup: true,
          list: [
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
          mode: "card",
          name: "field-array-1",
          type: "tabs",
          variant: "list",
        },
      ]}
      onSubmit={handleSubmit}
    />
  );
};
```

## Actions

by default field array doesn't have buttons for mutating arrays, There are 3 ways to mutate arrays.

### 1. Action items

Mfb provide input with `field-array-action` type to call `useFieldArray` methods.

you should define `actionType` and `name` of target field array in action item.
it supports `"append" | "prepend" | "remove"` action types.

```tsx
{
    type: 'field-array-action',
    actionType: 'append',
    name: 'field-array-1',
}
```

:::info
in field array each item of array wraps by a React Context with index of currnet item in array. If you define `remove` action in field array items it will automatically remove current item, otherwise it remove last item.
:::

:::info
`append` and `prepend` actions use [generated default value](/docs/guides/default-value) for creating new item in field array.
:::

### 2. Global events

Mfb provide a `dispatchFieldArray` function for calling `useFieldArray` methods outside of form builder.

#### Parameters

##### 1. form id

id of target form. it's value passed to builder `id` field

##### 2. name

react hook form dotted syntax for path. e.g. `"parent-1.field-array-1"`.

##### 3. action

action is object with `type` and `params`. type is method name in [UseFieldArrayReturn](https://react-hook-form.com/ts#UseFieldArrayReturn).

parameters of method will passed to method by spread operator.

#### Example

```tsx
import { dispatchFieldArray } from "@mfb/core";

dispatchFieldArray<TestPageForm>(TEST_PAGE_FORM_ID, "akbar", {
  type: "append",
  params: [
    {}, // default value for new item
    { shouldFocus: false },
  ],
});
```

:::info
for methods those need value object (`append`, `prepend` and `insert`) you can pass null to use generated defualt value for target field array.
:::

### 3. Override field array

If two above solutions doesn't meet your requirement, you can override field array component in `FormBuilder` instance or only single field array component.
See [detials](/docs/configuration/field-array-override).
