// import { MuiFB } from "./mui-plugin";
import { FB } from "./form-builder";

interface Schema {
  akbar: string;
  "test-1": string;
  "test-2": string;
}

const Page = () => {
  return (
    <>
      <h1></h1>

      <FB.Builder<Schema>
        id="TEST_PAGE_FORM_ID"
        cards={[
          {
            isGroup: true,
            type: "tab-group",
            variant: "normal",
            required: true,
            inputs: [
              {
                list: [
                  {
                    type: "text",
                    name: "akbar",
                    props: {
                      textFieldProps: {
                        label: "Akbar",
                        placeholder: "Akbar",
                        size: "small",
                      },
                    },
                    required: true,
                    validation: {
                      format: "email",
                      type: "string",
                      minLength: 1,
                    },
                  },
                  {
                    type: "text",
                    props: {
                      textFieldProps: {
                        label: "test 1",
                        placeholder: "test 1",
                      },
                    },
                    name: "test-1",
                  },
                  {
                    type: "text",
                    props: {
                      textFieldProps: {
                        label: "test 2",
                        placeholder: "test 2",
                      },
                    },
                    name: "test-2",
                    dependsOn: {
                      type: "disable",
                      condition: "lt",
                      id: "lt-test-2",
                      path: "test-1",
                      value: 10,
                    },
                  },
                ],
                title: "Something",
              },
            ],
          },
        ]}
        onSubmit={console.log}
      />
    </>
  );
};

// const schema = {
//   properties: {
//     akbar: {
//       type: "string",
//       format: "time",
//       formatMaximum: "18:00",
//       formatMinimum: "08:00",
//     },
//   },
//   required: ["akbar"],
//   type: "object",
// };
export default Page;
