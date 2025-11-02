import { Mode } from "@/components/layout/editor";

const Page = async ({
  params,
}: {
  params: Promise<{ mode: "advanced" | "basic" | "normal" }>;
}) => {
  const p = await params;
  return <Mode mode={p.mode} />;
};

export async function generateStaticParams() {
  return ["advanced", "basic", "normal"].map((mode) => ({ mode }));
}
export default Page;
