export function fuzzyMatch(query: string, text: string): number {
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  if (t.includes(q)) return 1
  let qi = 0, score = 0, consecutive = 0
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      score += 1 + consecutive
      consecutive++
      qi++
    } else {
      consecutive = 0
    }
  }
  return qi === q.length ? score / (q.length * (q.length + 1) / 2) : 0
}
