import { useEffect } from "react";

import type { ActionBase, DefaultAction, SubjectType } from "../types";

import { useObserver } from "./use-observer";

type UseSubjectProps<
  TState,
  TAction extends ActionBase<TState> = DefaultAction<TState>,
> = {
  action: TAction;
  id: string;
  subject: SubjectType<TState, TAction>;
};

const useSubject = <
  TState,
  TAction extends ActionBase<TState> = DefaultAction<TState>,
>({
  action,
  id,
  subject,
}: UseSubjectProps<TState, TAction>) => {
  const observer = useObserver<TState, TAction>(action, id);

  useEffect(() => {
    subject.attach(observer);

    return () => subject.detach(observer);
  }, [observer, subject]);
};

export { useSubject };
