import type {
  ActionBase,
  DefaultAction,
  ObserverType,
  SubjectType,
} from "./types";

class SubjectBase<T, K extends ActionBase<T> = DefaultAction<T>>
  implements SubjectType<T, K>
{
  public state: T;
  private observers: { [key: string]: ObserverType<T, K> } = {};

  constructor(defaultValue: T) {
    this.state = defaultValue;
  }

  attach(o: ObserverType<T, K>) {
    if (o.name in this.observers) {
      return;
    }

    this.observers[o.name] = o;
  }

  checkAttach(name: string) {
    return name in this.observers;
  }

  detach(o: ObserverType<T, K>) {
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
