---
description: Use provided ui kit plugins
---

# Plugins

In this page you will learn how to use ui plugins. For detilas of plugins and learning how to implement them see [plugin guide](/docs/guides/plugin).

### Simple usage

You can simply create a config object and pass it to `FormBuilder`.

```typescript
import type { FormBuilderConfig } from "@mfb/core";

const config = getConfig() satisfies FormBuilderConfig;

type Config = typeof config;

export { config };
export type { Config };
```

### Extending Plugins

If a provided component and configuration is not enough for your needs you can easily add more functionality to them.

```tsx
const config = {
  input: {
    components: {
      ...getInputs(),
      // put your custom components here
    },
    defaultValues: {
      ...getDefaultValues(),
      // put default value for your custom components here
    },
  },
  cards: {
    simple: {
      ...getSimpleCards(),
      // put your custom simple cards here
    },
    group: {
      ...getGroupCards(),
      // put your custom group cards here
    },
  },
  layout: {
    ...getLayout(),
    // override layout compomenets
  },
} satisfies FormBuilderConfig;

type Config = typeof Config;

export { config };
export type { Config };
```

You can find available ui plugins [here](/docs/category/ui).
