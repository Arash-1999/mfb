import type { ReactNode } from "react";

import { Box, Typography } from "@mui/material";

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
        alignItems: "center",
        display: "flex",
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
