import { FormBuilder } from "@mfb/core";

import type { EditableMuiConfig, FormId, DraggableMuiConfig, MuiConfig } from "./config";

import { editableConfig, draggableConfig, muiConfig } from "./config";

/*
 * mui form builder with draggable grid components
 * it should be used for in edit mode
 * */
const EditableMuiFB = new FormBuilder<EditableMuiConfig, FormId>(
  editableConfig
);

const DraggableMuiFB = new FormBuilder<DraggableMuiConfig, FormId>(
  draggableConfig
);

const MuiFB = new FormBuilder<MuiConfig, FormId>(
  muiConfig
);

export { EditableMuiFB, DraggableMuiFB, MuiFB };
export type { EditableMuiConfig, FormId, DraggableMuiConfig, MuiConfig };
