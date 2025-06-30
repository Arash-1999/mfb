import type { InputArray } from "@mfb/core";

import { Config } from "./form-builder";

interface TestForm {}

const items: InputArray<Config, TestForm> = [];

const Page = () => {
  return (
    <>
      <p>defafult value</p>

      <pre>{JSON.stringify(items, null, 2)}</pre>
    </>
  );
};

export default Page;
