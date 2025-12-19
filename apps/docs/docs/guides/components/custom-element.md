---
description: Date-entry components
sidebar_position: 3
---

# Custom Element

## What is Custom Element?

For scenarios you want a component that is not in `FormBuilder` configuration, you can use custom elements.
It is good for managing project bundle size.

It accepts properties with type `CustomElementProps`.

```tsx
interface CustomElementProps {
  deps?: Record<PropertyKey, unknown>;
  formMethods: UseFormReturn<TFields>;
  index: number | undefined;
  name: string | undefined;
  disabled?: boolean;
  required?: boolean;
  validation?: Validation<string>;
}
```

## Example

```tsx
const MfbCustomElement = <TFields extends FieldValues>({
  disabled,
  formMethods,
  name,
}: CustomElementProps<TFields>) => {
  return (
    <div>
      <h6>Test Custom Element</h6>

      <input
        disabled={disabled}
        type="text"
        {...formMethods.register(name as Path<TFields>)}
      />
    </div>
  );
};
```

## Usage

```tsx
<FB.Builder
  id="TEST_PAGE_2_FORM_ID"
  cards={[
    {
      type: "custom-element",
      element: TestCustomElement,
      name: "custom",
      dependsOn: [
        {
          type: "disable",
          condition: "eq",
          id: "test-dep",
          path: "test",
          value: "fuck",
        },
      ],
    },
  ]}
  onSubmit={console.log}
/>
```
