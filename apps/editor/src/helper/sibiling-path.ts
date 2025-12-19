export function arePathsSiblings(path1: string, path2: string) {
  if (!path1 || !path2) return false;

  const parts1 = path1.split(".");
  const parts2 = path2.split(".");

  if (parts1.length !== parts2.length) return false;

  for (let i = 0; i < parts1.length - 1; i++) {
    if (parts1[i] !== parts2[i]) {
      return false;
    }
  }
  return parts1[parts1.length - 1] === parts2[parts2.length - 1];
}

export function arePathsSiblingsWithParent(path1: string, path2: string) {
  if (!path1 || !path2) return { areSiblings: false, parentPath: null };
  if (path1 === path2) return { areSiblings: false, parentPath: null };

  const parts1 = path1.split(".");
  const parts2 = path2.split(".");

  if (parts1.length !== parts2.length) {
    return { areSiblings: false, parentPath: null };
  }

  for (let i = 0; i < parts1.length - 1; i++) {
    if (parts1[i] !== parts2[i]) {
      return { areSiblings: false, parentPath: null };
    }
  }

  const areSiblings = parts1[parts1.length - 1] !== parts2[parts2.length - 1];
  const parentPath = parts1.slice(0, -1).join(".");

  return { areSiblings, parentPath };
}
export function getLastIndexFromPath(path: string) {
  if (!path || typeof path !== "string") return null;

  // Split by dots and get the last part
  const parts = path.split(".");
  const lastPart = parts[parts.length - 1];

  // Try to parse the last part as a number
  const lastIndex = parseInt(lastPart, 10);

  // Return the number if it's valid, otherwise return the last part as string
  return !isNaN(lastIndex) ? lastIndex : lastPart;
}
