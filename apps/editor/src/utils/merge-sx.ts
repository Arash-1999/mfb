import type { SxProps, Theme } from "@mui/material";

const mergeSx = (...args: Array<SxProps<Theme> | undefined>) => {
  return args.reduce<SxProps<Theme>>((acc, cur) => {
    if (typeof cur === "undefined") return acc;
    if (!Array.isArray(acc)) return [];

    acc.push(...(Array.isArray(cur) ? cur : [cur]));

    return acc;
  }, []);
};

export { mergeSx };
