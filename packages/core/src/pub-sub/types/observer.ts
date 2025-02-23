import type { ActionBase, DefaultAction } from "./general";
import type { SubjectType } from "./subject";

export type ObserverType<TState, TAction extends ActionBase<TState> = DefaultAction<TState>> = {
  /* values */
  action: TAction;
  name: string;

  /* methods */
  update: (subject: SubjectType<TState, TAction>) => void;
};
