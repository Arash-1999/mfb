import type { SimpleCardProps } from "@mfb/core";

import type { MfbPaperProps } from "./type";

import { Box, CardHeader, Paper } from "@mui/material";

const MfbPaper = ({
  children,
  header,
  paperProps,
  disabled,
}: SimpleCardProps<MfbPaperProps>) => {
  return (
    <Paper {...paperProps} aria-disabled={disabled}>
      <Box sx={{ p: 2 }}>
        <CardHeader header={header} />
      </Box>

      {children}
    </Paper>
  );
};

export { MfbPaper };
