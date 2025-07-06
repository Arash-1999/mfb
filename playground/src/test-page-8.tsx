import type { Config } from "./form-builder";
import type { TestForm, TestForm2 } from "./form-builder/default-value";

import {
  getDefaultValues,
  testAdvancedList,
  testForm2,
  testItems,
} from "./form-builder/default-value";
import { config } from "./form-builder";

const Page = () => {
  return (
    <>
      <p>Default Value</p>

      <pre>
        {JSON.stringify(
          getDefaultValues<Config, TestForm>({ config, list: testItems }),
          null,
          2,
        )}
      </pre>
      <pre>
        {JSON.stringify(
          getDefaultValues<Config, TestForm2>({ config, list: testForm2 }),
          null,
          2,
        )}
      </pre>
      <pre>
        {JSON.stringify(
          getDefaultValues<Config, TestForm>({
            config,
            list: testAdvancedList,
          }),
          null,
          2,
        )}
      </pre>
    </>
  );
};

export default Page;
