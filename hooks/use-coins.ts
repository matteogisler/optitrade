'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { Coin, CoinChartData, CoinDetails } from '@/lib/types'

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error('Fetch error')
    return res.json()
  })

export function useTopCoins(count = 10, page = 1) {
  const path = `/api/coins?count=${count}&page=${page}`
  const { data, error, isLoading, mutate } = useSWR<Coin[]>(
    path,
    fetcher,
    {
      refreshInterval: 60_000,
      errorRetryCount: 3,
      errorRetryInterval: 10_000,
    }
  )
  return { coins: data, isLoading, error, mutate }
}

export function useCoinDetails(coinId: string) {
  const path = coinId ? `/api/coins/${coinId}` : null
  const { data, error, isLoading } = useSWR<CoinDetails>(
    path,
    fetcher,
    { refreshInterval: 60_000 }
  )
  return { coinDetails: data, isLoading, error }
}

export function useCoinChart(coinId: string, days = 7) {
  const path = coinId ? `/api/chart?coinId=${coinId}&days=${days}` : null
  const { data, error, isLoading } = useSWR<CoinChartData>(
    path,
    fetcher,
    { refreshInterval: 60_000 }
  )
  return { chartData: data, isLoading, error }
}

export function useSelectedCoin(initial = 'bitcoin') {
  const [selectedCoinId, setSelectedCoinId] = useState(initial)
  const { coins }            = useTopCoins(100, 1)
  const { coinDetails, isLoading: ld } = useCoinDetails(selectedCoinId)
  const { chartData, isLoading: lc }   = useCoinChart(selectedCoinId)
  const selectedCoin = coins?.find(c => c.id === selectedCoinId)

  return {
    selectedCoinId,
    setSelectedCoinId,
    selectedCoin,
    coinDetails,
    chartData,
    isLoading: ld || lc,
  }
}
