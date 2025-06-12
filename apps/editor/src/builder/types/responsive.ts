import type { Breakpoint } from "@mui/material";

type ResponsiveStyleValue<T> = T | { [key in Breakpoint]?: null | null };

export type { ResponsiveStyleValue };
