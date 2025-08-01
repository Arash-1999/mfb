import type { MuiConfig } from "@/builder";
import type {
  AdvancedBuilderProps,
  BasicBuilderProps,
  BuilderProps,
} from "@mfb/core";
import type { FieldValues } from "react-hook-form";

interface AdvancedBuilderMessage {
  list: AdvancedBuilderProps<MuiConfig, FieldValues>["list"];
  type: "advanced";
}

interface BasicBuilderMessage {
  list: BasicBuilderProps<MuiConfig, FieldValues>["inputs"];
  type: "basic";
}

type BuilderMessage =
  | AdvancedBuilderMessage
  | BasicBuilderMessage
  | NormalBuilderMessage;

interface NormalBuilderMessage {
  list: BuilderProps<MuiConfig, FieldValues>["cards"];
  type: "normal";
}


export type {
  AdvancedBuilderMessage,
  BasicBuilderMessage,
  BuilderMessage,
  NormalBuilderMessage,
};
