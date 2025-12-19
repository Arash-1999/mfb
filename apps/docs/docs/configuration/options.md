---
description: configuration.options
sidebar_position: 2
---

# Options

### dependencyShouldReset

default: `true`

in items with `dependsOn`, should be reset or not if dependent fields value changed.

### extraConditions

default: `{}`,

It contained a map of extran conditions for `condition` in [boolean dependencies](/docs/guides/default-value).

```tsx
const config = {
  options: {
    extraConditions: {
      lt: (target, value) => {
        const [a, b] = [Number(value), Number(target)];
        if (!isNaN(a) && !isNaN(b)) return a < b;
        else return false;
      },
    },
  },
  // ... other configurations
};
```

### genDefaultValues

default: `true`

It will described that generated [Default value](/docs/guides/default-value) should passed to `useForm` defaultValues or not.
