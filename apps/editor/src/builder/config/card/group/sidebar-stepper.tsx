import type { GroupCardProps } from "@mfb/core";

import { useState } from "react";

type MfbSidebarStepperProps = GroupCardProps<{
  title?: string;
}>;

const MfbSidebarStepper = ({
  addGrid,
  disabled,
  nodes,
}: MfbSidebarStepperProps) => {
  const [step, setStep] = useState<null | number>(null);

  return (
    <>
      {addGrid(
        <div className="stikcy top-14 w-48 h-[calc(100vh-60px)] p-2">
          <div>
            <div className="flex justify-between mb-2">
              <button
                onClick={() => {
                  setStep(null);
                }}
                type="button"
              >
                &lt;-
              </button>
              <button type="submit">SUBMIT</button>
            </div>
            <input
              className="flex-1 w-full border mb-4"
              placeholder="name"
              type="text"
            />
            {step !== null && nodes[step] ? (
              <>{nodes[step].children}</>
            ) : (
              <ul className="grid gap-2">
                {nodes.map((node, index) => (
                  <li
                    // TODO: change style when disabled
                    className="rounded border border-amber-900 p-2 hover:bg-amber-50 transition cursor-pointer"
                    key={`step-${index}`}
                    onClick={() => {
                      if (!disabled) {
                        setStep(index);
                      }
                    }}
                  >
                    <p>
                      {typeof node.title === "string"
                        ? node.title
                        : node.title.left}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>,
        0,
      )}
    </>
  );
};

export { MfbSidebarStepper };
