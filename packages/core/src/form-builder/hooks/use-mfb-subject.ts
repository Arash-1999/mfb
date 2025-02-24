import type { MfbState } from "@/form-builder/types";

import mfbSubject from "@/form-builder/pub-sub";
import { useSubject } from "@/pub-sub/hooks/use-subject";

const useMfbSubject = ({
  action,
  name,
}: {
  action: (action: MfbState) => void;
  name: string;
}) => {
  useSubject<MfbState, (action: MfbState) => void>({
    action,
    id: name,
    subject: mfbSubject,
  });
};

export { useMfbSubject };
