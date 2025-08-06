import { atom } from "jotai";

interface EditorLayoutAtom {
  sidebarOpen: boolean;
  currentPath: null | string;
}

const editorLayoutAtom = atom<EditorLayoutAtom>({
  sidebarOpen: false,
  currentPath: null,
});

export { editorLayoutAtom };
