import type {
  ArrayValidation,
  NumericValidation,
  StringValidation,
} from "@/data-types";

type FieldValues = Record<PropertyKey, any>;

interface Item {
  name?: string;
  validation?: ArrayValidation | NumericValidation | StringValidation;
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
  parseString: (validation: StringValidation) => void;
}

interface Test_1 {
  a: string;
  b: string;
  c: {
    d: string;
  };
}

class ParserBase<TFields extends FieldValues>
  implements ParserBaseClass<TFields>
{
  schema: TFields;

  constructor(items: ItemArray) {
    this.schema = this.parse(items);
  }

  private parseItem = (item: Item) => {
    console.log(item);

    return item.validation;
  };

  public parse = (items: ItemArray) => {
    items.forEach((item) => {
      this.parseItem(item);
    });

    return {} as TFields;
  };
}

class TestParser<TFields extends FieldValues>
  extends ParserBase<TFields>
  implements ParserClass<TFields>
{
  constructor(items: ItemArray) {
    super(items);
  }

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

const parser = new TestParser<Test_1>([]);
console.log(parser.schema);

export { parser };
