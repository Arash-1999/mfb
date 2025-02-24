import type { ArrayPath, FieldValues } from "react-hook-form";

import { SubjectBase } from "@/pub-sub";

import type { FormAction, MfbState } from "./types/pub-sub";

class MfbSubject extends SubjectBase<MfbState, (action: MfbState) => void> {
  constructor() {
    super(null);
  }

  action = (action: FormAction, id: string) => {
    this.state = action;
    this.notify(id);
    this.state = null;
  };
}

const mfbSubject = new MfbSubject();

const dispatchArrayAction = <TFields extends FieldValues>(
  action: FormAction<TFields>,
  id: ArrayPath<TFields>
) => {
  mfbSubject.action(action, id);
};

export default mfbSubject;
export { dispatchArrayAction };
