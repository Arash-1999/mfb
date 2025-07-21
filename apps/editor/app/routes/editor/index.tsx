import type { Route } from "./+types/index";

import { useState } from "react";

export async function clientLoader() {
  const innerWidth = window.innerWidth - 16;

  return { innerWidth };
}

const breakpoints = [600, 900, 1200, 1536];

export default function Page({ loaderData }: Route.ComponentProps) {
  const [width, setWidth] = useState<number>(() => {
    return loaderData.innerWidth;
  });

  return (
    <main>
      <h1>Mfb Editor</h1>
      <p>choose your UI-Kit</p>

      <div className="flex gap-2">
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
          width={width}
          height={500}
          src="/preview"
          className="border border-amber-700 resize"
        />
      </div>
    </main>
  );
}
