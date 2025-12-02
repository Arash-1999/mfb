import { createContext, useState, useContext } from "react";

type TestContextValue = {
  counter: number;
  increase: () => void;
  decrease: () => void;
};
const TestContext = createContext<TestContextValue>({
  counter: 0,
  increase: () => {},
  decrease: () => {},
});

const ComponentA = () => {
  const [value, setValue] = useState<number>(0);

  return (
    <TestContext.Provider
      value={{
        counter: value,
        increase: () => {
          setValue((s) => s + 1);
        },
        decrease: () => {
          setValue((s) => s - 1);
        },
      }}
    >
      <Counter />
    </TestContext.Provider>
  );
};

const Counter = () => {
  const context = useContext(TestContext);

  return (
    <div>
      <p>{context.counter}</p>
      <button onClick={context.increase}>INCREASE</button>
      <button onClick={context.decrease}>DECREASE</button>
    </div>
  );
};

const TestPage = () => {
  const context = useContext(TestContext);
  console.log(context);
  return (
    <>
      <ComponentA />
      <ComponentA />
    </>
  );
};

export default TestPage;
