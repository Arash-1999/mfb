"use client";
import { EditableMuiFB, MuiFB } from "@/builder";
import { editorLayoutAtom, formAtom } from "@/store/atoms";
import { resetSidebarStateAtom } from "@/store/atoms/sidebar";
import { BUILDER_MODE, BuilderMode } from "@/types/builder";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Mode = ({ mode }: { mode: "advanced" | "basic" | "normal" }) => {
  const [formAtomValue, setFormAtom] = useAtom(formAtom);
  const [, resetSidebarState] = useAtom(resetSidebarStateAtom);

  const setEditorLayoutAtom = useSetAtom(editorLayoutAtom);
  const router = useRouter();
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  const getCategoriesByMode = (mode: BuilderMode) => {
    switch (mode) {
      case BUILDER_MODE.ADVANCED: {
        return {
          type: mode,
          list: [],
        };
      }
      case BUILDER_MODE.BASIC: {
        return {
          type: mode,
          inputs: [],
        };
      }
      case BUILDER_MODE.NORMAL: {
        return {
          type: mode,
          cards: [],
        };
      }
    }
  };

  useEffect(() => {
    setFormAtom((perv) => getCategoriesByMode(mode));
    setEditorLayoutAtom({
      currentPath: null,
      sidebarOpen: true,
    });
  }, [mode]);

  const handleBack = () => {
    router.back();
    setEditorLayoutAtom({
      currentPath: null,
      sidebarOpen: false,
    });
    resetSidebarState();
  };

  const myAtom = useAtom(formAtom);
  return (
    <>
      {client && <button onClick={handleBack}>back</button>}
      {/* <pre>{JSON.stringify(myAtom, null, 2)}</pre> */}
      {BUILDER_MODE.BASIC === mode && myAtom?.[0] && "inputs" in myAtom[0] && (
        <EditableMuiFB.BasicBuilder<any>
          id="TEST_PAGE_FORM_ID"
          gridContainerProps={{
            spacing: 2,
            mt: 8,
            p: 2,
          }}
          inputs={myAtom?.[0]?.inputs}
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      )}

      {BUILDER_MODE.NORMAL === mode && myAtom?.[0] && "cards" in myAtom[0] && (
        <EditableMuiFB.Builder<any>
          gridContainerProps={{
            spacing: 2,
            mt: 8,
            p: 2,
          }}
          cards={myAtom[0].cards}
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      )}
      {BUILDER_MODE.ADVANCED === mode && myAtom?.[0] && "list" in myAtom[0] && (
        <EditableMuiFB.AdvancedBuilder<any>
          gridContainerProps={{
            spacing: 2,
            mt: 8,
            p: 2,
          }}
          list={myAtom[0].list}
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      )}
    </>
  );
};
export { Mode };
