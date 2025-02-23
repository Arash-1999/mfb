import type {
  ActionBase,
  DefaultAction,
  ObserverType,
  SubjectType,
} from "./types";

class Observer<TState, TAction extends ActionBase<TState> = DefaultAction<TState>>
  implements ObserverType<TState, TAction>
{
  public action: TAction;
  public name: string;

  constructor(action: TAction, name: string) {
    this.action = action;
    this.name = name;
  }

  update(s: SubjectType<TState, TAction>) {
    this.action(s.state);
  }
}

export { Observer };
