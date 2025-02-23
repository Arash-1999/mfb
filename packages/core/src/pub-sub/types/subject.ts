import type { ActionBase, DefaultAction } from "./general";
import type { ObserverType } from "./observer";

export type SubjectType<TState, TAction extends ActionBase<TState> = DefaultAction<TState>> = {
  attach: (o: ObserverType<TState, TAction>) => void;
  checkAttach: (name: string) => boolean;
  detach: (o: ObserverType<TState, TAction>) => void;
  notify: () => void;

  state: TState;
};
