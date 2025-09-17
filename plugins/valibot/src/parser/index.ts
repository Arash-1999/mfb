import type {
  ArrayValidation,
  NumericValidation,
  //   ObjectValidation,
  StringValidation,
} from "@/data-types";

type FieldValues = Record<PropertyKey, any>;

interface Item {
  name?: string;
  validation?:
    | ArrayValidation
    | NumericValidation
    // | ObjectValidation
    | StringValidation;
}

type ItemArray = Array<Item>;

interface ParserBaseClass<TFields extends FieldValues> {
  parse: (items: ItemArray) => TFields;
  schema: TFields;
}
interface ParserClass<TFields extends FieldValues>
  extends ParserBaseClass<TFields> {
  parseArray: (validation: ArrayValidation) => void;
  parseNumeric: (validation: NumericValidation) => void;
  //   parseObject: (validation: ObjectValidation) => void;
  parseString: (validation: StringValidation) => void;
}

interface Test_1 {
  a: string;
  b: string;
  c: {
    d: string;
  };
}

const compact = <TValue>(value: TValue[]) =>
  Array.isArray(value) ? value.filter(Boolean) : [];

const isKey = (value: string) => /^\w*$/.test(value);

const isNullOrUndefined = (value: unknown): value is null | undefined =>
  value == null;

const stringToPath = (input: string): string[] =>
  compact(input.replace(/["|']|\]/g, "").split(/\.|\[/));

class ParserBase<TFields extends FieldValues>
  implements ParserBaseClass<TFields>
{
  result: FieldValues = {};
  schema: TFields;

  constructor(items: ItemArray) {
    this.schema = this.parse(items);
  }

  private parseItem = (item: Item) => {
    if (isNullOrUndefined(item.name) || item.name.length === 0) return;

    // TODO: if item has inputs/list use this.parse(item.[inputs | list])
    // TODO: else

    // console.log(item);

    const path = isKey(item.name) ? [item.name] : stringToPath(item.name);
    console.log(path);

    return item.validation;
  };

  public parse = (items: ItemArray): TFields => {
    items.forEach((item) => {
      this.parseItem(item);
    });

    return this.result as TFields;
  };

  parseArray = (validation: ArrayValidation) => {
    console.log(validation);
  };
  parseNumeric = (validation: NumericValidation) => {
    console.log(validation);
  };
  parseString = (validation: StringValidation) => {
    console.log(validation);
  };
}

class JSONSchemaParser<TFields extends FieldValues>
  extends ParserBase<TFields>
  implements ParserClass<TFields>
{
  constructor(items: ItemArray) {
    super(items);
  }

  override parseArray = (validation: ArrayValidation) => {
    console.log(validation);
  };
  override parseNumeric = (validation: NumericValidation) => {
    console.log(validation);
  };
  override parseString = (validation: StringValidation) => {
    console.log(validation);
  };
}

const parser = new JSONSchemaParser<Test_1>([]);
console.log(parser.schema);

export { parser };
