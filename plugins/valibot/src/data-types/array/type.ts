interface ArrayBaseKeywords {
  maxItems?: number;
  minItems?: number;
}
interface ArrayKeywords extends ArrayBaseKeywords {
  items?: [];
  prefixItems?: [];
}

interface ArrayValidation extends ArrayKeywords {
  type: "array";
}

export type { ArrayBaseKeywords, ArrayKeywords, ArrayValidation };
