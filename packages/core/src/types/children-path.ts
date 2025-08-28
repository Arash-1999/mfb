interface ChildrenPathBase {
  mode: "advanced" | "normal";
}

interface ChildrenPathCard {
  hasChild: true;
  path: string;
}
interface ChildrenPathItem {
  hasChild: false;
}

type ChildrenPathResult =
  | null
  | (ChildrenPathBase & (ChildrenPathCard | ChildrenPathItem));

export type { ChildrenPathResult };
