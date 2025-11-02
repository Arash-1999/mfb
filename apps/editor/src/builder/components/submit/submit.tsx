import React from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import { addItemToFormAtom, editorLayoutAtom, formAtom } from "@/store/atoms";
import { BUILDER_MODE } from "@/types/builder";
import { FormItem, WithSubmitInjectedProps } from "./type";

export function withSubmit<P extends object>(
  WrappedComponent: React.ComponentType<P & WithSubmitInjectedProps>
) {
  const ComponentWithSubmit: React.FC<P> = (props) => {
    const [formAtomValue, setFormAtom] = useAtom(formAtom);
    const { mode } = useParams();
    const { currentPath } = useAtomValue(editorLayoutAtom);
    const setEditorLayoutAtom = useSetAtom(editorLayoutAtom);

    const path =
      (currentPath &&
        typeof currentPath === "object" &&
        `${currentPath.path}.${(currentPath.childrenPath && "path" in currentPath.childrenPath && currentPath.childrenPath.path) || ""}`) ||
      null;

    const handleSubmit = (newItem: FormItem): void => {
      if (!formAtomValue) return;

      const closeSidebar = () =>
        setEditorLayoutAtom((prev) => ({
          ...prev,
          sidebarOpen: false,
          currentPath: null,
        }));

      if (mode === BUILDER_MODE.NORMAL) {
        const updatedForm = addItemToFormAtom(formAtomValue, path, {
          ...newItem,
          inputs: [],
        });
        setFormAtom(updatedForm);
        closeSidebar();
      }

      if (mode === BUILDER_MODE.BASIC) {
        const updatedForm = addItemToFormAtom(formAtomValue, path, newItem);
        setFormAtom(updatedForm);
        closeSidebar();
      }

      if (mode === BUILDER_MODE.ADVANCED) {
        const updatedForm = addItemToFormAtom(formAtomValue, path, {
          ...newItem,
          mode:
            newItem.type === "paper" || newItem.type === "accordion"
              ? "card"
              : "input",
          list: [],
        });
        setFormAtom(updatedForm);
        closeSidebar();
      }
    };

    return <WrappedComponent {...props} onSubmit={handleSubmit} />;
  };

  return ComponentWithSubmit;
}
