"use client";
import type { Category } from "@/statics/items";

import { categoryDict, getCategoriesByMode } from "@/statics/items";
import { editorLayoutAtom } from "@/store/atoms";
import { readonlyBuilderMode } from "@/store/atoms/form";
// import { ChevronLeft } from "@mui/icons-material";
// import { IconButton } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";

const Sidebar = () => {
  const [{ sidebarOpen, currentPath }, setAtom] = useAtom(editorLayoutAtom);
  const builderMode = useAtomValue(readonlyBuilderMode);
  const [tabKey, setTabKey] = useState<Category>("");
  const [formKey, setFormKey] = useState<string>("");

  const filteredCategories = getCategoriesByMode(
    builderMode,
    currentPath || ""
  );

  return (
    <>
      <nav className="sticky top-14 rounded bg-amber-300 w-12 h-[calc(100vh-60px)] shrink-0"></nav>

      {/* <div className={tabKey !== "" ? "w-64" : "w-0"}> */}
      <div className="w-64">{renderStep()}</div>
    </>
  );

  function renderStep() {
    if (!sidebarOpen) {
      return <>sidebar is close</>;
    }

    if (tabKey === "") {
      return (
        <>
          <div className="flex flex-col gap-2">
            {(
              Object.keys(filteredCategories) as (keyof typeof categoryDict)[]
            ).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setTabKey(key);
                }}
              >
                {key.replaceAll("-", " ")}
              </button>
            ))}
          </div>
        </>
      );
    }

    if (formKey === "") {
      return (
        <div className="flex flex-col gap-2">
          {categoryDict[tabKey].options.map((item) => (
            <li className="border rounded" key={item.name}>
              <button
                className="cursor-pointer p-2 w-full h-full inline-block text-start"
                onClick={() => {
                  setFormKey(item.name);
                }}
              >
                {item.name.replaceAll("-", " ")}
              </button>
            </li>
          ))}
        </div>
      );
    }

    return categoryDict[tabKey].render(formKey as never);
  }
};

export { Sidebar };
