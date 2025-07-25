"use client";
import { useState } from 'react';

const breakpoints = [600, 900, 1200, 1536];

export default function Page() {
  const [width, setWidth] = useState<number>(breakpoints[0]);

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
          className="border border-amber-700 resize"
          height={500}
          src="/preview"
          width={width}
        />
      </div>
    </main>
  );
}
