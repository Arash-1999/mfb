---
title: User Guide
sidebar_position: 2
---

# User Guide

## Creating Configuration

:::info
You can read about configuration object [here](/docs/category/configuration).
:::

There are two approaches for using mfb framework:

### 1. Custom UI

Integrate your components to Mfb. See [Compoennt Guide](/docs/category/components) for component signatures.

```typescript
import type { FormBuilderConfig } from "@mfb/core";

const config = {
  inputs: {},
  cards: {},
  button: {},
} saitsfies FormBuilderConfig;

type MfbConfig = typeof config;
```

### 2. Plugins

Use provided plugins. See [UI Plugins](/docs/plugins/ui) for available ui kits.

```typescript
import type { FormBuilderConfig } from "@mfb/core";

const config = {
    ...getConfig(),
} saitsfies FormBuilderConfig;

type MfbConfig = typeof config;
```

## Creating instance

Use your config created in above step to create your form builder instance.

```typescript
const FB = new FormBuilder(config);
```

## Your first form

Now you can use `FB` [Builders](/docs/guides/builder) to create your first form.

```tsx
<FB.BasicBuilder<FormValue>
  inputs={[]}
  onSubimt={(data) => {
    console.log(data);
  }}
/>
```
