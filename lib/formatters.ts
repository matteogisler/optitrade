export function formatNumber(num: number, digits = 2): string {
  if (num == null) return 'N/A';
  if (num >= 1e9) return `$${(num / 1e9).toFixed(digits)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(digits)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(digits)}K`;
  return `$${num.toFixed(digits)}`;
}

export function formatPercentage(
  percent: number | null | undefined
): { value: string; isPositive: boolean } {
  if (percent == null) return { value: 'N/A', isPositive: true };
  const isPositive = percent >= 0;
  return {
    value: `${isPositive ? '+' : ''}${percent.toFixed(2)}%`,
    isPositive,
  };
}

export function formatPrice(price: number): string {
  if (price == null) return 'N/A';
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  if (price < 10) return `$${price.toFixed(2)}`;
  return `$${price.toFixed(2)}`;
}
