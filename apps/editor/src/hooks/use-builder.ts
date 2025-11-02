// hooks/useBuilder.ts
import { useAtom, useSetAtom } from "jotai";
import {
  editorLayoutAtom,
  formAtom,
  confirmationAtom,
  activeSelectionAtom,
} from "@/store/atoms";
import { BuilderMode } from "@/types/builder";

export const useBuilder = () => {
  const [formValue, setForm] = useAtom(formAtom);
  const setEditorLayout = useSetAtom(editorLayoutAtom);
  const setConfirmation = useSetAtom(confirmationAtom);
  const [activeSelection, setActiveSelection] = useAtom(activeSelectionAtom);

  const changeBuilderMode = (newMode: BuilderMode) => {
    if (formValue) {
      // Show confirmation before changing builder mode
      setConfirmation({
        isOpen: true,
        message:
          "Changing builder mode will reset your current form. Continue?",
        onConfirm: () => {
          setForm({ type: newMode, list: [] });
          setEditorLayout((prev) => ({
            ...prev,
            currentPath: null,
            sidebarOpen: false,
          }));
          setConfirmation((prev) => ({ ...prev, isOpen: false }));
        },
        onCancel: () => {
          setConfirmation((prev) => ({ ...prev, isOpen: false }));
        },
      });
    } else {
      setForm({ type: newMode, list: [] });
    }
  };

  const openSidebarForAppend = (path: string, mode: BuilderMode) => {
    setEditorLayout({
      sidebarOpen: true,
      currentPath: {
        path,
        mode,
        childrenPath: null,
        deps: { disable: false },
      },
    });
    setActiveSelection(path);
  };

  const closeSidebar = () => {
    setEditorLayout((prev) => ({
      ...prev,
      sidebarOpen: false,
      currentPath: null,
    }));
    setActiveSelection(null);
  };

  const addItemToForm = (itemData: any) => {
    if (!formValue || !editorLayout.currentPath) return;

    const newItem =
      formValue.type === "advanced"
        ? { ...itemData, mode: itemData.mode || "input" } // Default to 'input' for advanced
        : itemData;

    // Implement deep set functionality similar to react-hook-form's set
    const updatedList = [...formValue.list, newItem];
    setForm({ ...formValue, list: updatedList });
    closeSidebar();
  };

  return {
    formValue,
    changeBuilderMode,
    openSidebarForAppend,
    closeSidebar,
    addItemToForm,
    activeSelection,
    setActiveSelection,
  };
};
