# Dependency

You can add dynamic, condition-based rendering and behavior control to any form item(input, card).

There are 4 type of dependency:

- `hide`: control visibility of input or card(and its children)
- `disable`: control enable/disable of input or card(and its children)
- `def-props`: customize defualt props of any item depend on watched field value
- `bind-value`: pass value of watched field to your component props

**Note:** your items(input/card) should have a optional field names `disable` for changing enable/disable status.

## Dependency Types

### Boolean

this type of dependency will watch your given `path` and calculate status depend on your `condition` and value.

- when `hide` dependency is true, the component and its children will not render.
- `disable` dependency will pass enable/disable status to the component optional `disable` property.

```typescript
{
    dependsOn: {
        path: 'path.to.target.field',
        condition: 'condition-name',
        id: 'unique-id',
        value: '', // value for condition calculation
        type: 'dependency-type', // hide | disable
    },
    // other props for your item(input/card)
}
```

### Data Binding

any component with `deps` key in its props type can have this type of dependency.

```typescript
{
    dependsOn: {
        path: 'path.to.target.field',
        id: 'key-in-deps-object',
        type: 'bind-value',
    },
    // other props for your item(input/card)
}
```

watched value of given path(s) will create an object based on `id` and watched value. for above exmple `deps` object is like this:

```typescript
{
    'key-in-deps-object':  "value of 'path.to.target.field'"
}
```

### Define Props

```typescript
{
    dependsOn: [
        {
            path: 'path.to.target.field',
            id: 'key-in-deps-object',
            type: 'def-props',
        }
    ],
    // other props for your item(input/card)
}
```

in all types of builder you can pass function that retures items list.

you can use these functions to read your watched value and write your custom logic for each item proeprties.

- Basic -> `define`
- Normal, Advanced -> `defineInput`, `defineCard`

**Note:** for type-safety pass type of deps object to define functions.

```typescript
interface Dep1 {
  key1: string;
}

<FB.BasicBuilder
  inputs={({ define }) => [
    define<Dep1>(({ deps }) => {
      console.log(deps.dep1);
      // write your cutsom logic component
    }),
  ]}
/>;
```

## Condition calculation

There are some built-in conditions:

- General:
  - `eq`: `===`
  - `not-eq`: `!==`
- Array:
  - `is-first-index`: `index === 0`
  - `is-last-index`: `index === length - 1`
  - `not-first-index`: `index !== 0`
  - `not-last-index`: `index !== length - 1`

## Tips

- You can extend conditions in `FormBuilder` [configuration](../configuration/options.md#extra-conditions).
- `dependsOn` field can be single object or array of objects.
- each dependency object has optional `shouldReset` for overrideng global behaviour. See [Details](../configuration/options.md#dependency-should-reset).
