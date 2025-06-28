import { formAtom } from "@/store";
import { useAtom } from "jotai";

const BasicPreview = () => {
  const [form] = useAtom(formAtom);

  return (
    <>
      {form.list.map((item, index) => (
        <div key={`item-${index}`}>
          {typeof item === "function" ? item().name : item.name}
        </div>
      ))}
    </>
  );
};

export { BasicPreview };
