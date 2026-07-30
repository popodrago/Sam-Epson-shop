/**
 * Format numeric price into Rwandan Francs (RWF)
 * e.g. 45000 -> "45,000 RWF"
 */
export function formatRWF(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '0 RWF';
  }
  return `${amount.toLocaleString()} RWF`;
}
