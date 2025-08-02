export function arraysEqualIgnoreOrder(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const setA = new Set(a);
  const setB = new Set(b);
  return a.every(item => setB.has(item)) && b.every(item => setA.has(item));
};