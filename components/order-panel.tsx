'use client';

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useTopCoins } from '@/hooks/use-coins';
import { useOrderHistory } from '@/hooks/use-orders';
import { formatPrice } from '@/lib/formatters';
import { OrderType } from '@/lib/types';

interface OrderPanelProps {
  selectedCoinId: string;
  onSelectCoin: (coinId: string) => void;
}

export function OrderPanel({ selectedCoinId, onSelectCoin }: OrderPanelProps) {
  const [orderType, setOrderType] = useState<OrderType>('buy');
  const [amount, setAmount] = useState<string>('100');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  
  const { coins, isLoading } = useTopCoins(20);
  const { placeOrder } = useOrderHistory();
  
  const selectedCoin = coins?.find(coin => coin.id === selectedCoinId);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) { // Allow numeric input with decimal
      setAmount(value);
    }
  };
  
  const handleOrderSubmit = () => {
    if (!selectedCoin) return;
    
    const numericAmount = parseFloat(amount);
    
    if (!numericAmount || isNaN(numericAmount)) return;
    
    const coinAmount = numericAmount / selectedCoin.current_price;
    
    placeOrder(
      orderType,
      selectedCoin.id,
      selectedCoin.symbol,
      coinAmount,
      selectedCoin.current_price
    );
    
    setShowConfirmation(false);
  };
  
  const handleOpenChange = (open: boolean) => {
    setShowConfirmation(open);
  };

  return (
    <Card className="col-span-1 h-full">
      <CardHeader>
        <CardTitle>Trade</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" className="w-full" onValueChange={(value) => setOrderType(value as OrderType)}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buy" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="coin-select">Coin</Label>
              <Select
                value={selectedCoinId}
                onValueChange={onSelectCoin}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a coin" />
                </SelectTrigger>
                <SelectContent>
                  {coins?.map(coin => (
                    <SelectItem key={coin.id} value={coin.id}>
                      <div className="flex items-center">
                        <span className="font-medium">{coin.symbol.toUpperCase()}</span>
                        <span className="ml-2 text-muted-foreground">{coin.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  $
                </div>
                <Input
                  id="amount"
                  placeholder="Enter amount"
                  type="text"
                  className="pl-8"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
            </div>
            
            {selectedCoin && (
              <div className="pt-2 pb-2 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Price:</span>
                  <span>{formatPrice(selectedCoin.current_price)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">You'll receive:</span>
                  <span>{parseFloat(amount) ? (parseFloat(amount) / selectedCoin.current_price).toFixed(8) : '0'} {selectedCoin.symbol.toUpperCase()}</span>
                </div>
              </div>
            )}
            
            <Dialog open={showConfirmation} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={!selectedCoin || !parseFloat(amount)}
                >
                  Buy Now
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Purchase</DialogTitle>
                  <DialogDescription>
                    Please review your order details below.
                  </DialogDescription>
                </DialogHeader>
                {selectedCoin && (
                  <div className="py-4 space-y-3">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Coin:</span>
                      <span>{selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Price per coin:</span>
                      <span>{formatPrice(selectedCoin.current_price)}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Amount (USD):</span>
                      <span>${parseFloat(amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">You'll receive:</span>
                      <span className="font-semibold">{(parseFloat(amount) / selectedCoin.current_price).toFixed(8)} {selectedCoin.symbol.toUpperCase()}</span>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleOrderSubmit} className="bg-green-600 hover:bg-green-700 text-white">
                    Confirm Buy
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
          
          <TabsContent value="sell" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="coin-select">Coin</Label>
              <Select
                value={selectedCoinId}
                onValueChange={onSelectCoin}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a coin" />
                </SelectTrigger>
                <SelectContent>
                  {coins?.map(coin => (
                    <SelectItem key={coin.id} value={coin.id}>
                      <div className="flex items-center">
                        <span className="font-medium">{coin.symbol.toUpperCase()}</span>
                        <span className="ml-2 text-muted-foreground">{coin.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  $
                </div>
                <Input
                  id="amount"
                  placeholder="Enter amount"
                  type="text"
                  className="pl-8"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
            </div>
            
            {selectedCoin && (
              <div className="pt-2 pb-2 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Price:</span>
                  <span>{formatPrice(selectedCoin.current_price)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">You'll sell:</span>
                  <span>{parseFloat(amount) ? (parseFloat(amount) / selectedCoin.current_price).toFixed(8) : '0'} {selectedCoin.symbol.toUpperCase()}</span>
                </div>
              </div>
            )}
            
            <Dialog open={showConfirmation} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  disabled={!selectedCoin || !parseFloat(amount)}
                >
                  Sell Now
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Sale</DialogTitle>
                  <DialogDescription>
                    Please review your order details below.
                  </DialogDescription>
                </DialogHeader>
                {selectedCoin && (
                  <div className="py-4 space-y-3">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Coin:</span>
                      <span>{selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Price per coin:</span>
                      <span>{formatPrice(selectedCoin.current_price)}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Amount (USD):</span>
                      <span>${parseFloat(amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">You'll sell:</span>
                      <span className="font-semibold">{(parseFloat(amount) / selectedCoin.current_price).toFixed(8)} {selectedCoin.symbol.toUpperCase()}</span>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleOrderSubmit} className="bg-red-600 hover:bg-red-700 text-white">
                    Confirm Sell
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}