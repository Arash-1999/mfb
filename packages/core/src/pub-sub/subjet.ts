import type {
  ActionBase,
  DefaultAction,
  ObserverType,
  SubjectType,
} from "./types";

class SubjectBase<
  TState,
  TAction extends ActionBase<TState> = DefaultAction<TState>,
> implements SubjectType<TState, TAction>
{
  public state: TState;
  private observers: { [key: string]: ObserverType<TState, TAction> } = {};

  constructor(defaultValue: TState) {
    this.state = defaultValue;
  }

  attach(o: ObserverType<TState, TAction>) {
    if (o.name in this.observers) {
      return;
    }

    this.observers[o.name] = o;
  }

  checkAttach(name: string) {
    return name in this.observers;
  }

  detach(o: ObserverType<TState, TAction>) {
    if (o.name in this.observers) {
      delete this.observers[o.name];
    }
  }

  notify(...ids: string[]) {
    if (ids.length === 0) {
      for (const o in this.observers) {
        this.observers[o]?.update(this);
      }
    } else {
      for (let i = 0, len = ids.length; i < len; i++) {
        const id = ids[i] || "";
        this.observers[id]?.update(this);
      }
    }
  }
}

export { SubjectBase };
