import type { ActionBase, DefaultAction } from "@/pub-sub";

import { Observer } from "@/pub-sub";
import { useMemo } from "react";

const useObserver = <
  TState,
  TAction extends ActionBase<TState> = DefaultAction<TState>,
>(
  action: TAction,
  id: string
) => {
  return useMemo(() => {
    return new Observer<TState, TAction>(action, id);
  }, [action, id]);
};

export { useObserver };
