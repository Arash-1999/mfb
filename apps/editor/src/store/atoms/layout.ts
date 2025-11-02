import { atom } from "jotai";
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

interface ParentDeps {
  disable: boolean;
}
export interface CurrentPathValue {
  childrenPath: ChildrenPathResult;
  mode: "advanced" | "normal";
  path: string;
  deps: ParentDeps;
}

interface EditorLayoutAtom {
  sidebarOpen: boolean;
  currentPath: CurrentPathValue | null;
}

const editorLayoutAtom = atom<EditorLayoutAtom>({
  sidebarOpen: false,
  currentPath: null,
});

export { editorLayoutAtom };
