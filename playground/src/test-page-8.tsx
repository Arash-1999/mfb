import { getDefaultValues, testItems } from './form-builder/default-value';
import { config, } from './form-builder';

const Page = () => {
  return (
    <>
      <p>Default Value</p>

      <pre>
        {JSON.stringify(getDefaultValues(config, testItems), null, 2)}
      </pre>
    </>
  );
};

export default Page;
