'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketCard, MarketCardSkeleton } from '@/components/market-card';
import { PriceChart } from '@/components/price-chart';
import { OrderPanel } from '@/components/order-panel';
import { useTopCoins, useSelectedCoin } from '@/hooks/use-coins';

export default function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const coinParam = searchParams.get('coin');
  
  const { coins, isLoading: isLoadingCoins } = useTopCoins(6);
  const { 
    selectedCoinId, 
    setSelectedCoinId, 
    coinDetails, 
    chartData, 
    isLoading: isLoadingSelected 
  } = useSelectedCoin(coinParam || 'bitcoin');
  
  // Update URL when selected coin changes
  useEffect(() => {
    if (selectedCoinId && selectedCoinId !== 'bitcoin') {
      router.push(`/?coin=${selectedCoinId}`, { scroll: false });
    } else if (selectedCoinId === 'bitcoin' && coinParam) {
      router.push('/', { scroll: false });
    }
  }, [selectedCoinId, router, coinParam]);

  // Handle selection of a coin from the market snapshot
  const handleCoinSelect = (coinId: string) => {
    setSelectedCoinId(coinId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-8 space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor live cryptocurrency prices and trade without risk.
        </p>
      </div>
      
      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Global Market Cap</CardTitle>
            <CardDescription>Total value of all cryptocurrencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.41T</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              +2.4% <span className="text-muted-foreground ml-2">vs yesterday</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">24h Volume</CardTitle>
            <CardDescription>Total trading volume across all markets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$84.7B</div>
            <p className="text-xs text-red-500 flex items-center mt-1">
              -1.2% <span className="text-muted-foreground ml-2">vs yesterday</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">BTC Dominance</CardTitle>
            <CardDescription>Bitcoin's share of total market cap</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48.2%</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              +0.3% <span className="text-muted-foreground ml-2">vs yesterday</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Chart and Order Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <PriceChart 
          coinId={selectedCoinId}
          coinName={coinDetails?.name || "Loading..."}
          chartData={chartData}
          isLoading={isLoadingSelected}
        />
        
        <OrderPanel 
          selectedCoinId={selectedCoinId}
          onSelectCoin={setSelectedCoinId}
        />
      </div>
      
      {/* Market Snapshot */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Market Snapshot</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {isLoadingCoins ? (
            // Show skeletons while loading
            Array(6).fill(0).map((_, index) => (
              <MarketCardSkeleton key={index} />
            ))
          ) : (
            // Show market cards once loaded
            coins?.map((coin) => (
              <MarketCard 
                key={coin.id} 
                coin={coin}
                onClick={() => handleCoinSelect(coin.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}