import { FieldPath, FieldValues } from "react-hook-form";
import isKey from "./isKey";
import isObject from "./isObject";
import stringToPath from "./stringToPath";

export default function moveToPath(
  object: FieldValues,
  sourcePath: FieldPath<FieldValues>,
  targetPath: FieldPath<FieldValues>
) {
  // First, find and extract the source value WITHOUT removing it yet
  const sourceTempPath = isKey(sourcePath)
    ? [sourcePath]
    : stringToPath(sourcePath);
  let current: any = object;
  let sourceParent: any = null;
  let sourceKey: string | number = "";
  let sourceValue: unknown;
  let sourceIndex: number = -1;

  // Traverse to find the source value and its parent
  for (let i = 0; i < sourceTempPath.length; i++) {
    const key = sourceTempPath[i];

    if (key === "__proto__" || key === "constructor" || key === "prototype")
      return object;

    if (i === sourceTempPath.length - 1) {
      sourceParent = current;
      sourceKey = key;
      const index = Number(key);

      if (Array.isArray(current) && !isNaN(index)) {
        sourceValue = current[index];
        sourceIndex = index;
      } else if (current && typeof current === "object") {
        sourceValue = current[key];
      }
      break;
    }

    if (current[key] === undefined || current[key] === null) {
      return object;
    }

    current = current[key];
  }

  // If we didn't find a source value, return early
  if (sourceValue === undefined) return object;

  // Now insert at target path FIRST
  const targetTempPath = isKey(targetPath)
    ? [targetPath]
    : stringToPath(targetPath);
  const lastIndex = targetTempPath.length - 1;
  current = object;

  for (let i = 0; i < targetTempPath.length; i++) {
    const key = targetTempPath[i];

    if (key === "__proto__" || key === "constructor" || key === "prototype")
      return object;

    if (i === lastIndex) {
      const index = Number(key);

      if (!Array.isArray(current)) {
        throw new Error("moveToPath: Target path destination must be an array");
      }

      // Insert at target position
      current.splice(index, 0, sourceValue);

      // Now remove from source position
      // We need to adjust the source index if target is before source in the same array
      if (sourceParent === current && typeof sourceIndex === "number") {
        // If we're moving within the same array and target is before source
        if (index <= sourceIndex) {
          sourceIndex += 1; // Adjust because we inserted before the original position
        }
        sourceParent.splice(sourceIndex, 1);
      } else {
        // Different arrays or moving between objects
        if (Array.isArray(sourceParent) && typeof sourceIndex === "number") {
          sourceParent.splice(sourceIndex, 1);
        } else if (sourceParent && typeof sourceParent === "object") {
          delete sourceParent[sourceKey];
        }
      }

      return object;
    }

    if (
      current[key] === undefined ||
      current[key] === null ||
      (!isObject(current[key]) && !Array.isArray(current[key]))
    ) {
      const nextKey = targetTempPath[i + 1];
      current[key] = !isNaN(+nextKey) ? [] : {};
    }

    current = current[key];
  }

  return object;
}
