import { compact } from "./compaact";

const stringToPath = (input: string): string[] =>
  compact(input.replace(/["|']|\]/g, "").split(/\.|\[/));

export { stringToPath };
