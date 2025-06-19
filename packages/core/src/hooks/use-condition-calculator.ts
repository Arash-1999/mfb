import type { Condition } from "@/types";

import { conditionCalculator } from "@/utils";
import { useCallback } from "react";

interface CalcItem extends Condition {
  current: unknown;
}
const useConditionCalculator = () => {
  const calc = useCallback((item: CalcItem) => {
    return conditionCalculator(item, item.current);
  }, []);

  const reduceCalc = useCallback(
    (list: Array<CalcItem>) => {
      return list.reduce<boolean>((acc, cur) => {
        return acc || calc(cur);
      }, false);
    },
    [calc],
  );

  return {
    calc,
    reduceCalc,
  };
};

export { useConditionCalculator };
