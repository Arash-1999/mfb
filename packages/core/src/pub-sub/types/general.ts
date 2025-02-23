import type { Dispatch, SetStateAction } from "react";

export type ActionBase<TState> = (s: TState) => void;
export type DefaultAction<TState> = Dispatch<SetStateAction<TState>>;
