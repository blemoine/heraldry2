export function cannotHappen(x: never): never {
  throw new Error(`${JSON.stringify(x)} is not a valid value`);
}
