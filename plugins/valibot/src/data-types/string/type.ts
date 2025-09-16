interface StringKeywords {
  format?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}
interface StringValidation extends StringKeywords {
  type: "string";
}

export type { StringKeywords, StringValidation };
