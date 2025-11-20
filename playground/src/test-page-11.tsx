// import { MuiFB } from "./mui-plugin";
import { FB } from "./form-builder";

interface Schema {
  akbar: string;
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
