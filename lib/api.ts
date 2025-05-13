// // API functions for fetching crypto data from CoinGecko
// const API_BASE_URL = 'https://api.coingecko.com/api/v3';

// // Get top coins by market cap
// export async function getTopCoins(count: number = 10, page: number = 1): Promise<any> {
//   const response = await fetch(
//     `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${count}&page=${page}&sparkline=true&price_change_percentage=24h,7d`,
//     { next: { revalidate: 3 } } // Revalidate every 20 seconds
//   );
  
//   if (!response.ok) {
//     throw new Error('Failed to fetch top coins');
//   }
  
//   return response.json();
// }

// // Get detailed information about a specific coin
// export async function getCoinDetails(coinId: string): Promise<any> {
//   const response = await fetch(
//     `${API_BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
//     { next: { revalidate: 60 } }
//   );
  
//   if (!response.ok) {
//     throw new Error(`Failed to fetch details for ${coinId}`);
//   }
  
//   return response.json();
// }

// // Get historical chart data for a coin
// export async function getCoinChartData(coinId: string, days: number = 7): Promise<any> {
//   const response = await fetch(
//     `${API_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
//     { next: { revalidate: 60 } }
//   );
  
//   if (!response.ok) {
//     throw new Error(`Failed to fetch chart data for ${coinId}`);
//   }
  
//   return response.json();
// }

// // Get global crypto market data
// export async function getGlobalMarketData(): Promise<any> {
//   const response = await fetch(
//     `${API_BASE_URL}/global`,
//     { next: { revalidate: 60 } }
//   );
  
//   if (!response.ok) {
//     throw new Error('Failed to fetch global market data');
//   }
  
//   return response.json();
// }

// // Search for coins by name or symbol
// export async function searchCoins(query: string): Promise<any> {
//   const response = await fetch(
//     `${API_BASE_URL}/search?query=${query}`,
//     { next: { revalidate: 60 } }
//   );
  
//   if (!response.ok) {
//     throw new Error('Failed to search coins');
//   }
  
//   return response.json();
// }

// // Helper function to format large numbers
// export function formatNumber(num: number, digits: number = 2): string {
//   if (num === null || num === undefined) return 'N/A';
  
//   if (num >= 1e9) return `$${(num / 1e9).toFixed(digits)}B`;
//   if (num >= 1e6) return `$${(num / 1e6).toFixed(digits)}M`;
//   if (num >= 1e3) return `$${(num / 1e3).toFixed(digits)}K`;
  
//   return `$${num.toFixed(digits)}`;
// }

// // Format percentage with color indication
// export function formatPercentage(percent: number | null | undefined): { value: string, isPositive: boolean } {
//   if (percent === null || percent === undefined) {
//     return { value: 'N/A', isPositive: true };
//   }
  
//   const isPositive = percent >= 0;
//   const formattedValue = `${isPositive ? '+' : ''}${percent.toFixed(2)}%`;
  
//   return { value: formattedValue, isPositive };
// }

// // Format price based on value
// export function formatPrice(price: number): string {
//   if (price === null || price === undefined) return 'N/A';
  
//   if (price < 0.01) return `$${price.toFixed(6)}`;
//   if (price < 1) return `$${price.toFixed(4)}`;
//   if (price < 10) return `$${price.toFixed(2)}`;
  
//   return `$${price.toFixed(2)}`;
// }