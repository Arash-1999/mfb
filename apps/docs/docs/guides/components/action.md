---
description: Action buttons in form (e.g. field array actions)
sidebar_position: 0
---

# Action

In [Config](/docs/configuration/config) there is a button component.
it's a react component that gets `disabled`, `onClick`, `type`.

Mfb will use above props, you can deifne any other props that you can fill them in builders input.
For example you can define icon property and fill it.

### Component

```tsx
import type { ButtonComponentProps } from "@mfb/core";
import { AddIcon, DeleteIcon } from "./path/to/your/project/icons";

const icons = {
  append: AddIcon,
  prepend: AddIcon,
  remove: DeleteIcon,
};

interface MfbButtonProps extends ButtonComponentProps {
  icon?: keyof typeof icons;
  text?: string;
}

const MfbButton = ({ icon, text, ...props }: MfbButtonProps) => {
  return (
    <button {...props}>
      <span>{text}</span>
      <span>{icon}</span>
    </button>
  );
};

export { MfbButton };
```

### Usage

```tsx
<FB.BasicBuilder<FormValues>
  inputs={[
    {
      actionType: "append",
      name: "field-array-1",
      props: {
        icon: "append",
        text: "CLICK ME",
      },
      type: "field-array-action",
    },
  ]}
  onSubmit={console.log}
/>
```

`actionType` is defined for [Field array](/docs/guides/field-array#1-action-items) component.
