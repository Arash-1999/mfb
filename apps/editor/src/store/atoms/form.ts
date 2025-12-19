import type { MuiConfig } from "@/builder";
import { BUILDER_MODE, type BuilderMode } from "@/types/builder";
import type { InputArray } from "@mfb/core";
import type { FieldValues } from "react-hook-form";

import { atom } from "jotai";

interface AdvancedForm {
  type: (typeof BUILDER_MODE)["ADVANCED"];
  list: InputArray<MuiConfig, FieldValues>;
  mode: "action" | "card" | "input";
}
interface BasicForm {
  inputs: InputArray<MuiConfig, FieldValues>;
  type: (typeof BUILDER_MODE)["BASIC"];
}
interface NormalForm {
  type: (typeof BUILDER_MODE)["NORMAL"];
  cards?: InputArray<MuiConfig, FieldValues>;
  inputs?: InputArray<MuiConfig, FieldValues>;
}

type FormMode = "add" | "edit";
const formAtom = atom<AdvancedForm | BasicForm | NormalForm | null>(null);
const readonlyBuilderMode = atom<BuilderMode>((get) => {
  const formAtomValue = get(formAtom);
  return formAtomValue !== null ? formAtomValue.type : BUILDER_MODE.BASIC;
});
const formModeAtom = atom<FormMode>("add");

// Optional derived atoms for convenience
const isEditModeAtom = atom((get) => get(formModeAtom) === "edit");
const isAddModeAtom = atom((get) => get(formModeAtom) === "add");

export {
  formAtom,
  readonlyBuilderMode,
  formModeAtom,
  isEditModeAtom,
  isAddModeAtom,
};
export type { AdvancedForm, BasicForm, NormalForm, FormMode };
