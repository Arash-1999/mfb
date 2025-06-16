import { MuiConfig } from "@/builder";
import { InputArray } from "@mfb/core";
import { atom } from "jotai";
import { FieldValues } from "react-hook-form";

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
