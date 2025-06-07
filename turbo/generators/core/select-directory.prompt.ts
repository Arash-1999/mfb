import type { Status, Theme } from "@inquirer/core";
import type { PartialDeep } from "@inquirer/type";

import {
  createPrompt,
  isDownKey,
  isEnterKey,
  isUpKey,
  makeTheme,
  useKeypress,
  useMemo,
  usePagination,
  usePrefix,
  useState,
} from "@inquirer/core";
import { readdirSync } from "fs";

interface IConfig {
  basePath: string;
  message: string;
  theme?: PartialDeep<Theme>;
  validate?: (path: string) => boolean;
}

const pageSize = 7;

const directorySelect = createPrompt<string, IConfig>((config, done) => {
  const [path, setPath] = useState<string>(config.basePath);
  const [active, setActive] = useState<number>(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const items = useMemo(() => getDirectories(path), [path]);
  const theme = makeTheme(config.theme);
  const prefix = usePrefix({ status, theme });

  const message = theme.style.message(config.message, status);
  useKeypress((key, rl) => {
    rl.clearLine(0);
    if (isEnterKey(key)) {
      let result = "";
      if (items[active] === "" || !items[active]) {
        result = path;
      } else {
        result = `${path}/${items[active]}`;
      }
      if (config.validate) {
        if (config.validate(result)) {
          setStatus("done");
          done(result);
        } else {
          setError("Selected directory is not valid");
        }
      } else {
        setStatus("done");
        done(result);
      }
    } else if (isUpKey(key)) {
      if (active > 0) {
        setActive(active - 1);
        setError("");
      }
    } else if (isDownKey(key)) {
      if (active < items.length - 1) {
        setActive(active + 1);
        setError("");
      }
    } else if (key.name === "l" || key.name === "right") {
      setPath(`${path}/${items[active]}`);
      setActive(0);
      setError("");
    } else if (key.name === "h" || key.name === "left") {
      if (path !== config.basePath) {
        setPath(path.split("/").slice(0, -1).join("/"));
        setError("");
      }
    }
  });

  const page = usePagination({
    active,
    items,
    pageSize,
    renderItem: ({ isActive, item }) => {
      const color = isActive ? theme.style.highlight : (s: string) => s;
      const cursor = isActive ? ">" : "-";

      return color(`${cursor} ${item}`);
    },
  });

  let helpTipBottom = "";

  if (items.length > pageSize) {
    helpTipBottom = `\n${theme.style.help("(Use arrow keys to reveal more choices)")}`;
  }
  helpTipBottom += `\n${theme.style.help("(Use Enter to select directory)")}`;

  const successMessage = `${[prefix, message].filter(Boolean).join(" ")}\n${page}${helpTipBottom}`;

  return error === ""
    ? successMessage
    : [successMessage, theme.style.error(error)];
});

const getDirectories = (basePath: string) => {
  return readdirSync(basePath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((item) => item.name);
};

export default directorySelect;
