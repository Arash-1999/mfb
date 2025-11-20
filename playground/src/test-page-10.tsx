// import { MuiFB } from "./mui-plugin";
import { FB } from "./form-builder";

interface Schema {
  akbar: string;
}

const Page = () => {
  return (
    <>
      <h1></h1>

      <FB.BasicBuilder<Schema>
        id="TEST_PAGE_FORM_ID"
        inputs={[
          {
            name: "akbar",
            props: {
              textFieldProps: {
                size: "small",
                placeholder: "Akbar",
                label: "Akbar",
              },
            },
            required: true,
            type: "text",
            validation: {
              type: "string",
              format: "date",
              formatMinimum: "2016-02-06",
              formatMaximum: "2018-02-06",
              // formatExclusiveMaximum: "2016-12-27",
            },
          },
        ]}
        onSubmit={console.log}
      />
    </>
  );
};

export default Page;
