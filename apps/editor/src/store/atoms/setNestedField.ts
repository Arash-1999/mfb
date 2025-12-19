import { BUILDER_MODE } from "@/types/builder";
import { AdvancedForm, BasicForm, NormalForm } from "./form";

function hasList(
  item: unknown
): item is { list: (AdvancedForm | BasicForm | NormalForm)[] } {
  return typeof item === "object" && !!item && "list" in item;
}

function setNestedField<T extends object, V>(
  obj: T,
  path: string,
  value: V
): T {
  if (!path) return { ...obj, ...(value as object) };

  const keys = path.split(".");
  const newObj = structuredClone(obj) as Record<string, unknown>;
  let current: Record<string, unknown> = newObj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const existing = current[key];

    if (typeof existing === "object" && existing !== null) {
      current = existing as Record<string, unknown>;
    } else {
      const next: Record<string, unknown> = {};
      current[key] = next;
      current = next;
    }
  }

  const finalKey = keys[keys.length - 1];
  current[finalKey] = value as unknown;

  return newObj as T;
}

export const addItemToFormAtom = (
  currentForm: AdvancedForm | BasicForm | NormalForm,
  currentPath: string | null,
  newItem:
    | Omit<AdvancedForm, "type">
    | Omit<BasicForm, "type">
    | Omit<NormalForm, "type">
): AdvancedForm | BasicForm | NormalForm => {
  if (!currentForm) return currentForm;

  if (currentPath && currentPath.includes(".inputs")) {
    if (!("cards" in currentForm) || !Array.isArray(currentForm.cards)) {
      console.warn(
        "Invalid card structure for path with .inputs:",
        currentPath
      );
      return currentForm;
    }

    const pathParts = currentPath.split(".");
    const cardIndex = parseInt(pathParts[0], 10);

    if (
      isNaN(cardIndex) ||
      cardIndex < 0 ||
      cardIndex >= currentForm.cards.length
    ) {
      console.warn("Invalid card index:", cardIndex);
      return currentForm;
    }

    const updatedCards = currentForm.cards.map((c) => ({ ...c }));
    const targetCard = { ...updatedCards[cardIndex] };

    if ("inputs" in targetCard) {
      const newInputs = Array.isArray(targetCard.inputs)
        ? [...targetCard.inputs, newItem]
        : [newItem];

      targetCard.inputs = newInputs;
      updatedCards[cardIndex] = targetCard;

      return { ...currentForm, cards: updatedCards };
    }

    console.warn("Target card does not support inputs:", targetCard);
    return currentForm;
  }

  if (currentPath && currentPath.includes(".list")) {
    if (!("list" in currentForm) || !Array.isArray(currentForm.list)) {
      console.warn(
        "Invalid advanced list structure for path with .list:",
        currentPath
      );
      return currentForm;
    }

    const currentList = currentForm.list as unknown as (
      | AdvancedForm
      | BasicForm
      | NormalForm
    )[];
    let currentLevel = currentList;
    let parentPath = "list";

    const pathParts = currentPath.split(".");

    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      if (part === "list") continue;

      const index = parseInt(part, 10);

      if (
        !isNaN(index) &&
        Array.isArray(currentLevel) &&
        index < currentLevel.length
      ) {
        const node = currentLevel[index];

        if (i === pathParts.length - 1 || pathParts[i + 1] !== "list") {
          const newArray = [...currentLevel, newItem];
          return setNestedField(currentForm, parentPath, newArray);
        } else if (hasList(node)) {
          currentLevel = node.list as (AdvancedForm | BasicForm | NormalForm)[];
          parentPath += `.${index}.list`;
        } else {
          console.warn("Invalid node (no list) at path:", currentPath);
          return currentForm;
        }
      } else {
        console.warn("Invalid path for advanced mode:", currentPath);
        return currentForm;
      }
    }

    const newArray = [...currentLevel, newItem];
    return setNestedField(currentForm, parentPath, newArray);
  }

  if (currentForm.type === BUILDER_MODE.ADVANCED) {
    const arr = Array.isArray(currentForm.list) ? currentForm.list : [];
    const newArray = [...arr, newItem];
    return setNestedField(currentForm, "list", newArray);
  }

  if (currentForm.type === BUILDER_MODE.BASIC) {
    const arr = Array.isArray(currentForm.inputs) ? currentForm.inputs : [];
    const newArray = [...arr, newItem];
    return setNestedField(currentForm, "inputs", newArray);
  }

  if (currentForm.type === BUILDER_MODE.NORMAL) {
    const arr = Array.isArray(currentForm.cards) ? currentForm.cards : [];
    const newArray = [...arr, newItem];
    return setNestedField(currentForm, "cards", newArray);
  }

  return currentForm;
};

export function get<T extends object, R = unknown>(
  obj: T,
  path: string,
  defaultValue?: R
): R | undefined {
  return (
    path
      .split(".")
      .reduce(
        (acc: any, key) => (acc && key in acc ? acc[key] : undefined),
        obj
      ) ?? defaultValue
  );
}
