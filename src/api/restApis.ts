export async function getRecords() {
  return await Promise.resolve([
    {a: 1, b: 2},
    {a: 3, b: 4},
  ])
}
