import type { MuiConfig } from "@/builder";
import type { InputArray } from "@mfb/core";
import type { FieldValues } from "react-hook-form";

import { atom } from "jotai";

// interface AdvancedForm {
//   type: "advanced";
// }
interface BasicForm {
  list: InputArray<MuiConfig, FieldValues>;
  type: "basic";
}
// interface NormalForm {
//   type: "normal";
// }

const formAtom = atom<BasicForm>({
  list: [],
  type: "basic",
});

export { formAtom };
