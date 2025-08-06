"use client";

import { editorLayoutAtom, formAtom } from "@/store/atoms";
import { BUILDER_MODE, BuilderMode } from "@/types/builder";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

// import { useState } from 'react';

// const breakpoints = [600, 900, 1200, 1536];

export default function Page() {
  const [formAtomValue, setFormAtom] = useAtom(formAtom);
  const setEditorLayoutAtom = useSetAtom(editorLayoutAtom);
  // const [width, setWidth] = useState<number>(breakpoints[0]);

  return (
    <main>
      <h1>Mfb Editor</h1>
      {formAtomValue === null ? (
        <>
          <p>choose your UI-Kit</p>
          <div className="flex gap-2">
            {(Object.values(BUILDER_MODE) as BuilderMode[]).map((mode) => (
              <button
                key={mode}
                className="border border-amber-700 py-1 px-4 cursor-pointer"
                onClick={() => {
                  setFormAtom(() => ({
                    type: mode,
                    list: [],
                  }));
                }}
              >
                {mode}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <p>This is your form.</p>
          <button
            onClick={() => {
              setEditorLayoutAtom({
                currentPath: "",
                sidebarOpen: true,
              });
            }}
          >
            APPEND TO ROOT
          </button>
        </>
      )}

      {/* <div className="flex gap-2">
        {breakpoints.map((breakpoint) => (
          <button
            className="border rounded border-amber-500 py-2 px-4"
            key={breakpoint}
            onClick={() => {
              setWidth(breakpoint);
            }}
          >
            {breakpoint}
          </button>
        ))}
      </div>

      <div className="max-w-screen overflow-auto p-1">
        <iframe
          className="border border-amber-700 resize"
          height={500}
          src="/preview"
          width={width}
        />
      </div> */}
    </main>
  );
}
