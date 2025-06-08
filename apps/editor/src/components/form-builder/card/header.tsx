import {
    Box,
    Typography
} from "@mui/material";
import type { ReactNode } from "react";

const CardHeader = ({
  header,
}: {
  header: Record<"center" | "left" | "right", ReactNode> | string;
}) => {
  return typeof header === "string" ? (
    <Typography>{header}</Typography>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {header.left ? <Typography>{header.left}</Typography> : header.left}
      {header.center ? <Typography>{header.center}</Typography> : header.center}
      {header.right ? <Typography>{header.right}</Typography> : header.right}
    </Box>
  );
};

export default CardHeader;
