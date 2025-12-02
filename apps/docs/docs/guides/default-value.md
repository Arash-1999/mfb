---
description: Explain default value generator
---

# Default Value

In first render of builders, Mfb will parse items and generate default values.

:::danger
All inputs should have default value in [configuration](/docs/configuration/config). missing inputs might cause infinite loops.
:::

It will return two objects

### Returns

#### 1. Default value for entire form.

If `genDefaultValues` in [Options](/docs/configuration/options) is `true`, it will passed to `defaultValues` in `useForm`.

:::info
Mfb will parse dependencies with generated default values. for example if you have a checkbox with `false` default value and another item that depends on this checkbox, Mfb doesn't add default value for disabled or hidden items.
:::

#### 2. FieldArray Values Map

It creates a map of name of filed array and item default value. Main usage of this map is using for useFieldArray methods argument.
