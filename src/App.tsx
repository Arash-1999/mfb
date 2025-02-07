import "./App.css";
import { FB } from "./config/form-builder";

function App() {
  return (
    <>
      <FB.Builder
        inputs={[
          {
            type: "text",
            props: { path: "text-1" },
            field: { label: "Text 1" },
          },
          {
            type: "text",
            props: { path: "text-2" },
            field: { label: "Text 2" },
          },
          {
            type: "text",
            props: { path: "text-3" },
            field: { label: "Text 3" },
          },
          {
            type: "radio",
            props: {
              path: "radio-1",
              options: [
                { key: "option-1", value: "option-1", label: "Option 1" },
                { key: "option-2", value: "option-2", label: "Option 2" },
                { key: "option-3", value: "option-3", label: "Option 3" },
              ],
            },
            field: { span: 6 },
          },
        ]}
      />
    </>
  );
}

export default App;
