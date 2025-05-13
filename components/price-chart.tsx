'use client';

import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CoinChartData } from '@/lib/types';
import { formatPrice } from '@/lib/api';

interface PriceChartProps {
  coinId: string;
  coinName: string;
  chartData?: CoinChartData;
  isLoading: boolean;
}

export function PriceChart({ coinId, coinName, chartData, isLoading }: PriceChartProps) {
  const [timeframe, setTimeframe] = useState<'1d' | '7d' | '30d' | '90d'>('7d');
  
  // Format chart data for Recharts
  const formatChartData = () => {
    if (!chartData || !chartData.prices) return [];
    
    return chartData.prices.map(([timestamp, price]) => ({
      timestamp,
      date: new Date(timestamp).toLocaleDateString(),
      time: new Date(timestamp).toLocaleTimeString(),
      price,
    }));
  };

  const data = formatChartData();
  
  // Calculate price change
  const calculatePriceChange = () => {
    if (!data || data.length < 2) return { change: 0, percentage: 0 };
    
    const firstPrice = data[0].price;
    const lastPrice = data[data.length - 1].price;
    const change = lastPrice - firstPrice;
    const percentage = (change / firstPrice) * 100;
    
    return { change, percentage };
  };
  
  const { change, percentage } = calculatePriceChange();
  const isPositive = percentage >= 0;
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-border rounded-md shadow-sm">
          <p className="text-sm font-medium">{new Date(payload[0].payload.timestamp).toLocaleString()}</p>
          <p className="text-base font-bold">{formatPrice(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-3 h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">
          {coinName} Price Chart
        </CardTitle>
        <div className="flex space-x-1">
          <Button 
            size="sm" 
            variant={timeframe === '1d' ? 'default' : 'outline'} 
            onClick={() => setTimeframe('1d')}
            className="h-7 px-2 text-xs"
          >
            1D
          </Button>
          <Button 
            size="sm" 
            variant={timeframe === '7d' ? 'default' : 'outline'} 
            onClick={() => setTimeframe('7d')}
            className="h-7 px-2 text-xs"
          >
            7D
          </Button>
          <Button 
            size="sm" 
            variant={timeframe === '30d' ? 'default' : 'outline'} 
            onClick={() => setTimeframe('30d')}
            className="h-7 px-2 text-xs"
          >
            30D
          </Button>
          <Button 
            size="sm" 
            variant={timeframe === '90d' ? 'default' : 'outline'} 
            onClick={() => setTimeframe('90d')}
            className="h-7 px-2 text-xs"
          >
            90D
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            <Skeleton className="w-full h-[250px]" />
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-col sm:flex-row justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {data.length > 0 ? formatPrice(data[data.length - 1].price) : 'N/A'}
                </p>
                <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {isPositive ? '↑' : '↓'} {formatPrice(Math.abs(change))} ({percentage.toFixed(2)}%)
                </p>
              </div>
            </div>
            
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis 
                    dataKey="timestamp" 
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
                    stroke="var(--muted-foreground)"
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    domain={['auto', 'auto']}
                    stroke="var(--muted-foreground)"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={data[0]?.price} stroke="var(--muted-foreground)" strokeDasharray="3 3" />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={isPositive ? "hsl(var(--chart-2))" : "hsl(var(--chart-1))"}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}