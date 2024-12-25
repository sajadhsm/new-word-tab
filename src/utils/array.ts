export function intersect(a: string[], b: string[]) {
  const setA = new Set(a)
  const setB = new Set(b)

  const intersection = new Set([...setA].filter(x => setB.has(x)))

  return Array.from(intersection)
}
