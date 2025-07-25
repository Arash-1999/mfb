import type { MuiConfig } from "@/builder";
import type {
  BasicBuilderProps,
  BuilderProps,
  AdvancedBuilderProps,
} from "@mfb/core";
import type { FieldValues } from "react-hook-form";

interface BasicBuilderMessage {
  type: "basic";
  list: BasicBuilderProps<MuiConfig, FieldValues>["inputs"];
}

interface NormalBuilderMessage {
  type: "normal";
  list: BuilderProps<MuiConfig, FieldValues>["cards"];
}

interface AdvancedBuilderMessage {
  type: "advanced";
  list: AdvancedBuilderProps<MuiConfig, FieldValues>["list"];
}

type BuilderMessage =
  | AdvancedBuilderMessage
  | BasicBuilderMessage
  | NormalBuilderMessage;

export type {
  AdvancedBuilderMessage,
  BasicBuilderMessage,
  BuilderMessage,
  NormalBuilderMessage,
};
