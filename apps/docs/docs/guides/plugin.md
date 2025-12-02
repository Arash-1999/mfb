---
description: What is a plugin and how to implement them.
---

# Plugin

## What is a UI Plugin?

A Plugin is a library that exports certain functions:

- `getInputs`: returns [input](/docs/guides/components/input) map.
- `getDefaultValues` return input defualt values.
- `getCards`: returns [simple and group](/docs/guides/components/card) cards map.
- `getSimpleCards`: returns [simple cards](/docs/guides/components/card) map.
- `getGroupCards`: returns [group cards](/docs/guides/components/card) map.
- `getLayout`: returns [layout](/docs/guides/components/layout) map.
- `getConfig`: returns entire [config](/docs/configuration/config).
