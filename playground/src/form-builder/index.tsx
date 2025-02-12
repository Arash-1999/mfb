import { FormBuilder } from '@mfb/core';

const FB = new FormBuilder({
  input: {},
  field: () => <></>,
  layout: {
    "grid-container": () => <></>,
    "grid-item": () => <></>,
    field: () => <></>
  }
})


export {FB};