import type { ButtonComponentProps } from "@mfb/core";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, IconButton } from "@mui/material";
import { createElement } from "react";

const icons = {
  append: AddIcon,
  prepend: AddIcon,
  remove: DeleteOutlineIcon,
};

interface MfbButtonProps extends ButtonComponentProps {
  icon?: keyof typeof icons;
  text?: string;
}

const MfbButton = ({ icon, text, ...props }: MfbButtonProps) => {
  return text ? (
    <Button {...props}>{text}</Button>
  ) : icon ? (
    <IconButton {...props}>{createElement(icons[icon])}</IconButton>
  ) : (
    <></>
  );
};

export { MfbButton };
