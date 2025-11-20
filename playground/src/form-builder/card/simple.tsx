import type { SimpleCardProps } from "@mfb/core";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import CardHeader from "./header";
import { ExpandMoreOutlined } from "@mui/icons-material";

const AccordionCard = ({ children, header }: SimpleCardProps<any>) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
        <CardHeader header={header} />
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

const PaperCard = ({
  children,
  header,
  required,
  validation,
}: SimpleCardProps<any>) => {
  console.log(validation);

  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <CardHeader header={header} />
      </Box>
      {required ? <Typography>This field is required.</Typography> : null}

      <Box sx={{ p: 2 }}>{children}</Box>
    </Paper>
  );
};

export { AccordionCard, PaperCard };
