import { FormBuilder } from "@mfb/core";

import type { EditableMuiConfig, FormId, NormalMuiConfig } from './config';

import { editableConfig, normalConfig } from './config';

/* 
 * mui form builder with draggable grid components
 * it should be used for in edit mode
 * */
const EditableMuiFB = new FormBuilder<EditableMuiConfig, FormId>(editableConfig);

const NormalMuiFB = new FormBuilder<NormalMuiConfig, FormId>(normalConfig);

export {  EditableMuiFB, NormalMuiFB };
export type { EditableMuiConfig, FormId, NormalMuiConfig };
