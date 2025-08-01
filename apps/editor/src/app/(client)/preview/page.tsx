'use client';
import type { BuilderMessage } from "@/types/message";

import { NormalMuiFB } from "@/builder";
import { useEffect, useState } from "react";

const Page = () => {
  const [builderProps, setBuilderProps] = useState<BuilderMessage | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<BuilderMessage>) => {
      setBuilderProps(event.data);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const renderBuilder = (builder: BuilderMessage) => {
    const baseProps = {
      id: "form-1024" as const,
      onSubmit: console.log,
    };

    switch (builder.type) {
      case "advanced":
        return <NormalMuiFB.AdvancedBuilder list={builder.list} {...baseProps} />;
      case "basic":
        return <NormalMuiFB.BasicBuilder inputs={builder.list} {...baseProps} />;
      case "normal":
        return <NormalMuiFB.Builder cards={builder.list} {...baseProps} />;
    }
  };

  return (
    <>
      <h1>Preview</h1>

      {builderProps !== null ? (
        <>
          <p>{builderProps.type}</p>
          <pre>{JSON.stringify(builderProps.list, null, 2)}</pre>

          {renderBuilder(builderProps)}
        </>
      ) : null}
    </>
  );
};

export default Page;
