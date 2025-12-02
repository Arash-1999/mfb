---
description: Different type of builders and use cases
---

# Builders

There 3 types of builder in Mfb. existence and combinationa [components](/docs/category/components) make them different.

## 1. Basic

The Basic Builder accepts list of action and input components used together without any card representation.
This straightforward format allows for a simple user interface where users can directly interact with input fields and trigger actions.

It’s ideal for scenarios requiring quick data entry and immediate responses, providing a minimalistic approach that focuses on functionality without the added complexity of a card layout.

```tsx
import { FB } from "./path/to/your/instance";

interface FormValues {
  "field-1": string;
  "field-2": string;
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
          name: "field-2",
          props: {},
          type: "text",
        },
        {
          name: "field-1",
          props: {},
          type: "text",
        },
      ]}
      onSubmit={handleSubmit}
    />
  );
};
```

## 2. Normal

In the Normal Builder, a list of cards is utilized, with each card housing a list of items that could be passed to basic builder.

This setup aids in organizing multiple inputs and actions in a visually appealing format, making the interface user-friendly.

This builder is particularly useful for managing data groups for example in user data form you can make profile and address separate groups.

```tsx
import { FB } from "./path/to/your/instance";

interface FormValues {
  "field-1": string;
  "card-1": {
    "field-2": string;
  };
}

const Page = () => {
  const handleSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <FB.Builder<FormValues>
      id="form-id"
      cards={[
        {
          type: "box",
          inputs: [
            {
              name: "field-2",
              props: {},
              type: "text",
            },
          ],
        },
        {
          type: "box",
          name: "card-1",
          inputs: [
            {
              name: "field-1",
              props: {},
              type: "text",
            },
          ],
        },
      ]}
      onSubmit={handleSubmit}
    />
  );
};
```

## 3. Advanced

The Advanced builder offers the most flexibility, integrating any combination and order of action, input, and card components.
This dynamic approach allows for customized layouts tailored to specific user needs and preferences.

Users can arrange components in a way that optimizes the workflow, whether by nesting inputs within cards, placing actions alongside them, or creating a unique sequence that best serves interaction goals.
This versatility makes the Advanced combination suitable for complex applications requiring nuanced user interactions.

:::info
In advnaced builder there is `mode` field for defining component type. value of mode could be `'action' | 'card' | 'input'`.
:::

```tsx
import { FB } from "./path/to/your/instance";

interface FormValues {
  "field-1": string;
  "card-1": {
    "field-2": string;
  };
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
          mode: "card",
          type: "box",
          list: [
            {
              mode: "input",
              name: "field-2",
              props: {},
              type: "text",
            },
          ],
        },
        {
          mode: "input",
          name: "card-1.field-1",
          props: {},
          type: "text",
        },
      ]}
      onSubmit={handleSubmit}
    />
  );
};
```

## General Props

All builders have these general props.

### `onSubmit`

The function that will passed to `handleSubmit` in `useForm`. First argument is value of submited form.

### `options`

the options to passed to `useForm`.

### `id`

The Id of the form, it will used for field array actions.

:::info
you can use `form` attribute of button to submit form outside of form.
:::

### `gridContainerProps`

in each builder there is [grid containeer](/docs/configuration/config) that is direct child of `form` element. It's an object that will passed to this grid container component.
