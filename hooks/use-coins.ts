'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { getTopCoins, getCoinChartData, getCoinDetails } from '@/lib/api';
import { Coin, CoinChartData, CoinDetails } from '@/lib/types';

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then(res => res.json());

/**
 * Hook to fetch and manage top coins by market cap
 */
export function useTopCoins(count: number = 10, page: number = 1) {
  const { data, error, isLoading, mutate } = useSWR(
    `coins-${count}-${page}`,
    () => getTopCoins(count, page),
    { refreshInterval: 60000 } // Refresh every 60 seconds
  );
  
  return {
    coins: data as Coin[] | undefined,
    isLoading,
    error,
    mutate
  };
}

/**
 * Hook to fetch and manage chart data for a specific coin
 */
export function useCoinChart(coinId: string, days: number = 7) {
  const { data, error, isLoading } = useSWR(
    coinId ? `chart-${coinId}-${days}` : null,
    () => getCoinChartData(coinId, days),
    { refreshInterval: 60000 }
  );
  
  return {
    chartData: data as CoinChartData | undefined,
    isLoading,
    error
  };
}

/**
 * Hook to fetch and manage detailed data for a specific coin
 */
export function useCoinDetails(coinId: string) {
  const { data, error, isLoading } = useSWR(
    coinId ? `details-${coinId}` : null,
    () => getCoinDetails(coinId),
    { refreshInterval: 60000 }
  );
  
  return {
    coinDetails: data as CoinDetails | undefined,
    isLoading,
    error
  };
}

/**
 * Hook to manage selected coin state
 */
export function useSelectedCoin(initialCoinId: string = 'bitcoin') {
  const [selectedCoinId, setSelectedCoinId] = useState<string>(initialCoinId);
  
  const { coins } = useTopCoins(100, 1);
  const { coinDetails, isLoading: isLoadingDetails } = useCoinDetails(selectedCoinId);
  const { chartData, isLoading: isLoadingChart } = useCoinChart(selectedCoinId);
  
  const selectedCoin = coins?.find(coin => coin.id === selectedCoinId);
  
  return {
    selectedCoinId,
    setSelectedCoinId,
    selectedCoin,
    coinDetails,
    chartData,
    isLoading: isLoadingDetails || isLoadingChart
  };
}