import type {
  // ActionInput,
  ChildrenPathResult,
  FormBuilderConfig,
  GetCardsImpl,
  GetInputsImpl,
} from "@/types";
import type { FieldValues } from "react-hook-form";

class ItemInfo<TConfig extends FormBuilderConfig> {
  public action(): ChildrenPathResult {
    return null;
  }

  public card<TFields extends FieldValues>(
    item:
      | GetCardsImpl<TConfig, TFields, false, true>
      | GetCardsImpl<TConfig, TFields, false>
      | GetCardsImpl<TConfig, TFields, true, true>
      | GetCardsImpl<TConfig, TFields, true>,
  ): ChildrenPathResult {
    if ("mode" in item) {
      return {
        hasChild: true,
        mode: "advanced",
        path: "list",
      };
    }

    return {
      hasChild: true,
      mode: "normal",
      path: "inputs",
    };
  }

  public cardItem(isAdvanced: boolean): ChildrenPathResult {
    return {
      hasChild: true,
      mode: isAdvanced ? "advanced" : "normal",
      path: "list",
    };
  }

  public input<TFields extends FieldValues>(
    item: GetInputsImpl<TConfig, TFields>,
  ): ChildrenPathResult {
    if ("list" in item) {
      return {
        hasChild: true,
        mode: "advanced",
        path: "list",
      };
    } else if ("inputs" in item) {
      return {
        hasChild: true,
        mode: "advanced",
        path: "inputs",
      };
    } else {
      return null;
    }
  }
}

export { ItemInfo };
