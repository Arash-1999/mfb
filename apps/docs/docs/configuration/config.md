---
description: Form builder configuration object
sidebar_position: 1
---

# Config Object

```tsx
const config = {
  button: {
    component: ButtonComponent,
  },
  inputs: {
    components: {},
    defaultValues: {},
  },
  cards: {
    group: {},
    simple: {},
  },
  layout: {
    field: Field,
    "grid-container": GridContainer,
    "grid-item": GridItem,
  },
  validation: new Validation(),
  optoins: {},
} satisfies FormBuilderConfig;
```

:::warning pitfall
`satisfies` keyword is important in defineing config object for type-safety in builders.
:::

## Button

This component is used in item with `type: 'field-array-action'`.
See [Actions](/docs/guides/components/action) for details of implemenation.

## Inputs

### Components

input.components is map of all inputs you can use in your builders.
in builders value of `type` in input itmes is `keyof inputs.component`.

### Default values

Each input in Mfb should have a default value(with same key in components) for generating default values.

:::danger
All of defined input components should have default value. if not it will cause performance issues.
:::

## Cards

Cards contains two map, one for `simple` cards and one for `group` cards.

## Layout

It containes three component for structure of rendered form. They should accept `children` as property, any thing else should be filled in builders.

### 1. field

it wraps any input item in your form.

Each input item has `field` that accept properties of defined Field component here.

:::info
By default inputs without `field` property, will not render field component. you can change it in [Options](/docs/configuration/options).
:::

### 2. grid item

it will wraps each item in form (card, input, action, ...)

Any item that wrapped with grid item has `gridProps` field for passing your grid item properties.

### 3. grid container

it will be rendred as direct child of `form` element, and every where you have `inputs` or `list`.

Any item that wrapped with grid contianer has `gridContainerProps` field for passing your grid container properties.

## Validaiton

the [validation](/docs/guides/validaiton) class can be passed here.

## Options

In this section you can change general behaviors. See [Options](/docs/configuration/options) for details explaination.
