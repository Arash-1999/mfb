import type { SimpleCardProps } from "@mfb/core";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
} from "@mui/material";
import CardHeader from "./header";
import { ExpandMoreOutlined } from "@mui/icons-material";

const AccordionCard = ({ children, header }: SimpleCardProps) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
        <CardHeader header={header} />
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

const PaperCard = ({ children, header }: SimpleCardProps) => {
  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <CardHeader header={header} />
      </Box>

      <Box sx={{ p: 2 }}>{children}</Box>
    </Paper>
  );
};

export { AccordionCard, PaperCard };
