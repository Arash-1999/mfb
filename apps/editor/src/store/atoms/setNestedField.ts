import { BUILDER_MODE } from "@/types/builder";
import { AdvancedForm, BasicForm, NormalForm } from "./form";

function setNestedField<T extends object>(obj: T, path: string, value: any): T {
  if (!path) return { ...obj, ...value };

  const keys = path.split(".");
  const newObj = { ...obj };
  let current: any = newObj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }

  const finalKey = keys[keys.length - 1];
  current[finalKey] = value;

  return newObj;
}

export const addItemToFormAtom = (
  currentForm: AdvancedForm | BasicForm | NormalForm,
  currentPath: string | null,
  newItem: AdvancedForm | BasicForm | NormalForm
) => {
  if (!currentForm) return currentForm;

  if (currentPath && currentPath.includes(".inputs")) {
    const pathParts = currentPath.split(".");
    const cardIndex = parseInt(pathParts[0], 10);

    if (
      isNaN(cardIndex) ||
      !currentForm.cards ||
      cardIndex >= currentForm.cards.length
    ) {
      console.warn("Invalid card index:", cardIndex);
      return currentForm;
    }

    const updatedCards = [...currentForm.cards];
    const targetCard = { ...updatedCards[cardIndex] };

    if (!targetCard.inputs) {
      targetCard.inputs = [];
    }

    targetCard.inputs = [...targetCard.inputs, newItem];
    updatedCards[cardIndex] = targetCard;

    return {
      ...currentForm,
      cards: updatedCards,
    };
  }

  if (currentPath && currentPath.includes(".list")) {
    const pathParts = currentPath.split(".");

    let currentLevel: AdvancedForm = currentForm.list || [];
    let parentPath = "list";

    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];

      if (part === "list") {
        continue;
      }

      const index = parseInt(part, 10);
      if (
        !isNaN(index) &&
        currentLevel &&
        Array.isArray(currentLevel) &&
        index < currentLevel.length
      ) {
        if (i === pathParts.length - 1 || pathParts[i + 1] !== "list") {
          const newArray = [...currentLevel, newItem];
          return setNestedField(currentForm, parentPath, newArray);
        } else {
          currentLevel = currentLevel[index].list;
          parentPath += `.${index}.list`;
        }
      } else {
        console.warn("Invalid path for advanced mode:", currentPath);
        return currentForm;
      }
    }

    const newArray = [...currentLevel, newItem];
    return setNestedField(currentForm, parentPath, newArray);
  }

  const targetPath = currentPath || "";

  let targetArray: any[];
  let basePath: string = "";

  if (currentForm.type === BUILDER_MODE.ADVANCED) {
    basePath = "list";
    targetArray = currentForm.list || [];
  } else if (currentForm.type === BUILDER_MODE.BASIC) {
    basePath = "inputs";
    targetArray = currentForm.inputs || [];
  } else if (currentForm.type === BUILDER_MODE.NORMAL) {
    basePath = "cards";
    targetArray = currentForm.cards || [];
  } else {
    return currentForm;
  }

  if (targetPath) {
    const pathParts = targetPath.split(".");
    let currentLevel: any = currentForm;

    for (const part of pathParts) {
      if (currentLevel && typeof currentLevel === "object") {
        if (Array.isArray(currentLevel)) {
          const index = parseInt(part, 10);
          if (!isNaN(index) && index >= 0 && index < currentLevel.length) {
            currentLevel = currentLevel[index];
          } else {
            const item = currentLevel.find((item: any) => item.name === part);
            if (item) {
              currentLevel = item;
            } else {
              break;
            }
          }
        } else {
          currentLevel = currentLevel[part];
        }
      } else {
        break;
      }
    }

    if (currentLevel && typeof currentLevel === "object") {
      if (currentLevel.list) {
        targetArray = currentLevel.list;
        basePath = `${targetPath}.list`;
      } else if (currentLevel.inputs) {
        targetArray = currentLevel.inputs;
        basePath = `${targetPath}.inputs`;
      } else if (currentLevel.cards) {
        targetArray = currentLevel.cards;
        basePath = `${targetPath}.cards`;
      } else if (Array.isArray(currentLevel)) {
        targetArray = currentLevel;
        basePath = targetPath;
      }
    }
  }

  if (!Array.isArray(targetArray)) {
    console.warn("Target is not an array at path:", targetPath);
    return currentForm;
  }

  const newArray = [...targetArray, newItem];
  return setNestedField(currentForm, basePath, newArray);
};
