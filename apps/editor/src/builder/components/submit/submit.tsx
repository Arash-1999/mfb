import React from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import { addItemToFormAtom, editorLayoutAtom, formAtom } from "@/store/atoms";
import { BUILDER_MODE } from "@/types/builder";
import { FormItem, WithSubmitInjectedProps } from "./type";
import {
  AdvancedForm,
  BasicForm,
  formModeAtom,
  NormalForm,
} from "@/store/atoms/form";
import { set } from "react-hook-form";

export function withSubmit<P extends object>(
  WrappedComponent: React.ComponentType<P & WithSubmitInjectedProps>
) {
  const ComponentWithSubmit: React.FC<P> = (props) => {
    const [formAtomValue, setFormAtom] = useAtom(formAtom);
    const { mode } = useParams();
    const { currentPath } = useAtomValue(editorLayoutAtom);
    const setEditorLayoutAtom = useSetAtom(editorLayoutAtom);
    const [modeForm, setModeForm] = useAtom(formModeAtom);

    const path =
      (currentPath &&
        typeof currentPath === "object" &&
        `${currentPath.path}.${(currentPath.childrenPath && "path" in currentPath.childrenPath && currentPath.childrenPath.path) || ""}`) ||
      null;
    console.log(formAtomValue);
    const handleSubmit = (newItem: FormItem): void => {
      if (!formAtomValue) return;

      const closeSidebar = () =>
        setEditorLayoutAtom((prev) => ({
          ...prev,
          sidebarOpen: false,
          currentPath: null,
        }));
      const advancedItem: Omit<AdvancedForm, "type"> = {
        ...newItem,
        mode:
          newItem.type === "paper" || newItem.type === "accordion"
            ? "card"
            : "input",
        list: [],
      };
      if (modeForm === "add") {
        if (mode === BUILDER_MODE.NORMAL) {
          const normalItem: Omit<NormalForm, "type"> = {
            ...newItem,
            inputs: [],
          };
          const updatedForm = addItemToFormAtom(
            formAtomValue,
            path,
            normalItem
          );
          setFormAtom(updatedForm);
        }

        if (mode === BUILDER_MODE.BASIC) {
          const basicItem: Omit<BasicForm, "type"> = {
            ...newItem,
            inputs: [],
          };

          const updatedForm = addItemToFormAtom(formAtomValue, path, basicItem);
          setFormAtom(updatedForm);
        }

        if (mode === BUILDER_MODE.ADVANCED) {
          const updatedForm = addItemToFormAtom(
            formAtomValue,
            path,
            advancedItem
          );

          setFormAtom(updatedForm);
        }
      }
      if (modeForm === "edit") {
        setFormAtom((prev) => {
          if (!(prev && "list" in prev)) return prev;
          const updatedList = structuredClone(prev.list);
          set(updatedList, currentPath?.path || "", advancedItem);
          return {
            ...prev,
            list: updatedList ?? [],
          };
        });
      }
      closeSidebar();
      setModeForm("add");
    };
    return <WrappedComponent {...props} onSubmit={handleSubmit} />;
  };

  return ComponentWithSubmit;
}
