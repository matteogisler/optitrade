'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MarketTable } from '@/components/market-table';
import { useTopCoins } from '@/hooks/use-coins';

export default function MarketPage() {
  const { coins, isLoading } = useTopCoins(100);
  
  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Market</h1>
        <p className="text-muted-foreground">
          Browse and search for cryptocurrencies by market cap, price, and more.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Cryptocurrencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,000+</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Exchanges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">500+</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.41T</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$84.7B</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Cryptocurrencies</CardTitle>
          <CardDescription>
            View the top 100 cryptocurrencies by market capitalization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MarketTable 
            coins={coins} 
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}