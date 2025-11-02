import { MuiFB } from "@/builder";
import { BUILDER_MODE } from "@/types/builder";

interface FormAnalysisResult {
  type: "Advanced" | "Basic" | "Normal";
  component: any;
  config: any;
}

export const analyzeFormObject = (
  formObject: any
): FormAnalysisResult | null => {
  if (!formObject || typeof formObject !== "object") {
    return null;
  }

  // Extract config if it exists, otherwise use the object itself
  const config = formObject.config || formObject;
  const type = formObject.type || config.type;

  if (type === BUILDER_MODE.ADVANCED || type === "Advanced") {
    return {
      type: "Advanced",
      component: MuiFB.AdvancedBuilder,
      config: {
        id: config.id || "FORM_ID",
        list: config.list || [],
        onSubmit: (data: any) => console.log(data),
      },
    };
  }

  if (type === BUILDER_MODE.BASIC || type === "Basic") {
    return {
      type: "Basic",
      component: MuiFB.BasicBuilder,
      config: {
        id: config.id || "FORM_ID",
        inputs: config.inputs || [],
        onSubmit: (data: any) => console.log(data),
      },
    };
  }

  if (type === BUILDER_MODE.NORMAL || type === "Normal") {
    return {
      type: "Normal",
      component: MuiFB.Builder,
      config: {
        id: config.id || "FORM_ID",
        cards: config.cards || [],
        onSubmit: (data: any) => console.log(data),
      },
    };
  }

  // Fallback to array detection
  if (Array.isArray(config.list)) {
    return {
      type: "Advanced",
      component: MuiFB.AdvancedBuilder,
      config: {
        id: config.id || "FORM_ID",
        list: config.list,
        onSubmit: (data: any) => console.log(data),
      },
    };
  }

  if (Array.isArray(config.inputs)) {
    return {
      type: "Basic",
      component: MuiFB.BasicBuilder,
      config: {
        id: config.id || "FORM_ID",
        inputs: config.inputs,
        onSubmit: (data: any) => console.log(data),
      },
    };
  }

  if (Array.isArray(config.cards)) {
    return {
      type: "Normal",
      component: MuiFB.Builder,
      config: {
        id: config.id || "FORM_ID",
        cards: config.cards,
        onSubmit: (data: any) => console.log(data),
      },
    };
  }

  return null;
};
