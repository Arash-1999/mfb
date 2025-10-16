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
  | (ChildrenPathBase & (ChildrenPathCard | ChildrenPathItem))
  | null;

export type { ChildrenPathResult };
