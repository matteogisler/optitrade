import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatPercentage, formatPrice } from '@/lib/api';
import { Coin } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

interface MarketCardProps {
  coin: Coin;
  onClick?: () => void;
}

export function MarketCard({ coin, onClick }: MarketCardProps) {
  const { value: percentChange, isPositive } = formatPercentage(coin.price_change_percentage_24h);
  
  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <Image
              src={coin.image}
              alt={coin.name}
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{coin.name}</span>
            <span className="text-xs text-muted-foreground">{coin.symbol.toUpperCase()}</span>
          </div>
        </div>
        <div className={`text-xs font-medium px-2 py-1 rounded-full ${
          isPositive ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 
                      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
        }`}>
          {percentChange}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="mt-2">
          <div className="text-xl font-bold">{formatPrice(coin.current_price)}</div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-muted-foreground">Market Cap:</span>
            <span className="text-xs font-medium">${(coin.market_cap / 1000000000).toFixed(2)}B</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MarketCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="flex flex-col">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-10 h-3 mt-1" />
          </div>
        </div>
        <Skeleton className="w-16 h-6 rounded-full" />
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="mt-2">
          <Skeleton className="w-24 h-7" />
          <div className="flex justify-between items-center mt-2">
            <Skeleton className="w-16 h-3" />
            <Skeleton className="w-12 h-3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}