import { FieldPath, FieldValues } from "react-hook-form";
import isKey from "./isKey";
import stringToPath from "./stringToPath";

export default function removeAtPath(
  object: FieldValues,
  path: FieldPath<FieldValues>
) {
  const tempPath = isKey(path) ? [path] : stringToPath(path);
  const lastIndex = tempPath.length - 1;
  let current: any = object;

  for (let i = 0; i < tempPath.length; i++) {
    const key = tempPath[i];

    if (key === "__proto__" || key === "constructor" || key === "prototype")
      return;

    if (i === lastIndex) {
      const index = Number(key);

      if (Array.isArray(current) && !isNaN(index)) {
        current.splice(index, 1);
      } else if (current && typeof current === "object") {
        delete current[key];
      }

      return object;
    }

    if (current[key] === undefined || current[key] === null) {
      return object;
    }

    current = current[key];
  }

  return object;
}
