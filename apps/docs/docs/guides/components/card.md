---
description: Date grouping components
sidebar_position: 1
---

# Card

## What is Card?

Card is component for grouping other component types (input, action and custom elements). In Mfb There are two type of card:

1. [Simple](#simple)
2. [Group](#group)

### Simple

Simple Card is Single component that wraps other components. for example a single accordion.

It accepts properties with type `SimpleCardProps`.

```tsx
type SimpleCardProps<TProps = unknown> = PropsWithChildren<
  TProps & {
    header: Header | string;
    disabled?: boolean;
    required?: boolean;
    validation?: Validation<string>;
  }
>;
```

#### Example

```tsx
const Accordion = ({
  children,
  className,
  header,
  requried,
}: SimpleCardProps<{ className?: string }>) => {
  return (
    <details className={className}>
      <summary>{typeof header === "string" ? header : null}</summary>
      <div>
        {required ? <p>This field is required</p> : nulll}
        <div>{children}</div>
      </div>
    </details>
  );
};

export { Accordion };
```

### Group

Group card is multiple Simple card e.g. group of controlled accordions, or a compoennt that can render multiple cards conditionally like tabs or stepper.

It accepts properties with type `GroupCardPropsBase`

```tsx
type GroupCardPropsBase<TProps = unknown> = TProps & {
  addGrid: (node: ReactNode, index: number) => ReactNode;
  nodes: Array<NodeItem>;
  disabled?: boolean;
  required?: boolean;
  validation?: Validation<string>;
};
```

#### Example

```tsx
import { GroupCardProps } from "@mfb/core";

const Tabs = ({ addGrid, nodes, required }: GroupCardProps) => {
  const [active, setActive] = useState<number>(0);

  const handleChange = (index: number) =>  => {
    setValue(index);
  };

  return (
    <>
      {addGrid(
        <>
          {required ? <Typography>This field is required</Typography> : null}
          <div class="tab">
            {nodes.map((node, index) => {
              const title =
                typeof node.title === "string" ? node.title : node.title.left;

              return (
                <button class="tablinks" key={`tab-item-${index}`} onClick={handleChange(index)}>
                  {title}
                </button>
              );
            })}
          </div>

          {Array.isArray(nodes) &&
          nodes.length > 0 &&
          value < nodes.length &&
          nodes[value] ? (
            <div>{nodes[value]?.children}</div>
          ) : null}
        </>,
        0,
      )}
    </>
  );
};

export { Tabs };
```

## Configuration

```tsx
const config = {
  cards: {
    group: {
      tabs: Tabs,
    },
    simple: {
      accordion: Accordion,
    },
  },
  // ... other configurations
} satisfies FormBuilderConfig;
```

## Usage

```tsx
<FB.Builder<TestPageForm>
  cards={[
    // simple card
    {
      props: {},
      header: "Header",
      type: "accordion",
      inputs: [],
    },
    // group  card normal
    {
      isGroup: true,
      props: {},
      header: "Header",
      type: "tabs",
      name: "group-card-normal", // name is optional
      inputs: [
        {
          list: [],
          name: "item-1", //name is optional
          title: "Title 1",
        },
      ],
    },
    // group  card list
    {
      isGroup: true,
      variant: "list",
      props: {},
      header: "Header",
      type: "tabs",
      name: "group-card-normal",
      inputs: [],
    },
  ]}
  id="FORM_ID"
  onSubmit={(data) => {
    console.log(data);
  }}
/>
```
