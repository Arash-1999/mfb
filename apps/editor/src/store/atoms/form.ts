import type { MuiConfig } from "@/builder";
import { BUILDER_MODE, type BuilderMode } from "@/types/builder";
import type { InputArray } from "@mfb/core";
import type { FieldValues } from "react-hook-form";

import { atom } from "jotai";

interface AdvancedForm {
  type: (typeof BUILDER_MODE)["ADVANCED"];
  list: InputArray<MuiConfig, FieldValues>;
}
interface BasicForm {
  inputs: InputArray<MuiConfig, FieldValues>;
  type: (typeof BUILDER_MODE)["BASIC"];
}
interface NormalForm {
  type: (typeof BUILDER_MODE)["NORMAL"];
  cards: InputArray<MuiConfig, FieldValues>;
}

const formAtom = atom<AdvancedForm | BasicForm | NormalForm | null>(null);
const readonlyBuilderMode = atom<BuilderMode>((get) => {
  const formAtomValue = get(formAtom);
  return formAtomValue !== null ? formAtomValue.type : BUILDER_MODE.BASIC;
});

export { formAtom, readonlyBuilderMode };
export type { AdvancedForm, BasicForm, NormalForm };
