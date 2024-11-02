export function getItemPriority(item: string): number {
  if (item >= "a" && item <= "z") {
    return item.charCodeAt(0) - "a".charCodeAt(0) + 1;
  } else if (item >= "A" && item <= "Z") {
    return item.charCodeAt(0) - "A".charCodeAt(0) + 27;
  }
  throw new Error(`${item} is not an expected character`);
}
